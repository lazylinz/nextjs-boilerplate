// pages/api/llm.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const body = req.body;

  // Validate minimal shape
  if (!body.messages || !Array.isArray(body.messages)) {
    return res.status(400).json({ error: "Missing messages array" });
  }

  try {
    const pollinationsRes = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!pollinationsRes.ok) {
      const errorText = await pollinationsRes.text();
      return res.status(502).json({ error: "Upstream error", details: errorText });
    }

    // Pollinations returns raw text by default
    const text = await pollinationsRes.text();
    
    return res.status(200).json({ result: text });

  } catch (err) {
    return res.status(500).json({ error: "Internal error", message: err.message });
  }
}
