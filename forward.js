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