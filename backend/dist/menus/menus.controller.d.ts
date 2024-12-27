import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    getMenus(menuId: string): Promise<any[]>;
    getSelectionMenus(): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getMenu(id: string): Promise<{
        parent: {
            name: string;
            parentId: string | null;
            id: string;
            depth: number;
            createdAt: Date;
            updatedAt: Date;
        };
        children: ({
            parent: {
                name: string;
                parentId: string | null;
                id: string;
                depth: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            name: string;
            parentId: string | null;
            id: string;
            depth: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createMenu(data: CreateMenuDto): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addChildrenToAllMenus(children: CreateMenuDto[]): Promise<void>;
    updateMenu(id: string, data: CreateMenuDto): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteMenu(id: string): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
