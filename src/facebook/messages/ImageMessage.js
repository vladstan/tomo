import FacebookMessage from './FacebookMessage';
import {isUrl} from '../../utils';

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
