import FacebookMessage from './FacebookMessage';

class Text extends FacebookMessage {

  constructor(text) {
    super();

    if (!text) {
      throw new Error('parameter text is required');
    }

    if (text.length > 320) {
      throw new Error('text is too long');
    }

    this.text = text;
  }

  get() {
    const reply = {
      text: this.text
    };

    if (Array.isArray(this.quickReplies) && this.quickReplies.length > 0) {
      reply.quick_replies = this.quickReplies;
    }

    return reply;
  }

}

export default Text;
