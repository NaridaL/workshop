/* eslint-disable @typescript-eslint/no-explicit-any */
export function memoizeLast<F extends (...args: any[]) => any>(f: F): F {
  let lastArgs: any[] = []
  let lastResult: any
  return function (...args: any[]) {
    if (
      lastArgs.length !== args.length ||
      lastArgs.some((v, i) => v !== args[i])
    ) {
      lastArgs = args
      lastResult = f(...args)
    }
    return lastResult
  } as F
}
