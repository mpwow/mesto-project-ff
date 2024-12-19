
// Функция создания карточки
export const createCard = function (card, cardForClone, delFunc, likeCard, openCard, cardPopUp) {
    // Клонируем темплейт карточки
    const cardElementClone = cardForClone.cloneNode(true);

    // Получаем изображение карточки и устанавливаем параметры
    const cardElementCloneImage = cardElementClone.querySelector(".card__image");
    cardElementCloneImage.src = card.link;
    cardElementCloneImage.alt = `Изображение города ${card.name}`;

    // Получаем заголовок карточки и устанавливаем текст
    const cardElementCloneTitle = cardElementClone.querySelector(".card__title");
    cardElementCloneTitle.textContent = card.name;

    // Получаем кнопку удаления в карточке и устанавливаем коллбэк с удалением
    const cardElementCloneDeleteBtn = cardElementClone.querySelector(".card__delete-button");
    cardElementCloneDeleteBtn.addEventListener("click",()=> {
        delFunc(cardElementCloneDeleteBtn, '.card')
    })

    // Получаем кнопку лайка и устанавливаем событие для лайка
    const cardElementLikeBtn = cardElementClone.querySelector(".card__like-button");
    cardElementLikeBtn.addEventListener("click",()=> {
        likeCard(cardElementLikeBtn, 'card__like-button_is-active')
    })

    // Добавляем событие на открытие карточки
    const cardElementImg = cardElementClone.querySelector(".card__image");
    cardElementImg.addEventListener("click",()=> {
        openCard(cardPopUp, card)
    })

    return cardElementClone;
}

// Функция удаления карточки
export function deleteCard(deleteButton, selectorToDelete) {
    deleteButton.closest(selectorToDelete).remove()
}

// Функция поставить лайк
export function likeCard(element, classForLike) {
    if (!element.classList.contains(classForLike)) {
        element.classList.add(classForLike)
    } else {
        element.classList.remove(classForLike)
    }
}