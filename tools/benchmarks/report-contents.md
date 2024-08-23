## Benchmark Results

| (index) | Framework | Requests/sec | Transfer/sec | Latency  | Total Requests | Total Duration | Transfer Total | Latency Stdev | Latency Max |
|---------|-----------|--------------|--------------|----------|----------------|----------------|----------------|---------------|-------------|
|    0    | express   | 20498.06     | 3.44MB       | 49.69ms  | 206068         | 10.05s         | 34.59MB        | 8.54ms        | 226.57ms    |
|    1    | fastify   | 20236.75     | 3.40MB       | 49.38ms  | 204174         | 10.09s         | 34.27MB        | 9.93ms        | 218.18ms    |
|    2    | koa       | 19091.1      | 3.20MB       | 53.01ms  | 192829         | 10.10s         | 32.37MB        | 56.53ms       | 991.31ms    |
|    3    | hapi      | 18014        | 3.02MB       | 59.74ms  | 181045         | 10.05s         | 30.39MB        | 100.99ms      | 1.40s       |

