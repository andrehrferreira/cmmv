import * as bytes from 'bytes';
import { Benchmarks, getBenchmarks, LIBS } from './get-benchmarks';

export default async function checkBenchmarks() {
  const currentBenchmarks = await getBenchmarks();
  
  const baselineBenchmarks = await loadBaselineBenchmarks();
  
  const report = getBenchmarksReport(currentBenchmarks, baselineBenchmarks);
  
  console.log(report.longDescription);

  await saveBaselineBenchmarks(currentBenchmarks);
}

async function loadBaselineBenchmarks(): Promise<Benchmarks | undefined> {
  return undefined;
}

async function saveBaselineBenchmarks(benchmarks: Benchmarks): Promise<void> {}

function getBenchmarksReport(
  current: Benchmarks,
  baseline: Benchmarks | undefined,
) {
  const diff = getDiff(current, baseline);

  const shortDescription = getShortDescription(baseline, diff);
  const longDescription = getLongDescription(current, baseline, diff);

  return {
    name: 'Benchmarks',
    status: 'success',
    shortDescription,
    longDescription,
  };
}

function getShortDescription(
  baseline: Benchmarks | undefined,
  diff: BenchmarksDiff,
) {
  if (!baseline) {
    return 'New benchmarks generated';
  }

  const avgDiff = getAverageDiff(diff);
  if (avgDiff > 0) {
    return `Performance improved by ${avgDiff.toFixed(2)}% on average, good job!`;
  }
  if (avgDiff === 0) {
    return `No changes in performance detected`;
  }
  if (avgDiff < 0) {
    return `Performance decreased by ${avgDiff.toFixed(2)}% on average, be careful!`;
  }
}

function getLongDescription(
  current: Benchmarks,
  baseline: Benchmarks | undefined,
  diff: BenchmarksDiff,
): string {
  function printTableRow(id: string, label: string): string {
    return `${label} | ${current[id].requestsPerSec.toFixed(0)} | ${current[id].transferPerSec} | ${baseline ? formatPerc(diff[id].requestsPerSecDiff) : '-'} | ${baseline ? formatPerc(diff[id].transferPerSecDiff) : '-'}`;
  }

  let table = `
| Framework | Req/sec | Trans/sec | Req/sec DIFF | Trans/sec DIFF |
|-----------|---------|-----------|--------------|----------------|
${printTableRow('express', 'Express')}
${printTableRow('fastify', 'Fastify')}
`;

  return table.trim();
}

function getDiff(
  current: Benchmarks,
  baseline: Benchmarks | undefined,
): BenchmarksDiff {
  const diff: BenchmarksDiff = {};
  for (const l of LIBS) {
    if (!baseline) {
      diff[l] = {
        requestsPerSecDiff: undefined,
        transferPerSecDiff: undefined
      };
      continue;
    }

    const currentValue = current[l];
    const baselineValue = baseline[l];

    diff[l] = {
      requestsPerSecDiff: getRequestDiff(
        currentValue.requestsPerSec,
        baselineValue.requestsPerSec,
      ),
      transferPerSecDiff: getTransferDiff(
        currentValue.transferPerSec,
        baselineValue.transferPerSec,
      ),
    };
  }
  return diff;
}

function getTransferDiff(
  currentTransfer: string,
  baselineTransfer: string,
): number {
  return 1 - bytes.parse(currentTransfer) / bytes.parse(baselineTransfer);
}

function getAverageDiff(diff: BenchmarksDiff) {
  const validDiffs = Object.values(diff).filter(
    (d) => d && d.requestsPerSecDiff !== undefined && d.transferPerSecDiff !== undefined
  );
  
  const totalDiff = validDiffs.reduce((acc, d) => {
    return acc + (d!.requestsPerSecDiff ?? 0) + (d!.transferPerSecDiff ?? 0);
  }, 0);
  
  return totalDiff / (validDiffs.length * 2);
}

function getRequestDiff(currentRequest: number, baselineRequest: number) {
  return 1 - currentRequest / baselineRequest;
}

function formatPerc(n: number) {
  return (n > 0 ? '+' : '') + (n * 100).toFixed(2) + '%';
}

interface BenchmarkDiff {
  transferPerSecDiff: number | undefined;
  requestsPerSecDiff: number | undefined;
}

interface BenchmarksDiff {
  [lib: string]: BenchmarkDiff;
}
