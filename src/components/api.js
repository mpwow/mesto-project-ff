// Запросы на бэк

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
    headers: {
        authorization: 'd2f61755-899c-4723-86e5-0729969e7c0f',
        'Content-Type': 'application/json'
    }
}

function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

export function getUserAndCards() {
    return Promise.all([getUser(), getCards()])
        .then(([user, cards]) => {
            // Возвращаем объект с данными пользователя и карточек
            return { user, cards };
        })
        .catch((err) => {
            console.log(err);
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
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
            console.log(err);
        });
}

export function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
        console.log(err);
    });
}

export function deleteMyCard(card) {
    return fetch(`${config.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
        console.log(err);
    });
}

export function likeUserCard(card) {
    return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: config.headers
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
        console.log(err);
    });
}

export function unLikeUserCard(card) {
    return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
        console.log(err);
    });
}

export function updateUserAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).catch((err) => {
        console.log(err);
    });
}