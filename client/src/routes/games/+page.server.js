// +page.server.js
export async function load({ fetch }) {
    const res = await fetch('http://localhost:3000/games'); // URL de ton API Express
    if (!res.ok) {
        return { games: [] };
    }
    const games = await res.json();
    return { games };
}