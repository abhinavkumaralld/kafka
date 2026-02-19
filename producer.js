const { kafka } = require("./index");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
async function produceMessage() {
  const producer = kafka.producer();
  await producer.connect();
  rl.setPrompt("> ");
  rl.prompt();
  rl.on("line", async (line) => {
    const [name, location] = line.split(" ");
    const partition = location?.toUpperCase() == "NORTH" ? 0 : 1;
    await producer.send({
      topic: "abhi-topic",
      messages: [{ value: JSON.stringify({ name, location }), partition }],
    });
  }).on("close", async () => {
    console.log("Closing producer");
    await producer.disconnect();
  });
}

produceMessage();
