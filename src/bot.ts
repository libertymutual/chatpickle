import LexRuntime from 'aws-sdk/clients/lexruntime';

export class Bot {

    private botName: string;
    private botAlias: string;
    private userId: string;
    private sessionAttributes: any;
    private lex: LexRuntime;
    public reply: string;

    constructor(botName: string, botAlias: string, region: string, userId: string, userAttributes: any) {
        this.botName = botName;
        this.botAlias = botAlias;
        this.userId = `${userId}-${Date.now()}`;
        this.sessionAttributes = userAttributes;
        this.lex = new LexRuntime({region: region});
        console.log(`[${this.userId}] New Conversation with ${this.botName}`);
    }

    public async send(inputText: string): Promise<void> {
        try {
            this.reply = null;

            const params = {
                botName: this.botName,
                botAlias: this.botAlias,
                userId: this.userId,
                inputText,
                sessionAttributes: this.sessionAttributes
            };

            console.log(`[${this.userId}] User: ${inputText}`);

            const response = await this.lex.postText(params).promise();

            this.sessionAttributes = response.sessionAttributes;
            this.reply = response.message.trim();

            console.log(`[${this.userId}] Bot: ${this.reply}`);
        } catch (e) {
            throw e;
        }
    }
    
}