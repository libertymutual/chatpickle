import LexRuntime from 'aws-sdk/clients/lexruntime';
import { BotClient } from './botClient';

export default class LexClient extends BotClient {
    private botName: string;
    private botAlias: string;
    private userId: string;
    private sessionAttributes: any;
    private lex: LexRuntime;

    constructor(botContext: any, userContext: any) {
        super(botContext, userContext);
        this.botName = this.botContext.botName;
        this.botAlias = this.botContext.botAlias;
        this.userId = `${this.userContext.userId}-${Date.now()}`;
        this.sessionAttributes = this.userContext.userAttributes;
        this.lex = new LexRuntime({ region: this.botContext.region });
        console.log(`[${this.userId}] New Conversation with ${this.botName}`);
    }

    public async speak(inputText: string): Promise<string> {
        try {
            const params = {
                botName: this.botName,
                botAlias: this.botAlias,
                userId: this.userId,
                inputText,
                sessionAttributes: this.sessionAttributes,
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
