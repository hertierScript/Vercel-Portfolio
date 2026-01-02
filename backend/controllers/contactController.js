import { sendContactEmail } from "../lib/resend.js";

export const sendContact = async (req, res) => {
  try {
    const { name, email, purpose, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and message are required",
      });
    }

    // Send email
    const result = await sendContactEmail({
      name,
      email,
      purpose,
      message,
    });

    if (!result.success) {
      console.error("Email sending failed:", result.error);
      return res.status(500).json({
        error: "Failed to send email",
      });
    }

    res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
