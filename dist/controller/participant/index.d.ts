import { Request, Response } from 'express';
export default class Participant {
    getList(req: Request, res: Response): Promise<void>;
}
