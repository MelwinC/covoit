import Trajet from "./components/Trajet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">
        AlloCovoit - Voyagez ensemble
      </h1>
      <p className="text-lg text-center mt-4 text-gray-600">
        Trouvez des covoiturages près de chez vous et voyagez de manière
        économique et écologique
      </p>

      <div className="flex items-center gap-2 my-10 bg-gray-200 p-4 rounded-lg">
        <Input
          type="text"
          placeholder="D'où partez-vous ?"
          id="depart"
          name="depart"
        />
        <Input
          type="text"
          placeholder="Où allez-vous ?"
          id="arrive"
          name="arrive"
        />
        <Input type="text" placeholder="Départ le" id="jour" name="jour" />
        <Input type="text" placeholder="À" id="heure" name="heure" />
        <Button>Rechercher</Button>
      </div>

      <div className="mt-16 flex flex-col">
        <Trajet />
        <Trajet />
        <Trajet />
        <Trajet />
        <Trajet />
        <Trajet />
      </div>
    </main>
  );
}

export default App;
