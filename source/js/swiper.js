const swiper = new Swiper(".swiper", {
  speed: 100,
  spaceBetween: 100,
  navigation: {
    nextEl: ".swiper-button-right",
    prevEl: ".swiper-button-left",
  },
  watchOverflow: true,

  pagination: {
    el: ".swiper-pagination-numbers",
    type: "bullets",

    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

// new Swiper(".my-blog-slider", {

//   pagination: {
//     el: ".swiper-pagination-numbers",
//     clickable: true,
//     renderBullet: function (index, className) {
//       return '<span class="' + className + '">' + (index + 1) + "</span>";
//     },
//   },
//   mousewheel: true,
//   keyboard: true,
// });

//////////////////пробовать этот код///////////////
// var menu = ["Slide 1", "Slide 2", "Slide 3"];
// var mySwiper = new Swiper(".swiper-container", {
//   // If we need pagination
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     renderBullet: function (index, className) {
//       return '<span class="' + className + '">' + menu[index] + "</span>";
//     },
//   },
// });
