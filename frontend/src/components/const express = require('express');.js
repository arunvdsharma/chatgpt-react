const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ...your routes...

app.listen(PORT, () => {
  console.log(`LLM backend running on http://localhost:${PORT}`);
});