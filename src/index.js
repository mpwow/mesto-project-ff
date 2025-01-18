import './pages/index.css'
import {createCard, deleteCard, likeCard, isLiked} from "./components/card";
import {openModal, closeModal} from "./components/modal"
import {enableValidation, clearValidation} from "./components/validation";
import {
    getUserAndCards,
    updateUserData,
    addNewCard,
    updateUserAvatar,
    deleteMyCard,
    likeUserCard,
    unLikeUserCard
} from "./components/api"

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// Элемент одной карточки внутри шаблона
const cardElement = cardTemplate.querySelector(".card");
// Элемент списка карточек
const cardList = document.querySelector(".places__list");

// Кнопка редактирования фото профиля
const editProfifeAvatarBtn = document.querySelector(".profile__edit-avatar-button");
// Поп-ап редактирования фото профиля
const editProfileAvatarPopup = document.querySelector(".popup_type_edit-avatar");
// Форма редактирования аватарки
const editProfileAvatarForm = document.forms["update-avatar"]
// Элемент с картинкой аватарки пользователя
const userAvatar = document.querySelector(".profile__image");

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
// Инпут с названием внутри попапа добавления карточки
const addCardPopupName = addCardPopup.querySelector(".popup__input_type_card-name");
// Инпут с ссылкой внутри попапа добавления карточки
const addCardPopupUrl = addCardPopup.querySelector(".popup__input_type_url");

// Попап по клику на карточку
const fullScreenCardPopUp = document.querySelector(".popup_type_image");
const fullScreenCardPopUpImage = document.querySelector('.popup__image');
const fullScreenCardPopUpCaption = document.querySelector('.popup__caption')

// Элемент с именем пользователя на странице
const profileTitle = document.querySelector('.profile__title');
// Элемент с описанием пользователя на странице
const profileDescription = document.querySelector('.profile__description');

// Массив с элементами закрытия форм на странице (крестики)
const popUpCloseBtns = document.querySelectorAll('.popup__close');

// Объект с данными для валидации
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
// Here comes API
// Объявляем переменную для хранения юзер айди
let userId;

// Функция перезапрашивает данные пользователя и карточки с бэка и добавляет их на страницу
function updateUserAndCardsOnPage() {
    getUserAndCards().then(result => {
        const { user, cards } = result;  // Деструктурируем объект
        // Сохраняем юзер айди
        userId = user._id;
        // подтягиваем карточки с бэка, предварительно убрав старые со страницы
        cardList.innerHTML = "";
        for (let i = 0; i < cards.length; i++) {
            cardList.append(createCard(
                user._id,
                cards[i].owner._id,
                cards[i]._id,
                cards[i].link,
                cards[i].name,
                cards[i].likes,
                cardElement,
                deleteHandler,
                handlerLikeCard,
                openCard
            ));
        }
        // подтягиваем данные пользователя с бэка
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        // при загрузке обновляем аватар с бэка
        userAvatar.style.backgroundImage = `url("${user.avatar}")`;
    }).catch((err) => {
        console.log(err);
    });
}
// Вызываем функцию получени данных при загрузке страницы
updateUserAndCardsOnPage()

// Форма редактирования данных пользователя
// Вешаем эвент на кнопку открытия формы редактирования
editProfifeBtn.addEventListener("click", () => {
    openModal(editProfilePopup);
    clearValidation(editProfilePopup, validationSettings);
    // Данные в форме будут предзаполнены
    editProfileForm.name.value = profileTitle.textContent;
    editProfileForm.description.value = profileDescription.textContent;
});

