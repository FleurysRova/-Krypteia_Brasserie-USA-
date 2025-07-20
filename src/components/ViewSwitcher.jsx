import React from 'react';

function ViewSwitcher({ viewMode, setViewMode }) {
    return (
        <div style={{ marginBottom: '25px', textAlign: 'center' }}>
            <button
                onClick={() => setViewMode('map')}
                style={{
                    marginRight: '10px',
                    padding: '10px 20px',
                    border: '1px solid #007bff',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    backgroundColor: viewMode === 'map' ? '#007bff' : 'white',
                    color: viewMode === 'map' ? 'white' : '#007bff',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s, color 0.3s'
                }}
            >
                Vue Carte
            </button>
            <button
                onClick={() => setViewMode('list')}
                style={{
                    padding: '10px 20px',
                    border: '1px solid #007bff',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    backgroundColor: viewMode === 'list' ? '#007bff' : 'white',
                    color: viewMode === 'list' ? 'white' : '#007bff',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s, color 0.3s'
                }}
            >
                Vue Liste
            </button>
        </div>
    );
}

export default ViewSwitcher;