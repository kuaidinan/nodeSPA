import { Request, Response, NextFunction } from 'express';
declare class Book {
    constructor();
    getList(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default Book;
