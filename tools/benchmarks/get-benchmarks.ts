import wrkPkg = require('wrk');
import { spawn } from 'child_process';
import { join } from 'path';
import { table } from 'console';

export interface Benchmarks {
  [lib: string]: WrkResults;
}

const wrk = (options: any) =>
  new Promise<WrkResults>((resolve, reject) =>
    wrkPkg(options, (err: any, result: any) =>
      err ? reject(err) : resolve(result),
    ),
  );

const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

const BENCHMARK_PATH = join(process.cwd(), 'benchmarks');
export const LIBS = ['express', 'fastify', 'koa', 'hapi']; 

async function runBenchmarkOfLib(lib: string): Promise<WrkResults> {
  const libPath = join(BENCHMARK_PATH, `${lib}.js`);
  const process = spawn('node', [libPath], {
    detached: true,
  });

  process.stdout!.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  process.stderr!.on('data', data => {
    console.log(`stderr: ${data}`);
  });

  process.unref();

  await sleep(2000); 

  const result = await wrk({
    threads: 8,
    duration: '10s',
    connections: 1024,
    url: 'http://localhost:3000',
  });

  process.kill();
  return result;
}

export async function getBenchmarks() {
  const results: Benchmarks = {};
  for await (const lib of LIBS) {
    console.log(`Running benchmark for ${lib}`);
    try {
      const result = await runBenchmarkOfLib(lib);
      results[lib] = result;
    } catch (error) {
      console.error(`Error during benchmark for ${lib}:`, error);
    }
  }
  return results;
}

async function run() {
  const results = await getBenchmarks();

  const tableData = Object.entries(results).map(([lib, result]) => ({
    Framework: lib,
    'Requests/sec': result.requestsPerSec,
    'Transfer/sec': result.transferPerSec,
    Latency: result.latencyAvg,
    'Total Requests': result.requestsTotal,
    'Total Duration': result.durationActual,
    'Transfer Total': result.transferTotal,
    'Latency Stdev': result.latencyStdev,
    'Latency Max': result.latencyMax,
  }));

  console.table(tableData);
}

run();

interface WrkResults {
  transferPerSec: string;
  requestsPerSec: number;
  connectErrors: string;
  readErrors: string;
  writeErrors: string;
  timeoutErrors: string;
  requestsTotal: number;
  durationActual: string;
  transferTotal: string;
  latencyAvg: string;
  latencyStdev: string;
  latencyMax: string;
  latencyStdevPerc: number;
  rpsAvg: string;
  rpsStdev: string;
  rpsMax: string;
  rpsStdevPerc: number;
}
