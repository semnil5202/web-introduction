export default class App {
  #nickname;
  #checkedBoxes;
  #guests;

  scrollLock() {
    window.onload = function () {
      const articles = document.querySelectorAll('article');
      const articleCount = articles.length;
      articles.forEach(function (item, index) {
        item.addEventListener('mousewheel', (event) => {
          event.preventDefault();
          let delta = 0;

          if (!event) event = window.event;
          if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
            if (window.opera) delta = -delta;
          } else if (event.detail) delta = -event.detail / 3;

          let moveTop = window.scrollY;
          let articleSelector = articles[index];

          if (delta < 0) {
            if (articleSelector !== articleCount - 1) {
              moveTop =
                window.pageYOffset + articleSelector.nextElementSibling.getBoundingClientRect().top;
            }
          } else {
            if (articleSelector !== 0) {
              moveTop =
                window.pageYOffset +
                articleSelector.previousElementSibling.getBoundingClientRect().top;
            }
          }

          const body = document.querySelector('html');
          window.scrollTo({ top: moveTop, left: 0, behavior: 'smooth' });
        });
      });
    };

    this.readGuestState();
  }

  scrollPosition(event) {}

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

new App().scrollLock();
