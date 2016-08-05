import FacebookMessage from './FacebookMessage';

class Text extends FacebookMessage {

  constructor(text) {
    super();

    if (!text) {
      throw new Error('parameter text is required');
    }

    this.text = text;
  }

  get() {
    const reply = {
      text: this.text
    };

    if (this.quickReplies) {
      reply.quick_replies = this.quickReplies;
    }

    return reply;
  }

}

export default Text;
