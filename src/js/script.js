import "modern-normalize";

import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";

import MicroModal from "micromodal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

import "/src/sass/style.scss";

try {
  const swiper = new Swiper(".promo__slider", {
    modules: [Navigation, Pagination, Autoplay],
    pagination: {
      el: ".promo__pagination",
    },
    navigation: {
      nextEl: ".promo__arrow_next",
      prevEl: ".promo__arrow_prev",
    },
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true,
    },
  });
} catch (error) {}

try {
  const swiper = new Swiper(".promotions__slider", {
    modules: [Pagination],
    pagination: {
      el: ".promotions__pagination",
    },
    slidesPerView: "auto",
    spaceBetween: 16,
    grabCursor: true,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
    },
  });
} catch (error) {}

try {
  document.querySelectorAll(".accordion__header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = item.querySelector(".accordion__content");

      if (item.classList.contains("accordion__item_active")) {
        // закрываем
        content.style.height = null;
        item.classList.remove("accordion__item_active");
      } else {
        // закрыть все
        document.querySelectorAll(".accordion__item").forEach((el) => {
          el.classList.remove("accordion__item_active");
          el.querySelector(".accordion__content").style.height = null;
        });

        // открыть выбранный
        item.classList.add("accordion__item_active");
        content.style.height = content.scrollHeight + "px";
      }
    });
  });
} catch (error) {}

try {
  const thumbsSwiper = new Swiper(".product__gallery-thumbs", {
    spaceBetween: 16,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      768: {
        spaceBetween: 12,
        direction: "vertical",
      },
    },
  });
  const swiper = new Swiper(".product__gallery-main", {
    modules: [Thumbs],
    spaceBetween: 12,
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
} catch (error) {}

try {
  const swiper = new Swiper(".related__slider", {
    modules: [Pagination],
    pagination: {
      el: ".related__pagination",
    },
    slidesPerView: 2,
    spaceBetween: 16,
    grabCursor: true,
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  });
} catch (error) {}

MicroModal.init({
  disableFocus: true,
  awaitCloseAnimation: true,
  disableScroll: true,
});

function modalFormHandler(modalId, successModalId) {
  const modal = document.getElementById(modalId);
  const form = modal ? modal.querySelector("form") : null;

  if (!modal || !form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Закрываем текущую модалку
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    // Возвращаем скролл корректно
    document.body.style.overflow = "";

    // Показываем модалку "спасибо"
    MicroModal.show(successModalId);

    // Очищаем форму
    this.reset();
  });
}

try {
  modalFormHandler("callback", "callbackThanks");
  modalFormHandler("support", "supportThanks");
  modalFormHandler("contact", "contactThanks");
} catch (error) {}

try {
  // Получаем элементы модалок и кнопку "Оформить заказ" из первой модалки (orderWater)
  const btnOrder = document.querySelector("#orderWater .modal__button");
  const modalWater = document.getElementById("orderWater");
  const modalDelivery = document.getElementById("orderDelivery");

  // Если элементы существуют, вешаем обработчик клика
  if (btnOrder && modalDelivery) {
    btnOrder.addEventListener("click", () => {
      // Закрываем первую модалку (вода)
      modalWater.classList.remove("is-open");
      modalWater.setAttribute("aria-hidden", "true");

      // Возвращаем скролл корректно
      document.body.style.overflow = "";

      // Открываем вторую модалку (доставка)
      MicroModal.show("orderDelivery");
    });
  }

  // Получаем элементы формы и модалок для второго шага (доставка)
  const formDelivery = document.querySelector("#orderDelivery form");
  const modalDeliveryEl = document.getElementById("orderDelivery");
  const modalFormed = document.getElementById("orderFormed");

  // Если форма и модалки существуют, добавляем обработчик сабмита
  if (formDelivery && modalDeliveryEl && modalFormed) {
    formDelivery.addEventListener("submit", function (e) {
      e.preventDefault();

      // Закрываем модалку "доставка"
      modalDeliveryEl.classList.remove("is-open");
      modalDeliveryEl.setAttribute("aria-hidden", "true");

      // Возвращаем скролл корректно
      document.body.style.overflow = "";

      // Открываем модалку "заказ оформлен"
      MicroModal.show("orderFormed");

      // Сбрасываем форму
      this.reset();
    });
  }
} catch (error) {}

