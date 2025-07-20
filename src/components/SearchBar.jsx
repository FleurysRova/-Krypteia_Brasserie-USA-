import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        // Ajoutez une classe au div parent de la barre de recherche
        <div className="search-bar" style={{ marginBottom: '0' }}> {/* Supprime la marge bottom si elle est là */}
            <input
                type="text"
                placeholder="Rechercher par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // Les styles inline ici peuvent être remplacés par des styles CSS si vous le souhaitez
                // Pour cet exemple, les styles sont principalement gérés par HomePage.css via .search-bar input
                style={{
                    padding: '10px 15px',
                    width: 'calc(100% - 0px)', // Ajustez ou supprimez si le CSS prend le relais
                    maxWidth: 'unset', // Supprime le max-width si géré par le parent
                    border: '1px solid #ddd',
                    borderRadius: '25px',
                    fontSize: '16px',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                }}
            />
        </div>
    );
}

export default SearchBar;