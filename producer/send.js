const amqp = require('amqplib');

const queue = 'Jobs';
const message = {
  title: 'front end developer in silicon valley',
  compensation: '20000/mt',
};
async function connect() {
  const payload = JSON.stringify(message);
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(payload));
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

connect();
