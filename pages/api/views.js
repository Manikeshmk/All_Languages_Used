let views = 0;

export default function handler(req, res) {
  if (req.method === "GET") {
    views += 1;
    return res.status(200).json({ views });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
