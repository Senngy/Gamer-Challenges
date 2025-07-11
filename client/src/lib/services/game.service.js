// game.service.js 
import api from '../api.js';

export async function searchGames(query) {
    console.log('SERVICE searchGames: query:', query);
    try {
        const response = await api(`/games/search?query=${encodeURIComponent(query)}`, "GET");
        console.log('game SERVICE response:', response)
       
        // If api returns a Response object, keep the next line; otherwise, use response directly
        const data = response
        console.log(' SERVICE searchGames: Search results:', data);
        return data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
}