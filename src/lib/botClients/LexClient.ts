import LexRuntime from 'aws-sdk/clients/lexruntime';
import get from 'lodash.get';
import { BotClient } from './BotClient';

export default class LexClient extends BotClient {
    private botName: string;
    private botAlias: string;
    private userId: string;
    private lastResponse: any;
    private sessionAttributes: any;
    private props: any;
    private lex: LexRuntime;

    constructor(botContext: any, userContext: any) {
        super(botContext, userContext);
        this.botName = this.botContext.botName;
        this.botAlias = this.botContext.botAlias;
        this.userId = `${this.userContext.userId}-${Date.now()}`;
        this.lastResponse = null;
        this.sessionAttributes = this.userContext.userAttributes;

        this.props = {
            region: this.botContext.region,
        };
        // Optional Auth Environment Variables
        this.props.accessKeyId = process.env.chatpickle_access_id || undefined;
        this.props.secretAccessKey = process.env.chatpickle_access_secret || undefined;

        this.lex = new LexRuntime(this.props);
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

        const reply: string = this.lastResponse.message? this.lastResponse.message.trim(): null;

        console.log(`[${this.userId}] Bot: ${reply}`);

        return reply;
    }

    public async fetch(attributePath: string): Promise<string> {
        return await get(this.lastResponse, attributePath);
    }
}
