let modalElement;
let openModelButton;
let closeModalButton;
let searchInput;

function openModal() {
  modalElement.style.display = "block";
}

function closeModal() {
  modalElement.style.display = "none";
}

window.onload = function () {
  modalElement = document.getElementById("modal");
  openModelButton = document.getElementById("openModal");
  closeModalButton = document.getElementById("closeBtn");
  searchInput = document.getElementById("searchInput");
  const query = new URLSearchParams(window.location.search);
  searchInput.value = query.get("search") || "";
  searchInput.focus();

  openModelButton.addEventListener("click", openModal);
  closeModalButton.addEventListener("click", closeModal);

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    window.location.href = `/?search=${searchInput.value}`;
  });
};
