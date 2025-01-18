// Функция создания карточки
export const createCard = function (userId, cardOwnerId, cardId, cardLink, cardName, cardLikes, cardForClone, deleteHandler, likeHandler, openCard) {
    // Клонируем темплейт карточки
    const cardElementClone = cardForClone.cloneNode(true);

    // Получаем изображение карточки и устанавливаем параметры
    const cardElementCloneImage = cardElementClone.querySelector(".card__image");
    cardElementCloneImage.src = cardLink;
    cardElementCloneImage.alt = `Изображение города ${cardName}`;

    // Получаем заголовок карточки и устанавливаем текст
    const cardElementCloneTitle = cardElementClone.querySelector(".card__title");
    cardElementCloneTitle.textContent = cardName;

    // Кнопка удаления отображается только для карточек юзера
    const cardElementCloneDeleteBtn = cardElementClone.querySelector(".card__delete-button");
    if (userId !== cardOwnerId) {
        cardElementCloneDeleteBtn.remove();
    } else {
        cardElementCloneDeleteBtn.addEventListener("click", () => {
            deleteHandler(cardId, cardElementClone);
        })
    }

    // Получаем каунтер с лайками и записываем количество лайков в него
    // Также проверяем те лайки, которые уже поставили и ставим соответствующий класс
    // Получаем кнопку лайка и устанавливаем событие для лайка
    const cardElementLikeBtn = cardElementClone.querySelector(".card__like-button");
    const cardElementLikeCounter = cardElementClone.querySelector(".card__like-counter");
    cardElementLikeCounter.textContent = cardLikes.length;
    cardLikes.forEach((like) => {
        if (userId === like._id) {
            cardElementLikeBtn.classList.add('card__like-button_is-active');
        }
    })
    cardElementLikeBtn.addEventListener("click",()=> {
        likeHandler(cardElementLikeCounter, cardElementLikeBtn, cardId);
    })

    // Добавляем событие на открытие карточки
    const cardElementImg = cardElementClone.querySelector(".card__image");
    cardElementImg.addEventListener("click",()=> {
        openCard(cardLink, cardName);
    })

    return cardElementClone;
}

// Функция удаления карточки
export function deleteCard(card) {
    card.remove();
}

// Функция проверки проставлен ли лайк
export function isLiked(button) {
    return button.classList.contains('card__like-button_is-active')
}
// Функция поставить/убрать лайк
export function likeCard(counter, button, likes) {
    counter.textContent = likes.length;
    button.classList.toggle('card__like-button_is-active');
}