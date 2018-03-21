import { Request, Response } from 'express';
export default class Wechat {
    tt(params: any): number;
    getAccessToken(): Promise<{}>;
    sign(req: Request, res: Response): Promise<{}>;
    getMenu(req: Request, res: Response): Promise<void>;
}
