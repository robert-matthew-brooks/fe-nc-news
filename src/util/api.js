export async function apiRequest(endpoint, options = {}) {
    options.headers = {
        'Content-type': 'application/json; charset=UTF-8',
    };

    const response = await fetch(`https://be-nc-news-nvms.onrender.com/api${endpoint}`, options);
    
    if ([400, 500].includes(response.status)) {
        throw new Error();
    }

    return await response.json();
}