import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <input
                type="text"
                placeholder="Rechercher par nom de brasserie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: '10px 15px',
                    width: 'calc(100% - 40px)',
                    maxWidth: '500px',
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