const dropdowns = document.querySelectorAll(".city-dropdown");
const phoneLinks = document.querySelectorAll(".city-phone");

const cityPhones = {
  Севастополь: "+79787637762",
  Симферополь: "+79781234567",
  Евпатория: "+79787654321",
};

function updateCity(city) {
  dropdowns.forEach((dropdown) => {
    const span = dropdown.querySelector(".city-name");
    span.textContent = city;

    dropdown.querySelectorAll(".dropdown__link").forEach((link) => {
      link.classList.toggle("dropdown__link_active", link.textContent === city);
    });
  });

  if (cityPhones[city]) {
    phoneLinks.forEach((link) => {
      // убираем лишние плюсы
      const cleanNumber = cityPhones[city].replace(/\+/g, "");
      link.href = `tel:+${cleanNumber}`;
      link.textContent = `+${cleanNumber.replace(
        /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
        "$1 $2 $3-$4-$5"
      )}`;
    });
  }

  localStorage.setItem("selectedCity", city);
}

const savedCity = localStorage.getItem("selectedCity");
if (savedCity && cityPhones[savedCity]) {
  updateCity(savedCity);
}

dropdowns.forEach((dropdown) => {
  dropdown.querySelectorAll(".dropdown__link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const city = link.textContent;
      updateCity(city);
    });
  });
});

try {
  const quantities = document.querySelectorAll(".quantity");

  quantities.forEach((quantity) => {
    const input = quantity.querySelector(".quantity__number");
    const btnMinus = quantity.querySelector(".quantity__button_minus");
    const btnPlus = quantity.querySelector(".quantity__button_plus");

    // Уменьшение
    btnMinus.addEventListener("click", () => {
      let currentValue = parseInt(input.value) || 1;
      if (currentValue > 1) {
        input.value = currentValue - 1;
      }
    });

    // Увеличение
    btnPlus.addEventListener("click", () => {
      let currentValue = parseInt(input.value) || 1;
      input.value = currentValue + 1;
    });

    // Ввод вручную
    input.addEventListener("input", () => {
      let value = parseInt(input.value);
      if (isNaN(value) || value < 1) {
        input.value = 1;
      }
    });
  });
} catch (error) {}

try {
  const promoButtons = document.querySelectorAll(".button_promocode");

  promoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const code = button.dataset.code;

      // Копирование через временный input
      const tempInput = document.createElement("input");
      tempInput.value = code;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      // Показываем надпись "Скопировано!"
      button.classList.add("copied");

      // Убираем через 2 секунды
      setTimeout(() => {
        button.classList.remove("copied");
      }, 2000);
    });
  });
} catch (error) {}

try {
  const tabs = document.querySelectorAll(".tabs"); // вдруг у тебя несколько блоков табов на странице

  tabs.forEach((tab) => {
    const buttons = tab.querySelectorAll(".tabs__button");
    const contents = tab.querySelectorAll(".tabs__content");

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // сбрасываем активные состояния
        buttons.forEach((b) => b.classList.remove("tabs__button_active"));
        contents.forEach((c) => c.classList.remove("tabs__content_active"));

        // активируем нужные
        btn.classList.add("tabs__button_active");
        contents[index].classList.add("tabs__content_active");
      });
    });
  });
} catch (error) {}

const hamburger = document.querySelector(".header__hamburger");
const offScreenMenu = document.querySelector(".header-mobile");
const offScreenMenuClose = document.querySelector(".header-mobile__close");
const overlay = document.querySelector(".header-mobile__overlay");

function openMenu() {
  offScreenMenu.classList.add("header-mobile_active");
  overlay.classList.add("header-mobile__overlay_active");
  document.body.classList.add("no-scroll");
}

function closeMenu() {
  offScreenMenu.classList.remove("header-mobile_active");
  overlay.classList.remove("header-mobile__overlay_active");
  document.body.classList.remove("no-scroll");
}

hamburger.addEventListener("click", openMenu);
offScreenMenuClose.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);
