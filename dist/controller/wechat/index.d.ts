import { Request, Response, NextFunction } from 'express';
export default class Wechat {
    getAccessToken(): Promise<{}>;
    sign(req: Request, res: Response): Promise<void>;
    getMenu(req: Request, res: Response): Promise<void>;
    createMenu(): Promise<{}>;
    requestAuth(req: Request, res: Response): Promise<void>;
    callBack(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare function startCreateMenu(): Promise<void>;
