// In-memory analytics store
interface Analytics {
  totalVisits: number;
  totalCopies: number;
  lastUpdated: string;
}

const analytics: Analytics = {
  totalVisits: 0,
  totalCopies: 0,
  lastUpdated: new Date().toISOString(),
};

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    // Get current analytics
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(analytics);
    return;
  }

  if (req.method === "POST") {
    const { action } = req.body;

    if (action === "visit") {
      analytics.totalVisits += 1;
      analytics.lastUpdated = new Date().toISOString();
      res
        .status(200)
        .json({ success: true, totalVisits: analytics.totalVisits });
      return;
    }

    if (action === "copy") {
      analytics.totalCopies += 1;
      analytics.lastUpdated = new Date().toISOString();
      res
        .status(200)
        .json({ success: true, totalCopies: analytics.totalCopies });
      return;
    }

    res.status(400).json({ error: "Invalid action" });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
