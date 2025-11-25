import axios from "axios";

export async function syncToMerchant(productId, productData) {
  try {
    await axios.post("https://merchant-sync.vercel.app/api/syncProduct", {
      productId,
      data: productData, // null = delete
    });

    console.log("Synced to Merchant:", productId);
  } catch (err) {
    console.error("Merchant Sync Error:", err.message);
  }
}
