import { logColor } from './log-color';

export async function asyncDelay(milliseconds = 0, verbose = false) {
  if (milliseconds <= 0) return;

  if (verbose) {
    logColor(`Delay for ${milliseconds / 1000}s`);
  }

  await new Promise(resolve => setTimeout(resolve, milliseconds));
}
