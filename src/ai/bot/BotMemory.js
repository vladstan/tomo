class BotMemory {

  memory: Object;

  constructor(memory: Object) {
    this.memory = memory;
  }

  remember(key: string, value: any, duration: string) {
    log.silly(`BotMemory: remembering ${key}=${value} for ${duration}`);
    const expiresAt = new Date(Date.now() + 86400 * 1000); // TODO use duration
    this.memory.setProperty({key, value, expiresAt});
  }

  get(key: string) {
    const mem = this.memory.properties.find((prop) => prop.key === key); // TODO exclude expired memories
    log.silly(`BotMemory: got ${key}=${mem}`);
    return mem && mem.value || null;
  }

}

export default BotMemory;
