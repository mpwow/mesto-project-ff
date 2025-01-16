import {deleteMyCard, likeUserCard, unLikeUserCard} from "./api"

// Функция создания карточки
export const createCard = function (userId, cardOwnerId, cardId, cardLink, cardName, cardLikes, cardForClone, delFunc, likeCard, openCard, cardPopUp) {
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
        // Получаем кнопку удаления в карточке и устанавливаем коллбэк с удалением
        cardElementCloneDeleteBtn.addEventListener("click",()=> {
            delFunc(cardElementClone);
            deleteMyCard(cardId);
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
        likeCard(cardElementLikeBtn, 'card__like-button_is-active', cardId, cardElementLikeCounter);
    })

    // Добавляем событие на открытие карточки
    const cardElementImg = cardElementClone.querySelector(".card__image");
    cardElementImg.addEventListener("click",()=> {
        openCard(cardPopUp, cardLink, cardName);
    })

    return cardElementClone;
}

// Функция удаления карточки
export function deleteCard(card) {
    card.remove();
}

// Функция поставить/убрать лайк
export function likeCard(element, classForLike, cardId, likeCounter) {
    if (!element.classList.contains(classForLike)) {
        element.classList.add(classForLike)
        likeUserCard(cardId).then(res=>{
            likeCounter.textContent = res.likes.length;
        }).catch((err) => {
            console.log(err);
        })

    } else {
        element.classList.remove(classForLike);
        unLikeUserCard(cardId).then(res=>{
            likeCounter.textContent = res.likes.length;
        }).catch((err) => {
            console.log(err);
        })
    }
}