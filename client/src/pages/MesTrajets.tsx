import Trajet from "@/components/Trajet";
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
import { Button } from "@/components/ui/button";
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

function MesTrajets() {
  const [date, setDate] = useState<Date>();

  return (
    <main className="max-w-4xl mx-auto px-6">
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
            Créer un trajet
          </TabsTrigger>
          <TabsTrigger value="view" className="w-full">
            Mes trajets
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <div className="mt-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Créer un trajet</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Création du trajet</DialogTitle>
                  <DialogDescription>
                    Veuillez remplir tous les champs pour créer votre trajet
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <Input
                    id="partir"
                    placeholder="D'où partez-vous ?"
                    className="col-span-3"
                  />
                  <Input
                    id="arriver"
                    placeholder="Où arrivez-vous ?"
                    className="col-span-3"
                  />
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
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
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
                  <Input id="heure" placeholder="À ?" className="col-span-3" />
                </div>
                <DialogFooter>
                  <Button type="submit">Créer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="flex flex-col">
              <Trajet createMode={true} />
              <Trajet createMode={true} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="view">
          <div className="flex flex-col">
            <Trajet createMode={false} />
            <Trajet createMode={false} />
            <Trajet createMode={false} />
            <Trajet createMode={false} />
            <Trajet createMode={false} />
            <Trajet createMode={false} />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default MesTrajets;
