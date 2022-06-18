import dbConnect from "../lib/dbConnect";
import Lead from "../models/Lead";

export default async function handler(req, res) {
  const { method } = req;

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "https://uppernodes.com");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const lead = new Lead({
          name: req.body.name,
          phone: req.body.phone,
        });
        await lead.save();
        res.status(201).json({ success: true, data: lead });
      } catch (error) {
        res.status(404).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
