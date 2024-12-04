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
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVilles } from "@/services/ville";
import { signIn, signUp } from "@/services/auth";
import useAuth from "@/hooks/use-auth";

const Auth = () => {
  useAuth();
  
  const {
    data: villes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["villes"],
    queryFn: getVilles,
  });

  const [step, setStep] = useState<number>(1);
  const [variant, setVariant] = useState<string>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [villeId, setVilleId] = useState<number>(0);
  const [telephone, setTelephone] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const nextStep = (): void => {
    if(!nom || !prenom || !username || !villeId || ! telephone){
      setErrorMsg("Veuillez remplir tous les champs.")
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = (): void => {
    setStep(step - 1);
  };

  const toggleVariant = (): void => {
    setErrorMsg(null);
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };

  const validateFields = (): boolean => {
    if((variant === "register" && (!nom || !prenom || !username || villeId === 0 || !telephone)) || !email || !password){
      setErrorMsg("Veuillez remplir tous les champs.")
      return false;
    } else {
      return true;
    }
  }

  const handleAuth = async (): Promise<void> => {
    if(!validateFields()) return;
    const user = {
      prenom,
      nom,
      email,
      telephone,
      username,
      password,
      id_ville: villeId
    }
    console.log(user);
    if(variant === "login") {
      await signIn(user)
    } else {
      await signUp(user);
    }
  };

  useEffect(() => {
    setErrorMsg(null);
  }, [nom, prenom, username, telephone, villeId])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching villes</div>;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6">
      <h1 className="text-center font-semibold text-2xl md:text-4xl mb-10">
        {variant === "login" ? "Connectez-vous" : "Inscrivez-vous"} à AlloCovoit
      </h1>
      <div className="w-full md:w-2/3 lg:w-1/3">
        {variant === "register" && step === 1 && (
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Nom"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNom(e.target.value)
              }
            />
            <Input
              type="text"
              placeholder="Prénom"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrenom(e.target.value)
              }
            />
            <Input
              type="text"
              placeholder="Pseudo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <Input
              type="text"
              placeholder="Numéro de téléphone"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTelephone(e.target.value)
              }
            />
            <Select onValueChange={(value) => setVilleId(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Villes</SelectLabel>
                  {villes?.map((ville) => (
                    <SelectItem key={ville.id} value={ville.id.toString()}>
                      {ville.ville}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {(variant === "login" || step === 2) && (
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
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
              <Button onClick={handleAuth}>
                {variant === "register" ? "S'inscrire" : "Se connecter"}
              </Button>
            )}
          </div>
        </div>

        <p className="mt-4">
          {variant === "register" && (
            <>
              Déjà inscrit ?{" "}
              <span
                onClick={toggleVariant}
                className="font-medium hover:underline cursor-pointer"
              >
                Connectez-vous
              </span>
            </>
          )}
          {variant === "login" && (
            <>
              Vous n'avez pas encore de compte ?{" "}
              <span
                onClick={toggleVariant}
                className="font-medium hover:underline cursor-pointer"
              >
                Inscrivez-vous
              </span>
            </>
          )}
        </p>

        {errorMsg && (
          <p className="text-red-600 mt-2">{errorMsg}</p>
        )}
      </div>
    </div>
  );
};

export default Auth;
