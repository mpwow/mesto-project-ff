// Запросы на бэк

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
    headers: {
        authorization: 'd2f61755-899c-4723-86e5-0729969e7c0f',
        'Content-Type': 'application/json'
    }
}


// Отдельная функция для проверки ответа бэка
function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res=> checkResponse(res));
}

function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res=> checkResponse(res));
}

export function getUserAndCards() {
    return Promise.all([getUser(), getCards()])
        .then(([user, cards]) => {
            // Возвращаем объект с данными пользователя и карточек
            return { user, cards };
        });
}

export function updateUserData(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(res=> checkResponse(res));
}

export function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res=> checkResponse(res));
}

export function deleteMyCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(res=> checkResponse(res));
}

export function likeUserCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    }).then(res=> checkResponse(res));
}

export function unLikeUserCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(res=> checkResponse(res));
}

export function updateUserAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    }).then(res=> checkResponse(res));
}