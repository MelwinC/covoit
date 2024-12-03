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

const Profil = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-center font-semibold text-4xl mb-10">Mon profil</h1>
      <div className="w-2/3 mx-auto flex flex-col gap-4">
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
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />

        <Button>Enregistrer</Button>
      </div>
    </div>
  );
};

export default Profil;
