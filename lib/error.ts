export class CustomError extends Error {
    status?: number;
    pageTitle?: string;

    constructor(message: string, status?: number, pageTitle?: string) {
        super(message);
        this.status = status;
        this.pageTitle = pageTitle;
        this.name = "AppError";
    }
}