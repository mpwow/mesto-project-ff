// Функция скрытия ошибок валидации у поля
function hideError (formElement, inputElement, errorClass, inputErrorClass) {
    // Ищем спан для скрытия текста с ошибкой под валидируемым полем
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    // Текст ошибки перестал отображаться на странице
    errorElement.classList.remove(errorClass);
    // Убрали у инпута класс с ошибкой - показывается красная линия под инпутом
    inputElement.classList.remove(inputErrorClass);
}

// Функция отображения ошибок валидации у поля
function showError (formElement, inputElement, errorMessage, errorClass, inputErrorClass) {
    // Ищем спан для отображения текста с ошибкой под валидируемым полем
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Проверка для того, чтобы понять какой текст ошибки показывать:
    inputElement.value.length === 0 ? errorElement.textContent = 'Вы пропустили это поле.':errorElement.textContent = errorMessage;
    // Текст ошибки стал отображаться на странице
    errorElement.classList.add(errorClass);
    // Добавить инпуту класс с ошибкой - показывается красная линия под инпутом
    inputElement.classList.add(inputErrorClass);
}

// Функции валидации полей в формах
export function enableValidation (
    {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
    }
) {


// Функция проверки валидности инпута - передается форма и поле инпута в ней
// и при каждом инпуте идет проверка (реализуется через события)

    function checkInputValidity (formElement, inputElement) {
        const customErrorMessage =  inputElement.dataset.errorMessage;
        if (inputElement.validity.patternMismatch) {
            showError(formElement, inputElement, customErrorMessage);
        } else if (!inputElement.validity.valid) {
            showError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
        } else {
            hideError(formElement, inputElement, errorClass, inputErrorClass);
        }
    }

// Для проверки, есть ли среди списка инпутов невалидные - отдельная функция
    function hasInvalidInput (inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        })
    }

    function toggleButtonState (inputList, buttonElement)  {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
        }
    }


// Функция для установки событий всем инпутам в форме

    function setEventListeners (formElement) {
        // Ищем всем инпуты в форме и создаем из них массив
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);

        // Обходим все элементы массива и устанавливаем коллбэк с валидацией
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                checkInputValidity(formElement, inputElement);
                toggleButtonState(inputList, buttonElement);
            })
        })
    }

    Array.from(document.querySelectorAll(formSelector)).forEach(form => {
        setEventListeners(form)
    })
}

export function clearValidation(formElement, validationConfig) {
    // Ищем кнопку в форме и делаем ее неактивной
    formElement.querySelector(validationConfig.submitButtonSelector).classList.add(validationConfig.inactiveButtonClass);
    // Получаем список инпутов в переданной форме
    const inputsList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    // Обходим список инпутов, по шаблону получаем селекторы спан-элемента с ошибкой и убираем текст в ней
    inputsList.forEach(inputElement => {
        hideError(formElement, inputElement, validationConfig.errorClass, validationConfig.inputErrorClass);
    })
}