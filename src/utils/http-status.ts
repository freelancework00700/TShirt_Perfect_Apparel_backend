import { Response } from "express";

interface response {
    success: boolean;
    message: string;
    data?: any;
}

export class HttpStatus {
    /** Get success response */
    public sendOkResponse = (res: Response, message: string, data: any = null) => {
        const resObject: response = { success: true, message, data };
        res.status(200).json(resObject);
    }

    /** Get bed request response */
    public sendBadRequestResponse = (res: Response, message: string = "Something went wrong, please try again later.", data: any = null) => {
        const resObject: response = { success: false, message, data };
        res.status(400).json(resObject);
    }

    /** Get Internal Server Error */
    public sendInternalServerResponse = (res: Response, message: string = "Internal Server Error") => {
        const resObject: response = { success: false, message };
        res.status(500).json(resObject);
    }
}
