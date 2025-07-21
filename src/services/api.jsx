import axios from 'axios';

const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';
const ITEMS_PER_PAGE = 20; // Gardons cette constante ici car elle est liée directement à l'API

/**
 * Récupère une liste de brasseries depuis l'API.
 * @param {number} page - Le numéro de la page à récupérer.
 * @param {string} query - Le terme de recherche pour filtrer par nom.
 * @returns {Promise<Array>} Une promesse qui résout en un tableau de brasseries.
 */
export const fetchBreweries = async (page, query) => {
    try {
        const params = {
            page: page,
            per_page: ITEMS_PER_PAGE,
        };
        if (query) {
            params.by_name = query;
        }

        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des brasseries depuis l'API:", error);
        throw error; // Propager l'erreur pour que le composant appelant puisse la gérer
    }
};

export const hasMoreData = (currentData) => {
    return currentData.length === ITEMS_PER_PAGE;
};