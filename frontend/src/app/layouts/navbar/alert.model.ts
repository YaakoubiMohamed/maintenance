export class Alert {
    id: string;
    type: AlertType;
    date: string;
    message: string;
    autoClose: boolean;
    fade: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}