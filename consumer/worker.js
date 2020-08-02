const amqp = require('amqplib');

const queue = 'Jobs';

async function recieve() {
  function messageHandle(msg) {
    const secs = msg.content.toString().split('.').length - 1;

    console.log(' [x] Received %s', msg.content.toString());
    setTimeout(function () {
      console.log(' [x] Done');
    }, secs * 1000);
  }
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    channel.assertQueue(queue, { durable: false });
    channel.consume(queue, (msg) => messageHandle(msg), { noAck: false });
  } catch (error) {
    console.log(error);
  }
}

recieve();
