"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MenusService = class MenusService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllMenus(menuId) {
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
        const menusWithChildren = await Promise.all(rootMenus.map((rootMenu) => this.fetchMenuChildren(rootMenu.id)));
        return menusWithChildren.filter(Boolean);
    }
    async fetchMenuChildren(menuId) {
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
        const childrenPromises = menu.children.map((child) => this.fetchMenuChildren(child.id));
        const children = await Promise.all(childrenPromises);
        return {
            ...menu,
            children: children.filter(Boolean),
        };
    }
    async getSelectionMenus() {
        return await this.prisma.menu.findMany();
    }
    async getMenuById(id) {
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
    async createMenu(data) {
        let depth = 1;
        if (data.parentId && data.parentId !== '') {
            const parentMenu = await this.prisma.menu.findUnique({
                where: { id: data.parentId },
                select: { depth: true },
            });
            if (parentMenu) {
                depth = parentMenu.depth + 1;
            }
            else {
                throw new Error('Parent menu not found');
            }
        }
        const newMenu = await this.prisma.menu.create({
            data: { ...data, depth },
        });
        await this.addChildrenToMenu(newMenu.id, [
            { name: 'Child 1', parentId: newMenu.id },
            { name: 'Child 2', parentId: newMenu.id },
        ]);
        return newMenu;
    }
    async updateMenu(id, data) {
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
            }
            else {
                throw new Error('Parent menu not found');
            }
        }
        else {
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
        await this.addChildrenToMenu(updatedMenu.id, [
            { name: 'Child 1', parentId: updatedMenu.id },
            { name: 'Child 2', parentId: updatedMenu.id },
        ]);
        return updatedMenu;
    }
    async deleteMenu(id) {
        return this.prisma.menu.delete({
            where: { id },
        });
    }
    async addChildrenToMenu(menuId, children) {
        for (const child of children) {
            await this.createMenu({ ...child, parentId: menuId });
        }
    }
    async addChildrenToAllMenus(children) {
        const allMenus = await this.prisma.menu.findMany();
        for (const menu of allMenus) {
            await this.addChildrenToMenu(menu.id, children);
        }
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenusService);
//# sourceMappingURL=menus.service.js.map