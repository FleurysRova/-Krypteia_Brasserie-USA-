import React from 'react';

function BreweryDetails({ brewery, onClose }) {
    if (!brewery) return null; // Ne rend rien si aucune brasserie n'est sélectionnée

    return (
        <div style={{
            border: '2px solid #007bff',
            padding: '20px',
            marginBottom: '25px',
            borderRadius: '10px',
            backgroundColor: '#e9f7ff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h2 style={{ color: '#0056b3', marginTop: 0 }}>{brewery.name}</h2>
            <p><strong>Type :</strong> {brewery.brewery_type}</p>
            <p>
                <strong>Adresse :</strong>
                {brewery.street ? `${brewery.street}, ` : ''}
                {brewery.city}, {brewery.state_province} {brewery.postal_code}
            </p>
            {brewery.phone && <p><strong>Téléphone :</strong> {brewery.phone}</p>}
            {brewery.website_url && (
                <p>
                    <strong>Site web :</strong>{' '}
                    <a
                        href={brewery.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#007bff', textDecoration: 'none' }}
                    >
                        {brewery.website_url}
                    </a>
                </p>
            )}
            <button
                onClick={onClose}
                style={{
                    marginTop: '15px',
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s'
                }}
            >
                Fermer
            </button>
        </div>
    );
}

export default BreweryDetails;