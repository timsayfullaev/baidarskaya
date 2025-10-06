import "modern-normalize";

import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  Autoplay,
  Thumbs,
  EffectFade,
} from "swiper/modules";

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
    slidesPerView: 2,
    spaceBetween: 16,
    grabCursor: true,
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
  const thumbsSwiper = new Swiper(".product__thumbnails", {
    direction: "vertical",
    spaceBetween: 12,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const swiper = new Swiper(".product__slider", {
    modules: [Thumbs, EffectFade],
    spaceBetween: 12,
    effect: "fade",
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
    slidesPerView: 4,
    grabCursor: true,
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
