import { Request, Response } from 'express';
export default class Wechat {
    getAccessToken(): Promise<{}>;
    sign(req: Request, res: Response): Promise<void>;
    getMenu(req: Request, res: Response): Promise<void>;
    createMenu(): Promise<{}>;
}
export declare function startCreateMenu(): Promise<void>;
