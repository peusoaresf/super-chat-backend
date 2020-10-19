class ChatClient {
    constructor(id, res) {
        this.id = id;
        this.res = res;

        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.flushHeaders(); // flush the headers to establish SSE with client

        res.on('close', () => {
            console.log('disconnecting client with id ' + this.id);
            res.end();
            this._onCloseCallback()
        });
    }

    sendMessage(message) {
        this.res.write(`data: ${JSON.stringify({ message: message })}\n\n`)
    }

    sendMessages(messages) {
        for (let i in messages) {
            this.sendMessage(messages[i])
        }
    }

    onClose(callback) {
        this._onCloseCallback = callback
    }
}

module.exports = ChatClient