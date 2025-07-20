import { Brewery } from "../types/Brewery";

interface Props {
  breweries: Brewery[];
  onSelect: (brewery: Brewery) => void;
}

export const ListView: React.FC<Props> = ({ breweries, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {breweries.map(b => (
        <div
          key={b.id}
          onClick={() => onSelect(b)}
          className="p-4 bg-white text-black rounded shadow cursor-pointer hover:bg-gray-100 transition"
        >
          <h3 className="text-lg font-semibold">{b.name}</h3>
          <p>{b.city}, {b.state}</p>
          <p>{b.brewery_type}</p>
        </div>
      ))}
    </div>
  );
};
