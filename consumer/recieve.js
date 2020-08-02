const amqp = require('amqplib');

const queue = 'Jobs';

async function recieve() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    channel.assertQueue(queue, { durable: false });
    channel.consume(
      queue,
      (msg) => {
        const resultString = msg.content.toString();
        console.log(resultString);
      },
      { noAck: true }
    );
  } catch (error) {
    console.log(error);
  }
}

recieve();
