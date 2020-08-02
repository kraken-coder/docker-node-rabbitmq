const amqp = require('amqplib');

const msg = `HELLO WORLD ${Date.now()}`;

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'logs';
    channel.assertExchange('logs', 'fanout', { durable: false });
    channel.publish(exchange, '', Buffer.from(msg));
    console.log(` queue sennt ${msg}`);
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

connect();
