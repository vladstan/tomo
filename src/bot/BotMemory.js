class BotMemory {

  constructor(memory) {
    this.memory = memory;
  }

  remember(key, value, duration) {
    const expiresAt = new Date(Date.now() + 86400 * 1000); // TODO use duration
    this.memory.setProperty({key, value, expiresAt});
  }

  get(key) {
    const mem = this.memories.find((mem) => mem.key === key); // TODO exclude expired memories
    return mem && mem.value || null;
  }

}

export default BotMemory;
