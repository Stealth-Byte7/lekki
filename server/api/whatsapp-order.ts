export async function sendWhatsAppAlert(orderData: any) {
  // 1. Build a clean, professional order template for the lounge staff
  const messageBody = 
    `🚨 *NEW LOUNGE ORDER PLACED!* 🚨\n\n` +
    `👤 *Customer:* ${orderData.name}\n` +
    ` *Table:* ${orderData.table}\n` +
    `🛒 *Items Ordered:* ${orderData.items}\n` +
    ` *Total Amount:* ₦${orderData.total.toLocaleString()}\n` +
    ` *Timestamp:* ${new Date().toLocaleTimeString()}\n\n` +
    `⚡ _Please prepare immediately!_`;

  console.log("Dispatching background payload to manager numbers...");

  try {
    // 2. Fire the asynchronous request directly to your WhatsApp gateway endpoint
    const response = await fetch('YOUR_WHATSAPP_GATEWAY_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numbers: [process.env.MANAGER_ONE, process.env.MANAGER_TWO],
        message: messageBody
      })
    });

    if (response.ok) {
      console.log("WhatsApp alert delivered perfectly to managers!");
    }
  } catch (error) {
    console.error("Failed to push WhatsApp payload:", error);
  }
}