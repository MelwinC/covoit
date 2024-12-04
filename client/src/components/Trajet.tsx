import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import useAuth from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { getVilleById, getVilles } from "@/services/ville";
import { Trajet as TrajetType } from "@/types/trajet";
import { getUserInfo } from "@/services/auth";
import { reserver } from "@/services/trajet";

type Props = {
  trajet: TrajetType;
  createMode: boolean;
};

const Trajet = ({ trajet, createMode }: Props) => {
  useAuth();

  console.log(trajet);

  const {
    data: villes,
    isLoading: isLoadingVilles,
    error: errorVilles,
  } = useQuery({
    queryKey: ["villes"],
    queryFn: getVilles,
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(trajet?.id_personne),
  });

  const {
    data: villeDep,
    isLoading: isLoadingVilleDep,
    error: errorVilleDep,
  } = useQuery({
    queryKey: ["villeDep"],
    queryFn: () => getVilleById(trajet?.id_ville_1),
  });

  const {
    data: villeArr,
    isLoading: isLoadingVilleArr,
    error: errorVilleArr,
  } = useQuery({
    queryKey: ["villeDepArr"],
    queryFn: () => getVilleById(trajet?.id_ville_2),
  });

  const [date, setDate] = useState<Date>();
  const [villeIdDep, setVilleIdDep] = useState<number>(0);
  const [villeIdArr, setVilleIdArr] = useState<number>(0);

  const getDate = trajet.dateT ? new Date(trajet.dateT) : null;

  const reservation = async () => {
    const response = await reserver(trajet.id);
    if(response === "La personne est déjà inscrite à ce trajet") console.error("Vous êtes déjà inscrit à ce trajet");
    //TODO setError
  }

  if (isLoadingVilles || isLoadingUser || isLoadingVilleArr || isLoadingVilleDep) return <div>Loading...</div>;
  if (errorVilles || errorUser || errorVilleDep || errorVilleArr) return <div>Error fetching data</div>;

  return (
    <div className="flex items-center justify-between py-5 border-b-2">
      <div className="flex items-center gap-20">
        <p>{`${user?.prenom} ${user?.nom}`}</p>
        <p>{`${trajet?.place_proposees} places`}</p>
        <p>{`${villeDep?.ville} - ${villeArr?.ville} (${trajet.km} kms)`}</p>
        <p>{`${getDate?.toLocaleDateString()}`}</p>
        <p>{`${String(getDate?.getHours()).padStart(2, "0")}:${String(getDate?.getMinutes()).padStart(2, "0")}`}</p>
      </div>
      {createMode ? (
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Création du trajet</DialogTitle>
                <DialogDescription>
                  Veuillez remplir tous les champs pour créer votre trajet
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <Select onValueChange={(value) => setVilleIdDep(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="D'où partez-vous ?" />
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
                <Select onValueChange={(value) => setVilleIdArr(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Où arrivez-vous ?" />
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Quel jour ?</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input id="heure" className="col-span-3" type="time"/>
              </div>
              <DialogFooter>
                <Button type="submit">Créer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="destructive">
            <Trash2 />
          </Button>
        </div>
      ) : (
        <Button onClick={reservation}>Réserver</Button>
      )}
    </div>
  );
};

export default Trajet;
