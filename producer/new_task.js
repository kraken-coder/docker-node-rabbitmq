const amqp = require('amqplib');

const queue = 'Jobs';
const message = process.argv.slice(2).join(' ') || 'Hello World!';
async function connect() {
  const payload = JSON.stringify(message);
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(payload), { persistent: true });
    console.log(`message sent ${message}`);
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

setTimeout(() => connect(), 4000);
