import { Request, Response } from 'express';
export default class Wechat {
    getAccessToken(): Promise<{}>;
    sign(req: Request, res: Response): Promise<void>;
    getMenu(req: Request, res: Response): Promise<void>;
    createMenu(req: Request, res: Response): Promise<void>;
}
export declare function getAccessToken(): Promise<{}>;
