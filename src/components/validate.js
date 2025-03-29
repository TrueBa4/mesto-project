function showValidationError(form, input, errorSettings) {
    const errorElement = form.querySelector(`.${input.name}-error`);
    input.classList.add(errorSettings.inputErrorClass);
    errorElement.classList.add(errorSettings.errorClass);
    errorElement.textContent = input.validationMessage;
}

function hideValidationError(form, input, errorSettings) {
    const errorElement = form.querySelector(`.${input.name}-error`);
    input.classList.remove(errorSettings.inputErrorClass);
    errorElement.classList.remove(errorSettings.errorClass);
    errorElement.textContent = '';
}

function checkFieldValidity(form, input, settings) {
    input.validity.valid ? hideValidationError(form, input, settings) : showValidationError(form, input, settings);
}

function hasInvalidFields(inputs) {
    return inputs.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function setSubmitButtonState(inputs, button, inactiveClass) {
    hasInvalidFields(inputs) ? button.classList.add(inactiveClass) : button.classList.remove(inactiveClass);
}

function setupFormValidation(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    function inputHandler() {
        checkFieldValidity(form, this, settings);
        setSubmitButtonState(inputs, button, settings.inactiveButtonClass);
    }
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', inputHandler);
    })
}

export function clearFormValidation(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    inputs.forEach((input) => {
        hideValidationError(form, input, settings);
    })
    setSubmitButtonState(inputs, button, settings.inactiveButtonClass);
}

export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach((form) => {
        setupFormValidation(form, settings);
    });
}

export function checkValidation(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);

    inputs.forEach((input) => {
        checkFieldValidity(form, input, settings);
    })
    setSubmitButtonState(inputs, button, settings.inactiveButtonClass);
}