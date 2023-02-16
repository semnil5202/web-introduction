export default class App {
  #nickname;
  #checkedBoxes;
  #guests;

  readGuestState() {
    const assignButton = document
      .querySelector('#guest-item-container button[type="button"]')
      .addEventListener('click', (event) => {
        this.readInputsText(event);
      });
  }

  readInputsText(event) {
    this.#nickname = document.querySelector('#guest-item-input input');
    this.#checkedBoxes = document.querySelectorAll(
      '#guest-item-container div input[type="checkbox"]:checked + label > span',
    );

    this.renderGuests();
  }

  renderGuests() {
    this.#guests = document.getElementById('guest-reply');
    this.#guests.innerHTML += `
    <div id="guest-reply-item">
      <h3>${this.#nickname.value}</h3>
      ${[...this.#checkedBoxes].map((movie) => `<span>${movie.innerHTML}</span>`)}
    </div>`;

    this.#nickname.value = '';
    [...this.#checkedBoxes].forEach((span) => {
      if (span.parentNode.previousElementSibling.checked) {
        span.parentNode.previousElementSibling.checked = false;
      }
    });
  }
}

new App().readGuestState();
