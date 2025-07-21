// src/components/PaginationControls.js

import React from 'react';
// Importez un fichier CSS si vous en avez un pour la pagination
// import './PaginationControls.css';

function PaginationControls({ currentPage, hasMore, loading, onPageChange }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '15px' }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                style={{
                    padding: '10px 20px',
                    backgroundColor: currentPage === 1 || loading ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: currentPage === 1 || loading ? 'not-allowed' : 'pointer',
                    fontSize: '1em',
                    transition: 'background-color 0.3s ease'
                }}
            >
                Précédent
            </button>
            <span style={{
                alignSelf: 'center',
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: '#333'
            }}>
                Page {currentPage}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasMore || loading}
                style={{
                    padding: '10px 20px',
                    backgroundColor: !hasMore || loading ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: !hasMore || loading ? 'not-allowed' : 'pointer',
                    fontSize: '1em',
                    transition: 'background-color 0.3s ease'
                }}
            >
                Suivant
            </button>
        </div>
    );
}

export default PaginationControls;