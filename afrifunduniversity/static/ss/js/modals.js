function closeModal(modalElement) {
  if (!modalElement) return;
  modalElement.close();
}

function closeOnClickOutSide (e) {
  const modalDimensions = e.target.getBoundingClientRect();
  if (
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    if (!!e.target.close) {
      closeModal(e.target);
      document.querySelector("body").classList.remove(LOCK_CLASS);
    }
  }
}

function openModal(modalElement) {
  if (!modalElement) return;
  modalElement.showModal();
  document.querySelector("body").classList.add(LOCK_CLASS);
  modalElement.addEventListener("click", closeOnClickOutSide);
}

const bindOpenModalEvents = () => {
  const openModalElements = document.querySelectorAll('[data-open-modal]');
  const closeModalElements = document.querySelectorAll('[data-close-modal]');

  openModalElements.forEach((item) => {
    item.addEventListener('click', function () {
      const targetModalName = this.dataset.openModal;
      const targetModal = document.querySelector(`[data-modal="${targetModalName}"]`);
      openModal(targetModal)
    });
  });
  closeModalElements.forEach((item) => {
    item.addEventListener('click', function () {
      const targetModalName = this.dataset.closeModal;
      const targetModal = document.querySelector(`[data-modal="${targetModalName}"]`);
      closeModal(targetModal);
      document.querySelector("body").classList.remove(LOCK_CLASS);
    });
  });
}

bindOpenModalEvents();
