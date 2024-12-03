import { Button } from "@/components/ui/button";

const Trajet = () => {
  return (
    <div className="flex items-center justify-between py-5 border-b-2">
      <div className="flex items-center gap-20">
        <p>John Doe</p>
        <p>3 passagers</p>
        <p>Rennes - Paris</p>
        <p>20/10/2024</p>
        <p>12:30</p>
      </div>
      <Button>Réserver</Button>
    </div>
  );
};

export default Trajet;
