import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Register = () => {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-center font-semibold text-4xl mb-10">
        Inscrivez-vous à AlloCovoit
      </h1>
      <div className="w-1/3">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <Input type="text" placeholder="Nom" />
            <Input type="text" placeholder="Prénom" />
            <Input type="text" placeholder="Pseudo" />
            <Input type="text" placeholder="Numéro de téléphone" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
          </div>
        )}

        <div className="flex justify-between mt-4">
          {step === 2 && <Button onClick={prevStep}>Retour</Button>}

          <div className="w-full flex justify-end">
            {step === 1 && <Button onClick={nextStep}>Suivant</Button>}
            {step === 2 && <Button>S'inscrire</Button>}
          </div>
        </div>

        <p className="mt-4">
          Vous avez déjà un compte ?{" "}
          <span>
            <a href="/" className="font-medium hover:underline">
              Connexion
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
