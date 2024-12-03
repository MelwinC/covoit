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

type Props = {
  createMode: boolean;
};

const Trajet = ({ createMode }: Props) => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex items-center justify-between py-5 border-b-2">
      <div className="flex items-center gap-20">
        <p>John Doe</p>
        <p>3 passagers</p>
        <p>Rennes - Paris</p>
        <p>20/10/2024</p>
        <p>12:30</p>
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
          <Button variant="destructive">
            <Trash2 />
          </Button>
        </div>
      ) : (
        <Button>Réserver</Button>
      )}
    </div>
  );
};

export default Trajet;
