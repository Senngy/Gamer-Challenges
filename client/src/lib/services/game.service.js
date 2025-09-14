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
        console.error('SERVICE Error fetching search results:', error);
        throw error;
    }
}

export async function getGameInfos(game_id) {
    try {
      //  console.log('game SERVICE game_id:', game_id)
        const game = await api(`/games/${game_id}`, "GET")
      //console.log('game SERVICE response:', game)
        return game;
    } catch(error) {
        console.error('SERVICE Error fetching getGameInfos:', error);
        throw error;
    }
}

export async function getRandomGames() {
   // console.log('SERVICE randomGames called')
    try {
        const randomGames = await api('/games/random', "GET")
       // console.log('SERVICE randomGames:', randomGames)
        return randomGames;
    } catch(error) {
        console.error('SERVICE Error fetching get random games:', error)
        throw error;
    }
}

export async function getTopGames() {
   // console.log('SERVICE topGames called')
    try {
        const topGames = await api('/games/top', "GET")
        //console.log('SERVICE topGames:', topGames)
        return topGames;
    } catch(error) {
        console.error('SERVICE Error fetching get games:', error)
        throw error;
    }
}