// Обработчик отправки формы редактирования
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    changeSaveButtonText(evt.target, 'Сохранение...', 'Сохранить');
    // отправляем данные на бэк, из ответа достаем новое имя и описание
    updateUserData(editProfileForm.name.value, editProfileForm.description.value).then(()=> {
        updateUserAndCardsOnPage();
        closeModal(editProfilePopup);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        changeSaveButtonText(evt.target, 'Сохранение...', 'Сохранить');
    });
}
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// Форма редактирования данных пользователя
// Вешаем эвент на кнопку открытия формы редактирования аватарки юзера
editProfifeAvatarBtn.addEventListener("click", () => {
    openModal(editProfileAvatarPopup);
    clearValidation(editProfileAvatarPopup, validationSettings);
});

// Обработчик отправки новой аватарки юзера
function handleEditProfileAvatarFormSubmit(evt) {
    evt.preventDefault();
    changeSaveButtonText(evt.target, 'Сохранение...', 'Сохранить');
    // отправляем данные на бэк, из ответа достаем новое имя и описание
    updateUserAvatar(editProfileAvatarForm.avatar.value).then((res)=> {
        userAvatar.style.backgroundImage = `url("${res.avatar}")`;
        clearValidation(editProfileAvatarPopup, validationSettings);
        editProfileAvatarForm.reset();
    }).then(()=> {
        closeModal(editProfileAvatarPopup);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        changeSaveButtonText(evt.target, 'Сохранение...', 'Сохранить');
    });
}
editProfileAvatarForm.addEventListener('submit', handleEditProfileAvatarFormSubmit);

// Форма добавления новой карточки
// Эвент на кнопку открытия добавления карточки
addCardBtn.addEventListener("click", () => {
    openModal(addCardPopup);
    clearValidation(addCardPopup, validationSettings);
})
// Обработчик добавления новой карточки на страницу
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard =     {
        name: addCardPopupName.value,
        link: addCardPopupUrl.value,
    };
    changeSaveButtonText(evt.target, 'Сохранение...', 'Сохранить');
    addNewCard(newCard.name, newCard.link).then((res)=> {
        cardList.prepend(createCard(
            userId,
            res.owner._id,
            res._id,
            res.link,
            res.name,
            res.likes,
            cardElement,
            deleteHandler,
            handlerLikeCard,
            openCard
        ));
        clearValidation(addCardPopup, validationSettings);
        addNewPlaceForm.reset();
    }).then(()=> {
        closeModal(addCardPopup);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        changeSaveButtonText(evt.target, 'Сохранение...', 'Сохранить');
    });

}
addCardPopup.addEventListener('submit', handleAddCardFormSubmit);

// Вешаем обработчики закрытия поп-апов по клику на крестик
popUpCloseBtns.forEach(popUpCloseBtn => {
    popUpCloseBtn.addEventListener('click', (evt)=> {
        closeModal(evt.target.closest('.popup'));
    });
});

// Функция открытия карточки по клику
function openCard(elementLink, elementName) {
    fullScreenCardPopUpImage.src = elementLink;
    fullScreenCardPopUpImage.alt = elementName;
    fullScreenCardPopUpCaption.textContent = elementName;
    openModal(fullScreenCardPopUp)
}

// Обработчик удаления карточки
function deleteHandler(cardId, card) {
    deleteMyCard(cardId).then(()=> {
        deleteCard(card);
    }).catch((err) => {
        console.log(err);
    })
}

// Обработчик простановки/убирания лайка с карточки
function handlerLikeCard(counter, button, cardId)  {
    (isLiked(button) ? unLikeUserCard(cardId) : likeUserCard(cardId))
        .then(res => likeCard(counter, button, res.likes))
            .catch((err) => {
                console.log(err);
            })
}

// Функция меняет текст в кнопке "Сохранить"
function changeSaveButtonText(form, newTextButton, defaultTextButton) {
    const buttonInForm = form.querySelector('.popup__button');
    if (buttonInForm.textContent === defaultTextButton) {
        buttonInForm.textContent = newTextButton;
    } else {
        buttonInForm.textContent = defaultTextButton;
    }
}

// Включаем валидацию на все формы и все инпуты в них
enableValidation(validationSettings);

