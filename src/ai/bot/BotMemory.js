class BotMemory {

  constructor(memory) {
    this.memory = memory;
  }

  remember(key, value, duration) {
    log.silly(`BotMemory: remembering ${key}=${JSON.stringify(value)} for ${duration}`);
    const expiresAt = new Date(Date.now() + 86400 * 1000); // TODO use duration
    this.memory.setProperty({key, value, expiresAt});
  }

  get(key) {
    const mem = this.memory.properties.find((prop) => prop.key === key); // TODO exclude expired memories
    log.silly(`BotMemory: got ${key}=${mem}`);
    return mem && mem.value || null;
  }

}

export default BotMemory;
