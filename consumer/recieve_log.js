const amqp = require('amqplib');

const queue = 'Jobs';

async function recieve() {
  function messageHandle(msg) {
    if (msg.content) {
      console.log(' [x] Received %s', msg.content.toString());
    }
  }
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    var exchange = 'logs';

    channel.assertExchange(exchange, 'fanout', {
      durable: false,
    });

    const asQueue = await channel.assertQueue('', { exclusive: true });
    console.log(
      ' [*] Waiting for messages in %s. To exit press CTRL+C',
      asQueue.queue
    );
    channel.bindQueue(asQueue.queue, exchange, '');
    channel.consume(queue, (msg) => messageHandle(msg), { noAck: true });
  } catch (error) {
    console.log(error);
  }
}

recieve();
