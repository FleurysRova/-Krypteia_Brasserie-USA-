// src/components/PaginationControls.js

import React from 'react';

function PaginationControls({ currentPage, hasMore, loading, onPageChange }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                style={{
                    padding: '8px 15px',
                    margin: '0 10px',
                    border: '1px solid #007bff',
                    borderRadius: '5px',
                    backgroundColor: currentPage === 1 || loading ? '#e0e0e0' : '#007bff',
                    color: currentPage === 1 || loading ? '#888' : 'white',
                    cursor: currentPage === 1 || loading ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s'
                }}
            >
                Précédent
            </button>
            <span style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#333' }}>
                Page {currentPage}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasMore || loading}
                style={{
                    padding: '8px 15px',
                    margin: '0 10px',
                    border: '1px solid #007bff',
                    borderRadius: '5px',
                    backgroundColor: !hasMore || loading ? '#e0e0e0' : '#007bff',
                    color: !hasMore || loading ? '#888' : 'white',
                    cursor: !hasMore || loading ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s'
                }}
            >
                Suivant
            </button>
        </div>
    );
}

export default PaginationControls;