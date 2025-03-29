const cohortId = "apf-cohort-202";
const token = "0692ec8f-c9b7-40d9-a587-f2039b49962a";

const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: token,
        "Content-Type": "application/json"
    }
};

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`ошибка ${res.status}`);
};

const fetchData = (url, options = {}) => {
    return fetch(url, { headers: config.headers, ...options })
            .then(checkResponse);
};

export const getInitialCards = () => fetchData(`${config.baseUrl}/cards`);

export const getProfileInfo = () => fetchData(`${config.baseUrl}/users/me`);

export const changeProfileInfo = (profileInfo) => {
    return fetchData(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        body: JSON.stringify(profileInfo),
    });
};

export const changeProfileImage = (profileImage) => {
    return fetchData(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        body: JSON.stringify(profileImage),
    });
};

export const addCard = (cardInfo) => {
    return fetchData(`${config.baseUrl}/cards`, {
        method: "POST",
        body: JSON.stringify(cardInfo),
    });
};

export const deleteCard = (cardId) => {
    return fetchData(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
    });
};

export const toggleLike = (cardId, isLiked) => {
    return fetchData(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: isLiked ? "DELETE" : "PUT",
    });
};