class Debug {
  constructor() {
    this.isLog = false;
    this.isInfo = false;
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
