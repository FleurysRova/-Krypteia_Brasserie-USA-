import React from 'react';

function BreweryList({ breweries, setSelectedBrewery, loading }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            justifyContent: 'center'
        }}>
            {breweries.length > 0 ? (
                breweries.map(brewery => (
                    <div
                        key={brewery.id}
                        onClick={() => setSelectedBrewery(brewery)}
                        style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '10px',
                            padding: '20px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            backgroundColor: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.08)';
                        }}
                    >
                        <h3 style={{ color: '#0056b3', margin: '0 0 10px 0' }}>{brewery.name}</h3>
                        <p style={{ margin: '5px 0' }}>**Type:** {brewery.brewery_type}</p>
                        <p style={{ margin: '5px 0' }}>{brewery.city}, {brewery.state_province}</p>
                        {brewery.phone && <p style={{ margin: '5px 0' }}>**Téléphone:** {brewery.phone}</p>}
                    </div>
                ))
            ) : (
                !loading && <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#777' }}>Aucune brasserie trouvée pour votre recherche ou sur cette page.</p>
            )}
        </div>
    );
}

export default BreweryList;