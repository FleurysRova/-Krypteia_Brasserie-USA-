import React from 'react';

function PaginationControls({ currentPage, hasMore, loading, onPageChange }) {
    return (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                style={{
                    padding: '10px 20px',
                    margin: '0 10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    opacity: (currentPage === 1 || loading) ? 0.6 : 1,
                    transition: 'opacity 0.3s, background-color 0.3s'
                }}
            >
                Précédent
            </button>
            <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#333' }}>Page {currentPage}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasMore || loading}
                style={{
                    padding: '10px 20px',
                    margin: '0 10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    opacity: (!hasMore || loading) ? 0.6 : 1,
                    transition: 'opacity 0.3s, background-color 0.3s'
                }}
            >
                Suivant
            </button>
        </div>
    );
}

export default PaginationControls;