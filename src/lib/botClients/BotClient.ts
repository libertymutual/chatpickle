export abstract class BotClient {
    botContext: any;
    userContext: any;

    constructor(botContext: any, userContext: any) {
        this.botContext = botContext;
        this.userContext = userContext;
    }

    /**
     * Implement to initialize any asynchronous components that your bot client relies on.
     */
    public async initialize(): Promise<void> {
        return;
    }

    public abstract async speak(inputText: string): Promise<string>;

    public abstract async fetch(attribute: string): Promise<string>;
}
