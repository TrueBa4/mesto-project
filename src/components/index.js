import '../pages/index.css'
import { createCard } from "./card.js";
import { addCard, getInitialCards, changeProfileImage, changeProfileInfo, getProfileInfo } from "./api.js";
import { enableValidation, clearFormValidation, checkValidation } from "./validate.js";
import { openModal, closeModal } from "./modal.js"

document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
});

const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

enableValidation(validationSettings);

const cardsContainer = document.querySelector('.places__list');

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileImagePopup = document.querySelector(".popup_type_profile-image");

const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

const profileForm = editProfilePopup.querySelector(".popup__form");
const profileSubmitButton = profileForm.querySelector(".popup__button");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(".popup__input_type_description");

const cardForm = newCardPopup.querySelector(".popup__form");
const cardSubmitButton = cardForm.querySelector(".popup__button");
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const profileImageForm = profileImagePopup.querySelector(".popup__form");
const profileImageSubmitButton = profileImageForm.querySelector(".popup__button");
const profileImageLinkInput = profileImageForm.querySelector(".popup__input_type_url");

let currentUserId;

Promise.all([getProfileInfo(), getInitialCards()])
    .then(([userData, cards]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        currentUserId = userData._id;

        cards.forEach((card) => {
            const newCard = createCard(card, currentUserId);
            cardsContainer.append(newCard);
        });
    })
    .catch(console.log);

cardAddButton.addEventListener("click", () => {
    cardNameInput.value = "";
    cardLinkInput.value = "";

    clearFormValidation(cardForm, validationSettings);
    openModal(newCardPopup);
});

cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    cardSubmitButton.classList.add(validationSettings.inactiveButtonClass);

    addCard({ name: cardNameInput.value, link: cardLinkInput.value })
        .then((card) => {
            cardsContainer.prepend(createCard(card, currentUserId));
            closeModal(newCardPopup);
        })
        .catch(console.log)
        .finally(() => {
            cardSubmitButton.classList.remove(validationSettings.inactiveButtonClass);
        });
});

cardsContainer.addEventListener("click", (evt) => {
    const target = evt.target;

    if (target.classList.contains("card__image")) {
        popupImage.src = target.src;
        popupCaption.textContent = target.alt;
        openModal(imagePopup);
    }
});

profileImage.addEventListener("click", () => {
    profileImageLinkInput.value = profileImage.style.backgroundImage.slice(5, -2);
    checkValidation(profileImageForm, validationSettings);
    openModal(profileImagePopup);
});

profileImageForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    changeProfileImage({ avatar: profileImageLinkInput.value })
        .then((data) => {
            profileImage.style.backgroundImage = `url(${data.avatar})`;
            closeModal(profileImagePopup);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            profileImageSubmitButton.textContent = "Сохранить";
        });
});

profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;

    checkValidation(profileForm, validationSettings);
    openModal(editProfilePopup);
});

profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    changeProfileInfo({ name: nameInput.value, about: descriptionInput.value })
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(editProfilePopup);
        })
        .catch(console.log)
        .finally(() => {
            profileSubmitButton.textContent = "Сохранить";
        });
});
