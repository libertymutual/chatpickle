import LexRuntime from 'aws-sdk/clients/lexruntime';

export class BotClient {

    private botName: string;
    private botAlias: string;
    private userId: string;
    private sessionAttributes: any;
    private lex: LexRuntime;

    constructor(botName: string, botAlias: string, region: string, userId: string, userAttributes: any) {
        this.botName = botName;
        this.botAlias = botAlias;
        this.userId = `${userId}-${Date.now()}`;
        this.sessionAttributes = userAttributes;
        this.lex = new LexRuntime({region: region});
        console.log(`[${this.userId}] New Conversation with ${this.botName}`);
    }

    public async speak(inputText: string): Promise<string> {
        try {
            const params = {
                botName: this.botName,
                botAlias: this.botAlias,
                userId: this.userId,
                inputText,
                sessionAttributes: this.sessionAttributes
            };

            console.log(`[${this.userId}] User: ${inputText}`);

            const response = await this.lex.postText(params).promise();

            const reply: string = response.message.trim();
            this.sessionAttributes = response.sessionAttributes;

            console.log(`[${this.userId}] Bot: ${reply}`);

            return reply;
        } catch (e) {
            throw e;
        }
    }

}
