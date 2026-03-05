const { Resend } = require("resend");

function getClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in environment variables");
  }
  console.log(process.env.RESEND_API_KEY)
  return new Resend(process.env.RESEND_API_KEY);
}
// const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "EventHub <onboarding@resend.dev>"

async function sendBookingConfirmation({ name, email, event }) {
try {
  
  const resend = getClient();

  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: `You're registered! ${event.title}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Booking Confirmed</title>
      </head>
      <body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header bar -->
                <tr>
                  <td style="background:${event.imageColor || "#6175f4"};height:6px;"></td>
                </tr>

                <!-- Logo / Brand -->
                <tr>
                  <td style="padding:32px 40px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#4b55ea;border-radius:8px;width:32px;height:32px;text-align:center;vertical-align:middle;">
                          <span style="color:#fff;font-size:16px;font-weight:bold;">⚡</span>
                        </td>
                        <td style="padding-left:10px;font-size:18px;font-weight:700;color:#1e293b;letter-spacing:-0.5px;">EventHub</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Confirmation badge -->
                <tr>
                  <td style="padding:28px 40px 0;">
                    <div style="display:inline-block;background:#ecfdf5;border-radius:999px;padding:6px 14px;">
                      <span style="color:#059669;font-size:13px;font-weight:600;">✓ &nbsp;Registration Confirmed</span>
                    </div>
                  </td>
                </tr>

                <!-- Heading -->
                <tr>
                  <td style="padding:16px 40px 0;">
                    <h1 style="margin:0;font-size:26px;font-weight:800;color:#0f172a;line-height:1.3;">
                      You're in, ${name.split(" ")[0]}! 🎉
                    </h1>
                    <p style="margin:10px 0 0;font-size:15px;color:#64748b;line-height:1.6;">
                      Your seat has been reserved. Here are your booking details.
                    </p>
                  </td>
                </tr>

                <!-- Event details card -->
                <tr>
                  <td style="padding:28px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
                      <tr>
                        <td style="padding:6px 0 0;height:4px;background:${event.imageColor || "#6175f4"};border-radius:12px 12px 0 0;"></td>
                      </tr>
                      <tr>
                        <td style="padding:24px;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Event</p>
                          <p style="margin:0 0 20px;font-size:18px;font-weight:700;color:#0f172a;">${event.title}</p>

                          <table cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                                <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Date & Time</p>
                                <p style="margin:0;font-size:14px;color:#334155;font-weight:500;">${eventDate}</p>
                              </td>
                              <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                                <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Location</p>
                                <p style="margin:0;font-size:14px;color:#334155;font-weight:500;">${event.location}</p>
                              </td>
                            </tr>
                            <tr>
                              <td width="50%" style="vertical-align:top;">
                                <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Attendee</p>
                                <p style="margin:0;font-size:14px;color:#334155;font-weight:500;">${name}</p>
                              </td>
                              <td width="50%" style="vertical-align:top;">
                                <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Email</p>
                                <p style="margin:0;font-size:14px;color:#334155;font-weight:500;">${email}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Note -->
                <tr>
                  <td style="padding:0 40px 32px;">
                    <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
                      Keep this email as your confirmation. If you have any questions, just reply to this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:20px 40px;border-top:1px solid #f1f5f9;">
                    <p style="margin:0;font-size:12px;color:#cbd5e1;text-align:center;">
                      © ${new Date().getFullYear()} EventHub. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
  
} catch (error) {
  console.log(error)
}


}

module.exports = { sendBookingConfirmation };