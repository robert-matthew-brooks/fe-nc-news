import axios from 'axios';

const api = axios.create({
    baseURL: 'https://be-nc-news-nvms.onrender.com/api'
});

export async function fetchArticles(params) {
    const response = await api.get('/articles', { params });
    return response.data;
}

export async function fetchArticle(article_id) {
    const response = await api.get(`/articles/${article_id}`);
    return response.data;
}

export async function fetchComments(article_id, params) {
    const response = await api.get(`/articles/${article_id}/comments`, { params });
    return response.data;
}

export async function fetchUser(username) {
    const response = await api.get(`/users/${username}`);
    return response.data;
}

export async function patchVotes(url, inc_votes) {
    const response = await api.patch(url, { inc_votes });
    return response.data;
}