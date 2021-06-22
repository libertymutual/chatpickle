import LexRuntime from 'aws-sdk/clients/lexruntime';
import get from 'lodash.get';
import { BotClient } from './BotClient';
import Polly from 'aws-sdk/clients/polly';
import Fs from 'fs';

export default class LexClient extends BotClient {
    private botName: string;
    private botAlias: string;
    private userId: string;
    private lastResponse: any;
    private sessionAttributes: any;
    private props: any;
    private lex: LexRuntime;
    private Polly = new Polly({
        signatureVersion: "v4",
        region: 'us-east-1'
    });

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

        let pollyParams = {
            'Text': inputText,
            'OutputFormat': 'pcm',
            'VoiceId': 'Joanna'
        };

        let audioStream = '';

        Polly.synthesizeSpeech(pollyParams, (err, data) => {
            if (err) {
                console.log(err.code)
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    /**Fs.writeFile("./file.pcm", data.AudioStream, function(err) {
                        if (err) {
                            return console.log(err)
                        }
                        console.log("The file was saved!")
                    })**/
                    audioStream = data.AudioStream;
                }
            }
        });

        //let lexFileStream = Fs.createReadStream("./file.pcm");

        const params = {
            botName: this.botName,
            botAlias: this.botAlias,
            userId: this.userId,
            inputText,
            sessionAttributes: this.sessionAttributes,
            contentType: 'audio/lpcm; sample-rate=8000; sample-size-bits=16; channel-count=1; is-big-endian=false',
            inputStream: audioStream
        };


        this.lastResponse = await this.lex.postContent(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            }
            else {
                console.log(data);
            }
        }).promise();

        this.sessionAttributes = this.lastResponse.sessionAttributes;

        const reply: string = this.lastResponse.message.trim();

        console.log(`[${this.userId}] Bot: ${reply}`);

        return reply;
    }

    public async fetch(attributePath: string): Promise<string> {
        return await get(this.lastResponse, attributePath);
    }
}
