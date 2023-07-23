import axios from 'axios';

const api = axios.create({
    baseURL: 'https://be-nc-news-nvms.onrender.com/api'
});

export async function fetchTopics() {
    const response = await api.get('/topics');
    return response.data;
}

export async function fetchArticles(params) {
    const response = await api.get('/articles', { params });
    return response.data;
}

export async function fetchArticle(articleId) {
    const response = await api.get(`/articles/${articleId}`);
    return response.data;
}

export async function fetchComments(articleId, params) {
    const response = await api.get(`/articles/${articleId}/comments`, { params });
    return response.data;
}

export async function fetchUser(username) {
    const response = await api.get(`/users/${username}`);
    return response.data;
}

export async function patchVotes(url, incVotes) {
    const response = await api.patch(url, { inc_votes: incVotes });
    return response.data;
}

export async function postComment(articleId, username, body) {
    const response = await api.post(`/articles/${articleId}/comments`, { username, body });
    return response.data;
}

export async function deleteComment(commentId) {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
}