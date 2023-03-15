# Today, AI writes better and faster than me

Write a qualified program in 7 steps

## First Wish (1/7)

> Can you write a NodeJS program which forward TCP traffic?

Yes, I can help you with that. Here is a simple NodeJS program that forwards TCP traffic:

```
const net = require('net');

const server = net.createServer((socket) => {
  const client = net.createConnection({ port: 8080, host: 'localhost' });
  socket.pipe(client);
  client.pipe(socket);
});

server.listen(3000, () => {
  console.log('TCP traffic forwarding server started on port 3000');
});
```

This program listens on port 3000 and forwards all incoming TCP traffic to localhost:8080. You can modify the port and host values to suit your needs.

Let me know if you have any questions or if there’s anything else I can help you with.

## Configurable Destination (2/7)

> read the destination host and port from startup parameters

Sure, you can read the destination host and port from the command line arguments like this:

```
const net = require('net');

const [destHost, destPort] = process.argv.slice(2);

const server = net.createServer((socket) => {
  const client = net.createConnection({ port: destPort, host: destHost });
  socket.pipe(client);
  client.pipe(socket);
});

server.listen(3000, () => {
  console.log(`TCP traffic forwarding server started on port 3000, forwarding to ${destHost}:${destPort}`);
});
```

This program reads the destination host and port from the command line arguments and listens on port 3000. You can run the program like this:

node forward.js localhost 8080
This will forward all incoming TCP traffic to localhost:8080. You can replace localhost and 8080 with the desired destination host and port.

Let me know if you have any questions or if there’s anything else I can help you with.

## Configurable Server Port (3/7)

> also the server port

Sure, you can read the destination host, port, and server port from the command line arguments like this:

```
const net = require('net');

const [destHost, destPort, serverPort] = process.argv.slice(2);

const server = net.createServer((socket) => {
  const client = net.createConnection({ port: destPort, host: destHost });
  socket.pipe(client);
  client.pipe(socket);
});

server.listen(serverPort, () => {
  console.log(`TCP traffic forwarding server started on port ${serverPort}, forwarding to ${destHost}:${destPort}`);
});
```

This program reads the destination host, port, and server port from the command line arguments. You can run the program like this:

```
node forward.js localhost 8080 3000
```
This will forward all incoming TCP traffic to localhost:8080 and listen on port 3000. You can replace localhost, 8080, and 3000 with the desired destination host, port, and server port.

Let me know if you have any questions or if there’s anything else I can help you with.

## Reorder Parameters (4/7)

> reorder the startup parameters. I would like server port first

Sure, you can reorder the command line arguments like this:

```
const net = require('net');

const [serverPort, destHost, destPort] = process.argv.slice(2);

const server = net.createServer((socket) => {
  const client = net.createConnection({ port: destPort, host: destHost });
  socket.pipe(client);
  client.pipe(socket);
});

server.listen(serverPort, () => {
  console.log(`TCP traffic forwarding server started on port ${serverPort}, forwarding to ${destHost}:${destPort}`);
});
```

This program reads the destination host, port, and server port from the command line arguments. You can run the program like this:

```
node forward.js 3000 localhost 8080
```

This will forward all incoming TCP traffic to localhost:8080 and listen on port 3000. You can replace 3000, localhost, and 8080 with the desired server port, destination host, and port.

Let me know if you have any questions or if there’s anything else I can help you with.

## Catch Errors (5/7)

> catch error and write to both console and connection if possible

Sure, you can catch errors and write to both console and connection like this:

```
const net = require('net');

const [serverPort, destHost, destPort] = process.argv.slice(2);

const server = net.createServer((socket) => {
  const client = net.createConnection({ port: destPort, host: destHost });
  socket.pipe(client);
  client.pipe(socket);

  client.on('error', (err) => {
    console.error(`Error: ${err}`);
    socket.write(`Error: ${err}\n`);
  });

  socket.on('error', (err) => {
    console.error(`Error: ${err}`);
    client.write(`Error: ${err}\n`);
  });
});

server.listen(serverPort, () => {
  console.log(`TCP traffic forwarding server started on port ${serverPort}, forwarding to ${destHost}:${destPort}`);
});
```

This program catches errors from both the client and server connections and writes them to both the console and the connection. You can run the program like this:

```
node forward.js 3000 localhost 8080
```

This will forward all incoming TCP traffic to localhost:8080 and listen on port 3000. You can replace 3000, localhost, and 8080 with the desired server port, destination host, and port.

Let me know if you have any questions or if there’s anything else I can help you with.

## Catch Error after Testing (6/7)

> catch error from the "net.createConnection" line as well

Sure, you can catch errors from the net.createConnection line like this:

```
const net = require('net');

const [serverPort, destHost, destPort] = process.argv.slice(2);

const server = net.createServer((socket) => {
  const client = net.createConnection({ port: destPort, host: destHost }, () => {
    socket.pipe(client);
    client.pipe(socket);
  });

  client.on('error', (err) => {
    console.error(`Error: ${err}`);
    socket.write(`Error: ${err}\n`);
  });

  socket.on('error', (err) => {
    console.error(`Error: ${err}`);
    client.write(`Error: ${err}\n`);
  });

  client.on('close', () => {
    console.log('Client connection closed');
    socket.end();
  });
});

server.on('error', (err) => {
  console.error(`Error: ${err}`);
});

server.listen(serverPort, () => {
  console.log(`TCP traffic forwarding server started on port ${serverPort}, forwarding to ${destHost}:${destPort}`);
});
```

This program catches errors from the net.createConnection line and writes them to both the console and the connection. You can run the program like this:

```
node forward.js 3000 localhost 8080
```

This will forward all incoming TCP traffic to localhost:8080 and listen on port 3000. You can replace 3000, localhost, and 8080 with the desired server port, destination host, and port.

Let me know if you have any questions or if there’s anything else I can help you with.


## Teach Him Specifically (7/7)

> wrap the "createConnection" line by try-catch

Sure, you can wrap the net.createConnection line in a try-catch block like this:

```
const net = require('net');

const [serverPort, destHost, destPort] = process.argv.slice(2);

const server = net.createServer((socket) => {
  let client;

  try {
    client = net.createConnection({ port: destPort, host: destHost }, () => {
      socket.pipe(client);
      client.pipe(socket);
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    socket.write(`Error: ${err}\n`);
    return;
  }

  client.on('error', (err) => {
    console.error(`Error: ${err}`);
    socket.write(`Error: ${err}\n`);
  });

  socket.on('error', (err) => {
    console.error(`Error: ${err}`);
    client.write(`Error: ${err}\n`);
  });

  client.on('close', () => {
    console.log('Client connection closed');
    socket.end();
  });
});

server.on('error', (err) => {
  console.error(`Error: ${err}`);
});

server.listen(serverPort, () => {
  console.log(`TCP traffic forwarding server started on port ${serverPort}, forwarding to ${destHost}:${destPort}`);
});
```

This program catches errors from the net.createConnection line and writes them to both the console and the connection. You can run the program like this:

```
node forward.js 3000 localhost 8080
```
This will forward all incoming TCP traffic to localhost:8080 and listen on port 3000. You can replace 3000, localhost, and 8080 with the desired server port, destination host, and port.

Let me know if you have any questions or if there’s anything else I can help you with.

## Done.

We are done.
