export declare class EmailService {
    private transporter;
    private logger;
    constructor();
    sendVerificationEmail(to: string, token: string): Promise<void>;
}
