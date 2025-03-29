import { toggleLike, deleteCard } from "./api";

export function createCard(cardData, userId) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardLikeCount = cardElement.querySelector(".card__like-count");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeCount.textContent = cardData.likes.length;

    updateDeleteButtonVisibility(cardDeleteButton, cardData.owner._id, userId);

    cardLikeButton.addEventListener("click", () => handleLikeToggle(cardLikeButton, cardLikeCount, cardData._id, cardData.likes, userId))
    cardDeleteButton.addEventListener("click", () => handleDeleteCard(cardElement, cardData._id));

    return cardElement;
}

export function getIsLiked(likes, userId) {
    return likes.some(like => like._id === userId);
}

export function handleLikeToggle(cardLikeButton, cardLikeCount, cardId, likes, userId) {
    const isLiked = cardLikeButton.classList.contains("card__like-button_is-active");

    toggleLike(cardId, isLiked)
        .then(updatedCard => {
            cardLikeCount.textContent = updatedCard.likes.length;
            cardLikeButton.classList.toggle("card__like-button_is-active", getIsLiked(updatedCard.likes, userId));
        })
        .catch(err => console.log(err));
}

export function handleDeleteCard(cardElement, cardId) {
    deleteCard(cardId)
        .then(() => cardElement.remove())
        .catch(err => console.log(err));
}

function updateDeleteButtonVisibility(deleteButton, ownerId, userId) {
    if (ownerId !== userId) {
        deleteButton.style.display = "none";
    }
}