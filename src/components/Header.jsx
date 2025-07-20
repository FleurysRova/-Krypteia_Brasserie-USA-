interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onToggle: () => void;
  view: "map" | "list";
}

export const Header: React.FC<Props> = ({ search, onSearchChange, onToggle, view }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Recherche par nom..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="p-2 border rounded text-black"
      />
      <ViewToggle view={view} onToggle={onToggle} />
    </div>
  );
};
