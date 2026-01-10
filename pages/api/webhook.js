// pages/api/llm.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const body = req.body;

  if (!body.messages || !Array.isArray(body.messages)) {
    return res.status(400).json({ error: "Missing messages array" });
  }

  try {
    // Use the OpenAI-compatible POST endpoint
    const pollinationsRes = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await pollinationsRes.text();

    if (!pollinationsRes.ok) {
      return res.status(502).json({ error: "Upstream error", details: text });
    }

    // Send back raw text (or parse as JSON if the endpoint returns JSON)
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: "Internal error", message: err.message });
  }
}