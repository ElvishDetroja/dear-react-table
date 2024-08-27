class Debug {
  constructor() {
    this.isLog = true;
    this.isInfo = true;
  }

  log(...args) {
    if (this.isLog) {
      console.log(...args);
    }
  }

  info(...args) {
    if (this.isInfo) {
      console.log(...args);
    }
  }
}

const debug = new Debug();

export default debug;
