import { Map, List } from "lucide-react";

interface Props {
  view: "map" | "list";
  onToggle: () => void;
}

export const ViewToggle: React.FC<Props> = ({ view, onToggle }) => {
  return (
    <button onClick={onToggle} className="bg-gray-800 text-white p-2 rounded">
      {view === "map" ? <List size={20} /> : <Map size={20} />}
    </button>
  );
};
