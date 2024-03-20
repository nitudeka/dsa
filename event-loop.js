/*
 *
 * define variables
 * call functions
 */
const Queue = require("./queue");

const totalWorkers = 10000;
const totalDemoProcesses = 100;

class EventLoop {
  constructor() {
    this.processes = new Queue();
    this.tickCount = 0;
    this.retryCount = 0;
    this.workers = [];
    this.results = [];

    this.init();
  }

  static createDemoProcess(t) {
    return () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random <= 7)
            resolve(random); // 70% probability to resolve
          else reject();
        }, 1000 * t);
      });
    };
  }

  addProcess(p) {
    this.processes.add(p);
  }

  async execute(worker) {
    const { value: process, index } = this.processes.dequeue();

    if (!process) return;
    console.log(`Executing ${index}`);

    try {
      const result = await process();
      this.results.push(result);
    } catch (e) {
      this.addProcess(process);
      this.retryCount += 1;
    }

    worker.status = "idle";
  }

  getWorkers(count = 4) {
    const workers = [];
    for (let i = 0; i < count; i++) {
      workers.push({
        workerId: `worker_${i + 1}`,
        status: "idle", // 'idle' || 'busy' || 'waiting',
      });
    }

    return workers;
  }

  init() {
    const workers = this.getWorkers(totalWorkers);

    this.workers = workers;
  }

  tick() {
    setTimeout(() => {
      if (!this.processes.count) {
        console.log(`done in ${performance.now() - this.startTime}`);
        return;
      }

      this.workers.forEach((worker) => {
        if (worker.status === "idle") this.execute(worker);
      });

      this.tick();
    }, 1000);
  }

  start() {
    this.startTime = performance.now();

    this.tick();
  }
}

const loop = new EventLoop();

const processes = Array(totalDemoProcesses)
  .fill(0)
  .map(() => EventLoop.createDemoProcess(Math.random() * 2));

processes.forEach((p) => {
  loop.addProcess(p);
});

loop.start();
