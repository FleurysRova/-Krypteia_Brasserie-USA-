// src/layouts/AppFooter.js

import React from 'react';
import '../pages/HomePage.css'; // <--- ASSURE-TOI QUE CETTE LIGNE EST PRÉSENTE !

function AppFooter() {
    return (
        <footer className="homepage-footer">
            <p>&copy; {new Date().getFullYear()} Open Brewery Explorer. Test krypteia-TECHNOLOGIE.</p>
            <p>By Fleurys NOMENJANAHARY.</p>
        </footer>
    );
}

export default AppFooter;