/**
 * Helper class to count frames per second.
 */
export class FPSController {
  private count = 0

  private lastTime = performance.now()
  constructor(
    private readonly notify: (fps: number) => void,
    private readonly window = 10,
  ) {}

  tick(time = performance.now()): void {
    const window = this.window
    this.count = (this.count + 1) % window
    if (this.count === 0) {
      const fps = Math.floor((window * 1000) / (time - this.lastTime))
      this.notify(fps)
      this.lastTime = time
    }
  }
}
