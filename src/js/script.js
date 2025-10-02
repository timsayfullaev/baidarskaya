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
});

const form = document.querySelector("#callback form");
const callbackModal = document.getElementById("callback");

if (form && callbackModal) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    callbackModal.classList.remove("is-open");

    callbackModal.setAttribute("aria-hidden", "true");

    MicroModal.show("tnx");

    this.reset();
  });
}
