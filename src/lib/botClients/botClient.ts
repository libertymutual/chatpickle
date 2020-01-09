export abstract class BotClient {

    botContext: any;
    userContext: any;

    constructor(botContext: any, userContext: any) {
        this.botContext = botContext;
        this.userContext = userContext;
    }

    public abstract async speak(inputText: string): Promise<string>;

}
