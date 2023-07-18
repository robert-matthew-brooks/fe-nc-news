export async function apiRequest(endpoint, options) {
    try {
        const response = await fetch(`https://be-nc-news-nvms.onrender.com/api${endpoint}`, options);
        return await response.json();
    }
    
    catch(err) {
        throw new Error(err);
    }
}