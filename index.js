const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "abhi-kafka",
  brokers: ["localhost:9092"], // change if remote
});

// -------- ADMIN (Create Topic) ----------
async function createTopic() {
  const admin = kafka.admin();
  await admin.connect();

  await admin.createTopics({
    topics: [
      {
        topic: "abhi-topic",
        numPartitions: 2,
        replicationFactor: 1,
      },
    ],
  });

  console.log("Topic created");
  await admin.disconnect();
}

(async () => {
  await createTopic(); // optional if auto-create enabled
})();

module.exports = { kafka };
