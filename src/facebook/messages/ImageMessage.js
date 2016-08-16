import FacebookMessage from 'facebook/messages/FacebookMessage';
import {isUrl} from 'utils/parser';

class ImageMessage extends FacebookMessage {

  constructor(url) {
    super();

    if (!url || !isUrl(url)) {
      throw new Error('parameter url is not a valid URL');
    }

    this.url = url;
  }

  get() {
    const reply = {
      attachment: {
        type: 'image',
        payload: {
          url: this.url,
        },
      },
    };

    return reply;
  }

}

export default ImageMessage;
