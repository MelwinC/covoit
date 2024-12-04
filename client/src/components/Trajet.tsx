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
import { useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { getVilleById, getVilles } from "@/services/ville";
import { Trajet as TrajetType } from "@/types/trajet";
import { getUserInfo } from "@/services/auth";
import { deleteTrajet, reserver, updateTrajet } from "@/services/trajet";
import Toast from "./Toast";
import { HTTPError } from "ky";

type Props = {
  trajet: TrajetType;
  createMode: boolean;
  refetchTrajetsConducteur?: () => void;
};

const Trajet = ({ trajet, createMode, refetchTrajetsConducteur }: Props) => {
  useAuth();

  const { data: villes, isLoading: isLoadingVilles } = useQuery({
    queryKey: ["villes"],
    queryFn: getVilles,
  });

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(trajet?.idPersonne),
  });

  const { data: villeDep, isLoading: isLoadingVilleDep } = useQuery({
    queryKey: ["villeDep", trajet.idVille1],
    queryFn: () => getVilleById(trajet.idVille1),
    enabled: !!trajet.idVille1,
  });

  const { data: villeArr, isLoading: isLoadingVilleArr } = useQuery({
    queryKey: ["villeArr", trajet.idVille2],
    queryFn: () => getVilleById(trajet.idVille2),
    enabled: !!trajet.idVille2,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [villeIdDep, setVilleIdDep] = useState<number>(0);
  const [villeIdArr, setVilleIdArr] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [kms, setKms] = useState<number>(0);
  const [nbPlaces, setNbPlaces] = useState<number>(0);
  const [prix, setPrix] = useState<number>(0);

  const getDate = trajet.dateT ? new Date(trajet.dateT) : null;

  const reservation = async () => {
    if (trajet.placeProposees === 0) {
      Toast(false, "Le trajet est déjà plein.");
      return;
    }
    try {
      await reserver(trajet.id);
      Toast(true, "Votre réservation a bien été prise en compte !");
    } catch (error) {
      if (error instanceof HTTPError) {
        Toast(false, "Vous êtes déjà inscrit à ce trajet.");
      }
    }
  };

  const removeTrajet = async () => {
    await deleteTrajet(trajet.id);
    if (refetchTrajetsConducteur) refetchTrajetsConducteur();
    Toast(true, "Le trajet a bien été supprimé ! ");
  };

  const handleUpdate = async () => {
    if (
      villeIdDep === 0 ||
      villeIdArr === 0 ||
      !date ||
      !time ||
      !kms ||
      !nbPlaces ||
      !prix
    ) {
      Toast(false, "Veuillez remplir tous les champs.");
    } else {
      const data = {
        km: kms,
        place_proposees: nbPlaces,
        prix,
        id_ville_1: villeIdDep,
        id_ville_2: villeIdArr,
        dateT: date.toISOString(),
      };
      await updateTrajet(trajet.id, data);
      Toast(true, "Votre trajet a bien été modifié !");
      setIsDialogOpen(false);
      if (refetchTrajetsConducteur) refetchTrajetsConducteur();
    }
  };

  useEffect(() => {
    if (trajet) {
      setPrix(trajet.prix);
      setNbPlaces(trajet.placeProposees);
      setKms(trajet.km);
      setDate(new Date(trajet.dateT));
      setVilleIdDep(trajet.idVille1);
      setVilleIdArr(trajet.idVille2);
    }
  }, [trajet]);

  if (
    isLoadingVilles ||
    isLoadingUser ||
    isLoadingVilleDep ||
    isLoadingVilleArr
  )
    return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-between py-5 border-b-2">
      <div className="flex items-center gap-14">
        <p>{`${user?.prenom} ${user?.nom}`}</p>
        <p>{`${trajet?.placeProposees} places`}</p>
        <p>{`${villeDep?.ville} - ${villeArr?.ville} (${trajet.km} kms)`}</p>
        <p>{`${getDate?.toLocaleDateString(
          "fr-FR"
        )} - ${getDate?.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}`}</p>
        <p>{`${kms} kms`}</p>
      </div>
      {createMode ? (
        <div className="flex items-center gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant={"secondary"}
                onClick={() => setIsDialogOpen(true)}
              >
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Mise à jour du trajet</DialogTitle>
                <DialogDescription>
                  Veuillez remplir tous les champs pour modifier votre trajet
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <Select onValueChange={(value) => setVilleIdDep(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder={villeDep?.ville} />
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
                    <SelectValue placeholder={villeArr?.ville} />
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
                <Input
                  id="heure"
                  className="col-span-3"
                  type="time"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTime(e.target.value)
                  }
                />
                <Input
                  id="kms"
                  className="col-span-3"
                  placeholder="Nombre de kilomètres"
                  type="number"
                  min={0}
                  value={kms > 0 ? kms : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = Number(e.target.value);
                    setKms(value >= 0 ? value : 0);
                  }}
                />
                <Input
                  id="nbPlaces"
                  className="col-span-3"
                  placeholder="Nombre de places"
                  type="number"
                  min={0}
                  value={nbPlaces > 0 ? nbPlaces : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = Number(e.target.value);
                    setNbPlaces(value >= 0 ? value : 0);
                  }}
                />
                <Input
                  id="prix"
                  className="col-span-3"
                  placeholder="Prix"
                  type="number"
                  min={0}
                  value={prix > 0 ? prix : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = Number(e.target.value);
                    setPrix(value >= 0 ? value : 0);
                  }}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleUpdate}>Modifier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="destructive" onClick={removeTrajet}>
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
