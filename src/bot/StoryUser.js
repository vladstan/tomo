class StoryUser {

  constructor() {
    this.messages = [];
  }

  lastMessage() {
    return this.messages[this.messages.length - 1];
  }

  says(message) {
    this.messages.push({
      text: message,
      entities: {}
    });
    return this;
  }

  intent(name) {
    this.lastMessage().intent = name;
    return this;
  }

  entity(type, name, example) {
    this.lastMessage().entities[name] = {type, name, example};
    return this;
  }

}

export default StoryUser;
