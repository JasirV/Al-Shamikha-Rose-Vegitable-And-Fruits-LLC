import { google } from "googleapis";
import admin from "firebase-admin";
import serviceAccount from "./alshamikharosellc-3e9d7-8c2ed6ed2478.json"; // adjust path

// Initialize Firebase Admin once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const MERCHANT_ID = "5684055726";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // replace * with frontend URL in prod
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { productId, data } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Missing productId" });
    }

    // Google Merchant Auth using service account JSON
    const authClient = new google.auth.JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ["https://www.googleapis.com/auth/content"],
    });

    await authClient.authorize(); // authorize the client

    const content = google.content("v2.1");

    // DELETE product if no data
    if (!data) {
      await content.products.delete({
        merchantId: MERCHANT_ID,
        productId,
        auth: authClient,
      });
      return res.json({ success: true, msg: "Product deleted" });
    }

    // ADD / UPDATE product
    const productPayload = {
      offerId: productId,
      title: data.name,
      description: data.description || "",
      link: `https://rosevegitables.com/product/${productId}`,
      imageLink: data.image || "",
      price: {
        value: data.price.toString(),
        currency: "AED",
      },
      availability: "in stock",
      condition: "new",
      contentLanguage: "en",
      targetCountry: "AE",
      channel: "online",
    };

    await content.products.insert({
      merchantId: MERCHANT_ID,
      auth: authClient,
      requestBody: productPayload,
    });

    return res.json({ success: true, msg: "Product synced" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
