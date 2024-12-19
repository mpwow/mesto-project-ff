import './pages/index.css'
import {initialCards} from "./components/cards";
import {createCard, deleteCard, likeCard} from "./components/card";
import {openModal, closeModal, closeModalOnEsc, closeModalByClickOutside} from "./components/modal"


// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы для карточек
const cardList = document.querySelector(".places__list");
const cardElement = cardTemplate.querySelector(".card");

// Кнопка редактирования профиля
const editProfifeBtn = document.querySelector(".profile__edit-button");
// Поп-ап редактирования
const editProfilePopup = document.querySelector(".popup_type_edit");
// Форма редактирования профиля
const editProfileForm = document.forms["edit-profile"]

// Кнопки добавления карточки
const addCardBtn = document.querySelector(".profile__add-button");
// Поп-ап добавления карточки
const addCardPopup = document.querySelector(".popup_type_new-card");
// Форма добавления новой карточки
const addNewPlaceForm = document.forms["new-place"]

// Поп-ап по клику на карточку
const fullScreenCardPopUp = document.querySelector(".popup_type_image");

// Получаем имя и описание на странице и записываем их значения в
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
editProfileForm.name.value = profileTitle.textContent;
editProfileForm.description.value = profileDescription.textContent;

// Эвент на кнопку открытия формы редактирования
editProfifeBtn.addEventListener("click", () => {
    openModal(editProfilePopup);
});
// Обработчик «отправки» формы редактирования
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = editProfileForm.name.value;
    profileDescription.textContent = editProfileForm.description.value;
    closeModal(editProfilePopup);
}
editProfileForm.addEventListener('submit', handleFormSubmit);


// Эвент на кнопку открытия добавления карточки
addCardBtn.addEventListener("click", () => {
    openModal(addCardPopup);
})
// Обработчик добавления новой карточки на страницу
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard =     {
        name: addCardPopup.querySelector(".popup__input_type_card-name").value,
        link: addCardPopup.querySelector(".popup__input_type_url").value,
    };
    cardList.prepend(createCard(newCard, cardElement, deleteCard, likeCard, openCard, fullScreenCardPopUp));
    addNewPlaceForm.reset();
    closeModal(addCardPopup);
}
addCardPopup.addEventListener('submit', handleAddCardFormSubmit);

// Обработчик закрытия поп-апов по клику на крестик
document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        // Закрываем поп-ап, который содержит кликнутую кнопку
        closeModal(evt.target.closest('.popup'));
    }
})


// Функция открытия карточки по клику
function openCard(popUp, element) {
    popUp.querySelector('.popup__image').src = element.link;
    popUp.querySelector('.popup__caption').textContent = element.name;
    openModal(popUp)
}

// Вывод карточек на странице
for (let i = 0; i < initialCards.length; i++) {
    cardList.append(createCard(initialCards[i],cardElement, deleteCard, likeCard, openCard, fullScreenCardPopUp));
}