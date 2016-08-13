class BotMemory {

  constructor(session, memories) {
    this.session = session;
    this.memories = memories;
  }

  remember(key, value, duration) {
    const expiresAt = new Date(Date.now() + 86400 * 1000); // TODO use duration
    const newMem = {sessionId: this.sessionId, key, value, expiresAt};
    this.memories = this.memories.filter((elem) => elem.key !== key);
    this.memories.push(newMem);
  }

  get(key) {
    const mem = this.memories.find((mem) => mem.key === key); // TODO exclude expired memories
    return mem && mem.value || null;
  }

}

export default BotMemory;
