import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { HttpStatus } from "../utils/http-status";

export class UserController extends HttpStatus {
    public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.findAll();
            if(!users.length) return this.sendBadRequestResponse(res, "No users found.");
            
            this.sendOkResponse(res, "Users fetched successfully.", users);
        } catch (err) {
            if(err instanceof Error) {
                this.sendBadRequestResponse(res, err.message);
            }
        }
    };
}