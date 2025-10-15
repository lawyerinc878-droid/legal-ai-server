import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// main endpoint
app.post("/legal-ai", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful Indian legal assistant. Provide only general legal information, not professional advice.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("✅ Server started on port 3000"));
