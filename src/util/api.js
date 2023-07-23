import axios from 'axios';

const api = axios.create({
    baseURL: 'https://be-nc-news-nvms.onrender.com/api'
});

export async function apiFetchTopics() {
    const response = await api.get('/topics');
    return response.data;
}

export async function apiFetchArticles(params) {
    const response = await api.get('/articles', { params });
    return response.data;
}

export async function apiFetchArticle(articleId) {
    const response = await api.get(`/articles/${articleId}`);
    return response.data;
}

export async function apiFetchComments(articleId, params) {
    const response = await api.get(`/articles/${articleId}/comments`, { params });
    return response.data;
}

export async function apiFetchUser(username) {
    const response = await api.get(`/users/${username}`);
    return response.data;
}

export async function apiPatchVotes(url, incVotes) {
    const response = await api.patch(url, { inc_votes: incVotes });
    return response.data;
}

export async function apiPostComment(articleId, username, body) {
    const response = await api.post(`/articles/${articleId}/comments`, { username, body });
    return response.data;
}

export async function apiDeleteComment(commentId) {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
}