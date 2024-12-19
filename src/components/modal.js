export function closeModal (popUp) {
    popUp.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEsc);
    document.removeEventListener('click', closeModalByClickOutside);
}

export function openModal (popUp) {
    popUp.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnEsc);
    document.addEventListener('click', closeModalByClickOutside);
}

export function closeModalOnEsc (evt) {
    if (evt.key === "Escape") {
        closeModal(document.querySelector(".popup_is-opened"));
    }
}

export function closeModalByClickOutside (evt) {
    if (evt.target.classList.contains("popup_is-opened")) {
        closeModal(document.querySelector(".popup_is-opened"));
    }
}