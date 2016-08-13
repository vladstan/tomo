class Story {

  constructor(user) {
    this.user = user;
  }

  checkEntities(entities) {
    for (let message of this.user.messages) {
      for (let entityName of Object.keys(message.entities)) {
        entities[entityName] = entities[entityName] || [];
      }
    }
  }

  async run() {}

}

export default Story;
