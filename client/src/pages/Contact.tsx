import Toast from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/use-auth";
import { sendEmail } from "@/services/brevo";
import { useEffect, useState } from "react";

const Contact = () => {
  useAuth();
  
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider une adresse e-mail
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!nom || !prenom || !email || !telephone || !message) {
      setErrorMsg("Veuillez remplir tous les champs.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg("Veuillez entrer une adresse email valide.");
      return;
    }

    sendEmail(nom, prenom, email, telephone, message);
    resetFields();

    Toast(true, "Votre message a bien été envoyé !");
  };

  const resetFields = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setTelephone("");
    setMessage("");
  };

  useEffect(() => {
    setErrorMsg(null);
  }, [nom, prenom, email, telephone, message]);

  return (
    <div className="max-w-4xl mt-10 mx-auto px-6">
      <div>
        <h1 className="text-4xl text-center font-semibold">Nous contacter</h1>
        <p className="text-base text-center text-gray-600 mt-2">
          Si vous avez une quelconque question, nous sommes la pour y répondre !
        </p>
      </div>

      <div className="mt-10 max-w-2xl mx-auto flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Nom"
            id="nom"
            name="nom"
            value={nom}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNom(e.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Prénom"
            id="prenom"
            name="prenom"
            value={prenom}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrenom(e.target.value)
            }
          />
        </div>
        <Input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          type="text"
          placeholder="Téléphone"
          id="phone"
          name="phone"
          value={telephone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTelephone(e.target.value)
          }
        />
        <Textarea
          placeholder="Message"
          id="message"
          name="message"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
        />
        {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
        <Button onClick={handleSubmit}>Envoyer</Button>
      </div>
    </div>
  );
};

export default Contact;
