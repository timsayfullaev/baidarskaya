import "modern-normalize";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "/src/sass/style.scss";

try {
  const swiper = new Swiper(".promo__slider", {
    modules: [Navigation, Pagination],
    pagination: {
      el: ".promo__pagination",
    },
    navigation: {
      nextEl: ".promo__arrow_next",
      prevEl: ".promo__arrow_prev",
    },
    loop: true,
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
