(function () {
  let changePassModal = document.querySelector(".change-password-modal_js");

  if (!changePassModal) return;
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      changePassModal.classList.add("hidden-item");
    }
  });
})();
// ///////////////////////////////Функция валидации////////////////////////////////
(function () {
  const changePassForm = document.forms.changePassword;
  if (!changePassForm) return;
  const oldPass = changePassForm.elements.oldPassword;
  const newPass = changePassForm.elements.newPassword;
  const repeatPass = changePassForm.elements.repeatPassword;
  let errors = {}; //объект ошибок

  //Нажатие на submit
  changePassForm.addEventListener("submit", (e) => {
    errors = {}; //обнуляем объект
    e.preventDefault(); //отменяем стандартное поведение при submit
    //очищаем предварительно код от ошибки после первого нажатия на submit
    const errorMessages = changePassForm.querySelectorAll(".invalid-feedback");
    if (errorMessages) {
      for (let errorMessage of errorMessages) {
        errorMessage.remove();
      }
    }

    //прописываем сообщения при валидации
    if (!oldPass.value) {
      errors.oldPassword = "This field is required";
      addInvalidColor(oldPass);
    } else if (!isPasswordValid(oldPass.value)) {
      errors.oldPassword = "Please enter a valid password (6 symbols minimum)";
      addInvalidColor(oldPass);
    } else {
      addValidColor(oldPass);
    }
    if (!newPass.value) {
      errors.newPassword = "This field is required";
      addInvalidColor(newPass);
    } else if (!isNewPasswordValid(oldPass.value, newPass.value)) {
      errors.newPassword =
        "Please enter a valid password (6 symbols minimum). Do not use the old password";
      addInvalidColor(newPass);
    } else {
      addValidColor(newPass);
    }
    if (!repeatPass.value) {
      errors.repeatPassword = "This field is required";
      addInvalidColor(repeatPass);
    } else if (!isPasswordRepeatValid(newPass.value, repeatPass.value)) {
      errors.repeatPassword =
        "The entered value does not match with entered password above";
      addInvalidColor(repeatPass);
    } else {
      addValidColor(repeatPass);
    }
    /////////////////сообщение об ошибке/////////////
    if (Object.keys(errors).length) {
      //перебираем массив с ошибками
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = changePassForm.elements[key];
        setErrorText(input, messageError);
      });
    }

    //данные для отправки на сервер
    const data = {
      oldPassword: oldPass.value,
      newPassword: newPass.value,
      repeatPassword: repeatPass.value,
    };
    // console.log(errors);
    console.log(data);
  });
})();

//валидация пароля (используется выше)
function isNewPasswordValid(passwordOld, passwordNew) {
  if (passwordNew.length >= 6 && passwordNew !== passwordOld) {
    return true;
  }
}
