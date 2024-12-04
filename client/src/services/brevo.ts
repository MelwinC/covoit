export function sendEmail(
  nom: string,
  prenom: string,
  email: string,
  telephone: string,
  message: string,
) {
  const API_KEY = import.meta.env.VITE_BREVO_API_KEY;
  const EMAIL_RECEIVER = import.meta.env.VITE_EMAIL_RECEIVER;
  const nameSender = `${prenom} ${nom}`;
  const nameRecipient = "AlloCovoit"
  fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": `${API_KEY}`,
    },
    body: JSON.stringify({
      subject: "Contact AlloCovoit",
      htmlContent: `<html><body><p>${telephone}</p><p>${message}</p></body></html>`,
      sender: { name: nameSender, email },
      to: [{ email: EMAIL_RECEIVER, name: nameRecipient }],
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}