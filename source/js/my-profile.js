let changePassBtn = document.querySelector(".my-profile__password-btn_js");
let changeOtherBtn = document.querySelector(".my-profile__other-btn_js");
let deleteAccBtn = document.querySelector(".my-profile__delete-btn_js");
let changePassModal = document.querySelector(".change-password-modal_js");
let changeOtherModal = document.querySelector(".change-other-modal_js");
let deletAccModal = document.querySelector(".delete-account-modal_js");
let closeBtnChangePass = document.querySelector(
  ".close-button-change-password_js"
);
let closeBtnChangeOther = document.querySelector(
  ".close-button-change-other_js"
);

// /////////////////Открытие Change password//////////////////////////////
(function () {
  if (!changePassBtn) return;
  changePassBtn.addEventListener("click", () => {
    changePassModal.classList.remove("hidden-item");
  });
})();
// /////////////////Открытие Change other//////////////////////////////
(function () {
  if (!changeOtherBtn) return;
  changeOtherBtn.addEventListener("click", () => {
    changeOtherModal.classList.remove("hidden-item");
  });
})();
// ///////////////Закрытие Change password нажатием крестика//////////////////////////////
(function () {
  if (!closeBtnChangePass) return;
  closeBtnChangePass.addEventListener("click", () => {
    changePassModal.classList.add("hidden-item");
  });
})();

// ///////////////Закрытие Change other нажатием крестика//////////////////////////////
(function () {
  if (!closeBtnChangeOther) return;
  closeBtnChangeOther.addEventListener("click", () => {
    changeOtherModal.classList.add("hidden-item");
  });
})();

//////////////Закрытие нажатием Esc//////////////////////////////
// (function () {
//   if (!signInModal && !registerModal) return;
//   window.addEventListener("keydown", (e) => {
//     if (e.keyCode === 27) {
//       signInModal.classList.add("hidden-item");
//       registerModal.classList.add("hidden-item");
//     }
//   });
// })();
