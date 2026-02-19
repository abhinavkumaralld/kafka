const { kafka } = require("./index");

const group = process.argv[2];
async function consume() {
  const consumer = kafka.consumer({ groupId: group });

  await consumer.connect();
  await consumer.subscribe({ topic: "abhi-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
        topic,
        partition,
        group,
      });
    },
  });
}

consume();
