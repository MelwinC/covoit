import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";
import { getCurrentUserInfo } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

const Profil = () => {
  useAuth();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserInfo,
  });

  //TODO voiture + update
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleSave = () => {
    console.log(username);
    console.log(telephone);
  }

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setTelephone(user.telephone);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-center font-semibold text-4xl mb-10">Mon profil</h1>
      <div className="w-2/3 mx-auto flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Pseudo"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <Input
          type="text"
          placeholder="Numéro de téléphone"
          value={telephone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTelephone(e.target.value)
          }
        />

        <Button onClick={handleSave}>Enregistrer</Button>
      </div>
    </div>
  );
};

export default Profil;
