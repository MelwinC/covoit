import Trajet from "./components/Trajet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function App() {
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
        </div>
        <Button className="w-full md:w-auto">Rechercher</Button>
      </div>

      <div className="flex flex-col">
        <Trajet createMode={false} />
        <Trajet createMode={false} />
        <Trajet createMode={false} />
        <Trajet createMode={false} />
        <Trajet createMode={false} />
        <Trajet createMode={false} />
        <Trajet createMode={false} />
        <Trajet createMode={false} />
      </div>
    </main>
  );
}

export default App;
