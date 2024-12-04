import Trajet from "./components/Trajet";
import { Button } from "@/components/ui/button";
import useAuth from "./hooks/use-auth";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getVilles } from "./services/ville";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./components/ui/calendar";
import { cn } from "./lib/utils";
import { getTrajets } from "./services/trajet";

function App() {
  useAuth();

  const {
    data: villes,
    isLoading: isLoadingVilles,
    error: errorVilles,
  } = useQuery({
    queryKey: ["villes"],
    queryFn: getVilles,
  });

  const {
    data: trajets,
    isLoading: isLoadingTrajets,
    error: errorTrajets,
  } = useQuery({
    queryKey: ["trajets"],
    queryFn: getTrajets,
  });

  const [date, setDate] = useState<Date>();
  const [villeIdDep, setVilleIdDep] = useState<number>(0);
  const [villeIdArr, setVilleIdArr] = useState<number>(0);
  const [filteredTrajets, setFilteredTrajets] = useState(trajets || []);

  const handleSearch = (): void => {
    if (!trajets) return;
  
    const filtered = trajets.filter((trajet) => {
      const [trajetDate] = trajet.dateT.split("T");
    
      const matchVilleDep = villeIdDep ? trajet.idVille1 === villeIdDep : true;
      const matchVilleArr = villeIdArr ? trajet.idVille2 === villeIdArr : true;
  
      const matchDate = date ? trajetDate === format(date, "yyyy-MM-dd") : true;
  
      return matchVilleDep && matchVilleArr && matchDate;
    });
  
    setFilteredTrajets(filtered);
  };

  useEffect(() => {
    if (trajets) {
      setFilteredTrajets(trajets);
    }
  }, [trajets]);

  if (isLoadingVilles || isLoadingTrajets) return <div>Loading...</div>;
  if (errorVilles || errorTrajets) return <div>Error fetching villes or trajets</div>;

  return (
    <main className="max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-bold text-center mt-10">
        AlloCovoit - Voyagez ensemble
      </h1>
      <p className="text-lg text-center mt-4 text-gray-600">
        Trouvez des covoiturages près de chez vous et voyagez de manière
        économique et écologique
      </p>

      <div className="flex flex-col md:flex-row items-center gap-2 my-10 bg-gray-200 w-full sm:w-2/3 mx-auto md:w-full p-4 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
          <Input
            type="time"
            id="heure"
            name="heure"
            className="w-auto"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTime(e.target.value)
            }
          />
        </div>
        <Button className="w-full md:w-auto" onClick={handleSearch}>
          Rechercher
        </Button>
      </div>

      <div className="flex flex-col">
        {filteredTrajets?.map(trajet => <Trajet key={trajet?.id} trajet={trajet} createMode={false} />)}
      </div>
    </main>
  );
}

export default App;
