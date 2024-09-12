# Node cluster launcher

CLI utility to launch a cluster of nodes on a local machine.

## Installation

Copy `cluster` script to a directory in your project (`./bin/cluster` for example) and make it executable.

## Usage

Arguments:

- `name` - name of the cluster
- `path to your worker` - path to the worker script (ES module)
- `number of workers` - number of workers to launch (default is the number of CPU cores on the machine)

```bash
./bin/cluster [name] [path to your worker] <number of workers>
```

Currently, the entry point in your worker script MUST be a function (no side effects).

This function cannot take any arguments.

The function is selected based on the following heuristic:

- The function is the `default export`
- The function is exported and is named `start`
- The worker module has only one function that is a named `export`.

## Example worker

The example worker provided in this project is a simple HTTP server that fails when the worker process id is even to test the cluster's ability to recover from worker failures.

```javascript
import process from "node:process";
import Fastify from "fastify";

export default async function () {
  const fastify = Fastify({ logger: false });

  fastify.get("/", (request, reply) => {
    if (process.pid % 2 === 0) {
      process.exit(1);
    }
    return `Hello from ${process.pid}`;
  });

  await fastify.listen({ port: 3000 });
}
```

## TODO

- [ ] Add support for worker functions that take arguments
- [ ] Add support for workers started with side effects
