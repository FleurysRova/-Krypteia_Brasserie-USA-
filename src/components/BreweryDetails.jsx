// src/components/BreweryDetails.js

import React from 'react';

function BreweryDetails({ brewery, onClose }) {
    if (!brewery) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fond semi-transparent
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000, // S'assure que la modale est au-dessus de tout
            overflow: 'auto', // Permet le défilement de toute la modale si elle est très grande
        }}>
            <div style={{
                backgroundColor: '#ffffff', // Fond blanc pur
                padding: '30px',
                borderRadius: '12px', // Bords légèrement plus arrondis
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)', // Ombre plus prononcée
                maxWidth: '550px', // Légèrement plus large
                width: '90%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px', // Espacement légèrement augmenté entre les éléments
                fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif", // Police plus moderne
                color: '#333333' // Couleur de texte par défaut plus douce
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.8em', // Plus grande croix
                        cursor: 'pointer',
                        color: '#999999', // Couleur plus discrète
                        transition: 'color 0.2s ease',
                        lineHeight: '1'
                    }}
                    onMouseEnter={e => e.target.style.color = '#555555'}
                    onMouseLeave={e => e.target.style.color = '#999999'}
                    aria-label="Fermer les détails de la brasserie"
                >
                    &times;
                </button>

                {/* Titre de la brasserie */}
                <h2 style={{
                    color: '#0056b3',
                    marginBottom: '15px',
                    paddingBottom: '10px',
                    fontSize: '2em', // Titre plus grand
                    fontWeight: '600', // Plus gras
                    borderBottom: '2px solid #e0e0e0', // Ligne de séparation plus visible
                    textAlign: 'center' // Centrer le titre
                }}>
                    {brewery.name}
                </h2>

                {/* Détails de la brasserie */}
                <div style={detailSectionStyle}>
                    <p style={detailParagraphStyle}>
                        <strong>Type:</strong> <span style={{ textTransform: 'capitalize' }}>{brewery.brewery_type?.replace(/_/g, ' ') || 'Non spécifié'}</span>
                    </p>

                    {(brewery.street || brewery.city || brewery.state_province || brewery.state || brewery.postal_code || brewery.country) && (
                        <p style={detailParagraphStyle}>
                            <strong>Adresse:</strong>{' '}
                            {brewery.street ? `${brewery.street}, ` : ''}
                            {brewery.city ? `${brewery.city}, ` : ''}
                            {brewery.state_province || brewery.state ? `${brewery.state_province || brewery.state}, ` : ''}
                            {brewery.postal_code ? `${brewery.postal_code}, ` : ''}
                            {brewery.country || ''}
                            {!brewery.street && !brewery.city && !brewery.state_province && !brewery.state && !brewery.postal_code && !brewery.country && 'Non spécifiée'}
                        </p>
                    )}

                    {(brewery.latitude && brewery.longitude) && (
                        <p style={detailParagraphStyle}>
                            <strong>Latitude:</strong> {parseFloat(brewery.latitude).toFixed(4)}<br />
                            <strong>Longitude:</strong> {parseFloat(brewery.longitude).toFixed(4)}
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${brewery.latitude},${brewery.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={linkStyle}
                            >
                                (Voir sur Google Maps)
                            </a>
                        </p>
                    )}

                    {brewery.phone && (
                        <p style={detailParagraphStyle}>
                            <strong>Téléphone:</strong>{' '}
                            <a href={`tel:${brewery.phone}`} style={linkStyle}>
                                {formatPhoneNumber(brewery.phone)}
                            </a>
                        </p>
                    )}

                    {brewery.website_url && (
                        <p style={detailParagraphStyle}>
                            <strong>Site Web:</strong>{' '}
                            <a href={brewery.website_url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                                {brewery.website_url}
                            </a>
                        </p>
                    )}
                </div>

                {/* Dernière mise à jour */}
                {brewery.updated_at && (
                    <p style={{ margin: 0, fontSize: '0.85em', color: '#777777', textAlign: 'right', marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
                        Dernière mise à jour: {new Date(brewery.updated_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                )}
            </div>
        </div>
    );
}

// Styles réutilisables pour les sections de détails
const detailSectionStyle = {
    backgroundColor: '#f9f9f9', // Fond légèrement gris pour la section d'informations
    padding: '15px 20px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px' // Espacement entre les paragraphes dans cette section
};

// Styles réutilisables pour les paragraphes de détails
const detailParagraphStyle = {
    margin: '0',
    fontSize: '1em',
    lineHeight: '1.5',
    color: '#555555' // Texte des détails plus doux
};

// Styles réutilisables pour les liens
const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    marginLeft: '8px', // Espace après le label
    fontWeight: '500', // Légèrement plus gras
    transition: 'color 0.2s ease',
};

// Fonction utilitaire pour formater le numéro de téléphone
const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'Non spécifié';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Tentative de formatage pour les numéros à 10 chiffres (style nord-américain)
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    // Pour d'autres formats ou numéros internationaux, retournez le numéro tel quel
    return phoneNumber;
};

export default BreweryDetails;