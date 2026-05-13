type ContactPayload = {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactPayload | null;
  const name = payload?.name?.trim() || "";
  const email = payload?.email?.trim() || "";
  const topic = payload?.topic?.trim() || "General enquiry";
  const message = payload?.message?.trim() || "";

  if (!name || !email || !message) {
    return Response.json({ error: "Please include your name, email address and message." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.LISTING_SUBMISSION_TO || !process.env.RESEND_FROM_EMAIL) {
    return Response.json({ error: "Contact email is not configured yet." }, { status: 500 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.LISTING_SUBMISSION_TO],
      reply_to: email,
      subject: `Senior Support Finder contact: ${topic}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Topic: ${topic}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "We could not send your message right now. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
