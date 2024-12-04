import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn, combineDateAndTime } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { getVilles } from "@/services/ville";
import useAuth from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import {
  createTrajet,
  getTrajetsConducteur,
  getTrajetsPassager,
} from "@/services/trajet";
import Trajet from "@/components/Trajet";
import Toast from "@/components/Toast";

function MesTrajets() {
  useAuth();

  const {
    data: villes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["villes"],
    queryFn: getVilles,
  });

  const {
    data: trajetsConducteur,
    isLoading: isLoadingTrajetsConducteur,
    error: errorTrajetsConducteur,
    refetch: refetchTrajetsConducteur,
  } = useQuery({
    queryKey: ["trajetsConducteur"],
    queryFn: getTrajetsConducteur,
  });

  const {
    data: trajetsPassager,
    isLoading: isLoadingTrajetsPassager,
    error: errorTrajetsPassager,
  } = useQuery({
    queryKey: ["trajetsPassager"],
    queryFn: getTrajetsPassager,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [villeIdDep, setVilleIdDep] = useState<number>(0);
  const [villeIdArr, setVilleIdArr] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [kms, setKms] = useState<number>(0);
  const [nbPlaces, setNbPlaces] = useState<number>(0);
  const [prix, setPrix] = useState<number>(0);

  const creerTrajet = async () => {
    if (
      !villeIdDep ||
      !villeIdArr ||
      !date ||
      !time ||
      !kms ||
      !nbPlaces ||
      !prix
    ) {
      Toast(false, "Veuillez remplir tous les champs.")
      return;
    }

    const datetime =
    combineDateAndTime(date, time)?.toISOString() ?? new Date().toISOString();

    try {
      await createTrajet(kms, nbPlaces, prix, villeIdDep, villeIdArr, datetime);

      Toast(true, "Votre trajet a bien été crée !");

      await refetchTrajetsConducteur();

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de la création du trajet :", error);
    }
  };

  if (isLoading || isLoadingTrajetsConducteur || isLoadingTrajetsPassager) return <div>Loading...</div>;
  if (error || errorTrajetsConducteur || errorTrajetsPassager) return <div>Error fetching villes</div>;

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">
        Création, Visualisation - Mes trajets
      </h1>
      <p className="text-lg text-center mt-4 text-gray-600">
        Vous pouvez ici visualiser les trajets que vous avez réserver mais
        également vous pouvez en créer
      </p>

      <Tabs defaultValue="create" className="w-full mt-10 mb-5">
        <TabsList className="w-full">
          <TabsTrigger value="create" className="w-full">
            Conducteur
          </TabsTrigger>
          <TabsTrigger value="view" className="w-full">
            Passager
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <div className="mt-5">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                  Créer un trajet
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
                  <Select
                    onValueChange={(value) => setVilleIdDep(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="D'où partez-vous ?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Villes</SelectLabel>
                        {villes?.map((ville) => (
                          <SelectItem
                            key={ville.id}
                            value={ville.id.toString()}
                          >
                            {ville.ville}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) => setVilleIdArr(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Où arrivez-vous ?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Villes</SelectLabel>
                        {villes?.map((ville) => (
                          <SelectItem
                            key={ville.id}
                            value={ville.id.toString()}
                          >
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
                  <Button onClick={creerTrajet}>Créer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="flex flex-col">
              {trajetsConducteur?.map((trajet) => (
                <Trajet key={trajet?.id} trajet={trajet} createMode={true} refetchTrajetsConducteur={refetchTrajetsConducteur} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="view">
          <div className="flex flex-col">
            {trajetsPassager?.map((trajet) => (
              <Trajet key={trajet?.id} trajet={trajet} createMode={false} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default MesTrajets;
