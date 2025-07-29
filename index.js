const express = require('express');
const venom = require('venom-bot');

const app = express();
const port = process.env.PORT || 5000;

venom
  .create({
    session: 'whatsapp-ai-assistant',
  })
  .then((client) => start(client))
  .catch((error) => {
    console.error('Error initializing Venom Bot:', error);
  });

function start(client) {
  app.use(express.json());

  app.post('/webhook', async (req, res) => {
    const message = req.body.message || '';
    const sender = req.body.sender || '';

    if (message && sender) {
      await client.sendText(sender, `Received: ${message}`);
      return res.status(200).send({ status: 'sent' });
    }

    res.status(400).send({ error: 'Invalid payload' });
  });

  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
}
