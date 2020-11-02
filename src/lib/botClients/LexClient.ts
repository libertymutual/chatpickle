import LexRuntime from 'aws-sdk/clients/lexruntime';
import get from 'lodash.get';
import { BotClient } from './BotClient';

export default class LexClient extends BotClient {
    private botName: string;
    private botAlias: string;
    private userId: string;
    private lastResponse: any;
    private sessionAttributes: any;
    private lex: LexRuntime;

    constructor(botContext: any, userContext: any) {
        super(botContext, userContext);
        this.botName = this.botContext.botName;
        this.botAlias = this.botContext.botAlias;
        this.userId = `${this.userContext.userId}-${Date.now()}`;
        this.lastResponse = null;
        this.sessionAttributes = this.userContext.userAttributes;
        this.lex = new LexRuntime({ region: this.botContext.region });
        console.log(`[${this.userId}] New Conversation with ${this.botName}`);
    }

    public async speak(inputText: string): Promise<string> {
        console.log(`[${this.userId}] User: ${inputText}`);

        const params = {
            botName: this.botName,
            botAlias: this.botAlias,
            userId: this.userId,
            inputText,
            sessionAttributes: this.sessionAttributes,
        };

        this.lastResponse = await this.lex.postText(params).promise();
        this.sessionAttributes = this.lastResponse.sessionAttributes;

        const reply: string = this.lastResponse.message.trim();

        console.log(`[${this.userId}] Bot: ${reply}`);

        return reply;
    }

    public async fetch(attributePath: string): Promise<string> {
        return await get(this.lastResponse, attributePath);
    }
}
