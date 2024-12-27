import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllMenus(menuId?: string) {
    if (menuId && menuId.trim() !== '') {
      const menu = await this.prisma.menu.findUnique({
        where: { id: menuId },
        include: {
          children: {
            include: {
              parent: true,
            },
          },
        },
      });
      if (menu) {
        const menuWithChildren = await this.fetchMenuChildren(menu.id);
        return menuWithChildren ? [menuWithChildren] : [];
      }
      return [];
    }

    const rootMenus = await this.prisma.menu.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            parent: true,
          },
        },
      },
    });

    const menusWithChildren = await Promise.all(
      rootMenus.map((rootMenu) => this.fetchMenuChildren(rootMenu.id)),
    );

    return menusWithChildren.filter(Boolean);
  }

  private async fetchMenuChildren(menuId: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
      include: {
        children: {
          include: {
            parent: true,
          },
        },
      },
    });

    if (!menu) {
      return null;
    }

    const childrenPromises = menu.children.map((child) =>
      this.fetchMenuChildren(child.id),
    );

    const children = await Promise.all(childrenPromises);

    return {
      ...menu,
      children: children.filter(Boolean),
    };
  }

  async getSelectionMenus() {
    return await this.prisma.menu.findMany();
  }

  async getMenuById(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        children: {
          include: {
            parent: true,
          },
        },
        parent: true,
      },
    });

    return menu;
  }

  async createMenu(data: CreateMenuDto) {
    let depth = 1;
    if (data.parentId && data.parentId !== '') {
      const parentMenu = await this.prisma.menu.findUnique({
        where: { id: data.parentId },
        select: { depth: true },
      });

      if (parentMenu) {
        depth = parentMenu.depth + 1;
      } else {
        throw new Error('Parent menu not found');
      }
    }
    const newMenu = await this.prisma.menu.create({
      data: { ...data, depth },
    });

    // Add children to the new menu
    await this.addChildrenToMenu(newMenu.id, [
      { name: 'Child 1', parentId: newMenu.id },
      { name: 'Child 2', parentId: newMenu.id },
    ]);

    return newMenu;
  }

  async updateMenu(id: string, data: CreateMenuDto) {
    let depth = 1;

    const existingMenu = await this.prisma.menu.findUnique({
      where: { id },
      select: { parentId: true, depth: true },
    });

    if (!existingMenu) {
      throw new Error('Menu not found');
    }

    if (data.parentId && data.parentId !== '') {
      const parentMenu = await this.prisma.menu.findUnique({
        where: { id: data.parentId },
        select: { depth: true },
      });

      if (parentMenu) {
        depth = parentMenu.depth + 1;
      } else {
        throw new Error('Parent menu not found');
      }
    } else {
      depth = existingMenu.depth;
    }

    const updatedMenu = await this.prisma.menu.update({
      where: { id },
      data: {
        name: data.name,
        parentId: data.parentId ?? existingMenu.parentId,
        depth,
      },
    });

    // Add children to the updated menu
    await this.addChildrenToMenu(updatedMenu.id, [
      { name: 'Child 1', parentId: updatedMenu.id },
      { name: 'Child 2', parentId: updatedMenu.id },
    ]);

    return updatedMenu;
  }

  async deleteMenu(id: string) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }

  async addChildrenToMenu(menuId: string, children: CreateMenuDto[]) {
    for (const child of children) {
      await this.createMenu({ ...child, parentId: menuId });
    }
  }

  async addChildrenToAllMenus(children: CreateMenuDto[]) {
    const allMenus = await this.prisma.menu.findMany();
    for (const menu of allMenus) {
      await this.addChildrenToMenu(menu.id, children);
    }
  }
}