class Story {

  constructor(user) {
    this.user = user;
  }

  checkEntities(entities) {
    for (const message of this.user.messages) {
      for (const entityName of Object.keys(message.entities)) {
        entities[entityName] = entities[entityName] || [];
      }
    }
  }

  async run() {}

}

export default Story;
