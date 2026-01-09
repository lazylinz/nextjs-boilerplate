export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Webhook is live!" });
  }

  if (req.method === "POST") {
    try {
      const payload = req.body;
      console.log("Received payload:", payload);

      // You can add custom logic here

      return res.status(200).json({ status: "ok", data: payload });
    } catch (err) {
      console.error("Error handling POST:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
