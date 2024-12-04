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
  const [variant, setVariant] = useState<string>("login");

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const toggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6">
      <h1 className="text-center font-semibold text-2xl md:text-4xl mb-10">
        {variant === "login" ? "Connectez-vous" : "Inscrivez-vous"} à AlloCovoit
      </h1>
      <div className="w-full md:w-2/3 lg:w-1/3">
        {variant === "register" && step === 1 && (
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

        {(variant === "login" || step === 2) && (
          <div className="flex flex-col gap-4">
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
          </div>
        )}

        <div className="flex justify-between mt-4">
          {variant === "register" && step === 2 && (
            <Button onClick={prevStep}>Retour</Button>
          )}

          <div className="w-full flex justify-end">
            {variant === "register" && step === 1 && (
              <Button onClick={nextStep}>Suivant</Button>
            )}

            {(variant === "login" ||
              (variant === "register" && step === 2)) && (
              <Button>
                {variant === "register" ? "S'inscrire" : "Se connecter"}
              </Button>
            )}
          </div>
        </div>

        <p className="mt-4">
          Vous avez déjà un compte ?{" "}
          <span
            onClick={toggleVariant}
            className="font-medium hover:underline cursor-pointer"
          >
            Connexion
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
