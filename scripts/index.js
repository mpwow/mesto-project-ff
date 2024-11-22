// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardList = document.querySelector(".places__list");
const cardElement = cardTemplate.querySelector(".card");

// Функция создания карточки
const createCard = function (card, delFunc) {
    // Клонируем темплейт карточки
    const cardElementClone = cardElement.cloneNode(true);

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

    return cardElementClone;
}

// Функция удаления карточки
function deleteCard(deleteButton, selectorToDelete) {
    deleteButton.closest(selectorToDelete).remove()
}

// Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    cardList.append(createCard(initialCards[i], deleteCard));
}