const wrkPkg = require('wrk');
const { spawn } = require('child_process');
const { join } = require('path');
const { table } = require('console');

const wrk = (options) =>
  new Promise((resolve, reject) =>
    wrkPkg(options, (err, result) =>
      err ? reject(err) : resolve(result),
    ),
  );

const sleep = (time) =>
  new Promise(resolve => setTimeout(resolve, time));

const BENCHMARK_PATH = join(process.cwd(), 'benchmarks');
const LIBS = [
	'http:8000', 'express:5000', 'fastify:5001', 
	'hapi:5002', 'koa:5003', 'vite:5004', 'nitro:5005',
	{ name: 'h3', cmd: "npx", args: ["listhen", "-w", join(BENCHMARK_PATH, "./h3.js")], port: 3000 }
];

async function runBenchmarkOfLib(lib) {
  let cmd = "node";
  let script = null;
  let process = null;
  let port = 0;

  if (typeof lib === "object") {
    cmd = lib.cmd;
    script = lib.name;
	port = lib.port;
	console.log(`Running: ${cmd} ${lib.args.join(' ')}: ${lib.port}`);
    process = spawn(cmd, lib.args, { shell: true });
  } else {
	const [file, portStr] = lib.split(":");
    script = `${file}.js`;
	port = portStr;
    const libPath = join(BENCHMARK_PATH, script);
	console.log(`Running: ${cmd} ${libPath}: ${port}`);
    process = spawn(cmd, [libPath], { shell: true });
  }

  process.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });

  process.unref();

  await sleep(10000); // Aumente o tempo de espera para 10 segundos ou mais

  const result = await wrk({
	threads: 8,
	duration: '10s',
	connections: 1024,
	url: `http://localhost:${port}`,
  });

  process.kill();
  return result;
}

async function getBenchmarks() {
  const results = {};

  for (let lib of LIBS) {

    console.log(`Running benchmark for ${(typeof lib === "object") ? lib.name : lib}`);

    try {
      const result = await runBenchmarkOfLib(lib);
	  //console.log((typeof lib === "object") ? lib.name : lib, result)
      results[(typeof lib === "object") ? lib.name : lib] = result;
    } catch (error) {
      console.error(`Error during benchmark for ${(typeof lib === "object") ? lib.name : lib}:`, error);
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
    'Transfer Total': result.transferTotal,
    'Latency Stdev': result.latencyStdev,
    'Latency Max': result.latencyMax,
  }));

  tableData.sort((a, b) => b['Requests/sec'] - a['Requests/sec']);

  console.table(tableData);
}

run();
