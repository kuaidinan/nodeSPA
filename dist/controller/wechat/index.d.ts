import { Request, Response } from 'express';
export default class Wechat {
    getAccessToken(): Promise<{}>;
    sign(req: Request, res: Response): Promise<{}>;
}
