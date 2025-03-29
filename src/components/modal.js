export function openModal (popup) {
    const openedPopup = document.querySelector('.popup_is-opened')
    if (openedPopup) closeModal(openedPopup)

    popup.classList.add('popup_is-opened')

    const closeButton = popup.querySelector('.popup__close')
    closeButton.addEventListener('click', () => closeModal(popup))

    popup.addEventListener('mouseover', handleOverlayHover)
    popup.addEventListener('mouseout', handleOverlayLeave)
    popup.addEventListener('click', closeModalByOverlay)
    document.addEventListener('keydown', closeModalByEsc)
}

export function closeModal (popup) {
    if (!popup) return

    popup.classList.remove('popup_is-opened')

    const closeButton = popup.querySelector('.popup__close')
    closeButton.removeEventListener('click', () => closeModal(popup))

    popup.removeEventListener('mouseover', handleOverlayHover)
    popup.removeEventListener('mouseout', handleOverlayLeave)
    popup.removeEventListener('click', closeModalByOverlay)
    document.removeEventListener('keydown', closeModalByEsc)
}

const closeModalByEsc = evt => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened')
        if (openedPopup) closeModal(openedPopup)
    }
}

const closeModalByOverlay = evt => {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget)
    }
}

const handleOverlayHover = evt => {
    if (evt.target === evt.currentTarget) {
        evt.target.style.cursor = 'pointer'
    }
}

const handleOverlayLeave = evt => {
    if (evt.target === evt.currentTarget) {
        evt.target.style.cursor = ''
    }
}