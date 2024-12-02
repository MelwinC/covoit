import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    // TODO
  };

  return (
    <div className="max-w-4xl mt-10 mx-auto">
      <div>
        <h1 className="text-4xl text-center font-semibold">Nous contacter</h1>
        <p className="text-base text-center opacity-80 mt-2">
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
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Prénom"
            id="prenom"
            name="prenom"
            onChange={handleChange}
          />
        </div>
        <Input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Téléphone"
          id="phone"
          name="phone"
          onChange={handleChange}
        />
        <Textarea
          placeholder="Message"
          id="message"
          name="message"
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Envoyer</Button>
      </div>
    </div>
  );
};

export default Contact;
