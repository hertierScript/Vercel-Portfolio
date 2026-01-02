import { Resend } from "resend";

// Lazy getter for the Resend instance
export const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set in environment variables");
  }

  return new Resend(apiKey);
};

// Main function to send contact form email
export async function sendContactEmail({ name, email, purpose, message }) {
  try {
    const purposeLabels = {
      development: "Software Development",
      mentorship: "Forex Mentorship",
      both: "Both Services",
      other: "Other Inquiry",
    };

    const purposeText = purposeLabels[purpose] || purpose || "General Inquiry";

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Purpose:</strong> ${purposeText}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #007bff; margin-top: 10px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
        <p style="color: #666; font-size: 14px;">
          This message was sent from your portfolio contact form.
        </p>
      </div>
    `;

    // Get Resend instance only when sending (safe after dotenv loaded)
    const resend = getResend();

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // You can customize this later with a verified domain
      to: "hertiermunyakazi047@gmail.com", // ← Your receiving email
      replyTo: email, // Correct property name (camelCase)
      subject: `Portfolio Contact: ${purposeText} from ${name}`,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: error.message || "Failed to send email" };
  }
}
