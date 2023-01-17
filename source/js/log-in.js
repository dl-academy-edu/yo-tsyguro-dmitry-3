const loginForm = document.forms.login;
const loginInputs = [...loginForm.getElementsByTagName("input")];
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////Функция валидации////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
(function () {
  const email = loginForm.elements.email;
  const password = loginForm.elements.password;
  const isLogin = localStorage.getItem("token");
  if (isLogin) rerenderLinks();
  let errors = {}; //объект ошибок

  //Нажатие на submit
  loginForm.addEventListener("submit", (e) => {
    errors = {}; //обнуляем объект
    e.preventDefault(); //отменяем стандартное поведение при submit

    //очищаем предварительно код от ошибки после первого нажатия на submit
    const errorMessages = loginForm.querySelectorAll(".invalid-feedback");

    if (errorMessages) {
      for (let errorMessage of errorMessages) {
        errorMessage.remove();
      }
    }

    //////проверяем на наличие required////
    loginInputs.forEach((input) => {
      if (input.hasAttribute("required")) {
        if (input === email) {
          //прописываем сообщения при валидации
          //почта
          if (!email.value) {
            errors.email = "This field is required";
            addInvalidColor(email);
          } else if (!isEmailValid(email.value)) {
            errors.email =
              'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
            addInvalidColor(email);
          } else {
            addValidColor(email);
          }
        } else if (input === password) {
          //пароль
          if (!password.value) {
            errors.password = "This field is required";
            addInvalidColor(password);
          } else if (!isPasswordValid(password.value)) {
            errors.password =
              "Please enter a valid password (6 symbols minimum)";
            addInvalidColor(password);
          } else {
            addValidColor(password);
          }
        }
        /////////////////сообщение об ошибке/////////////

        //данные для отправки на сервер
      } else {
        return;
      }
    });
    if (Object.keys(errors).length) {
      //перебираем массив с ошибками
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = loginForm.elements[key];
        setErrorText(input, messageError);
      });
    }
    if (errors.length) {
      clearErrors(loginForm);
      errorFormHandler(errors, loginForm);
      errors = {};
      return;
    }
    const data = {
      email: email.value,
      password: password.value,
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////Аутинтификация по токену///////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!Object.keys(errors).length) {
      sendRequest({
        url: "/api/users/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          showLoader();
          setTimeout(() => {
            hideLoader();
            location.pathname = "/my-profile.html";
          }, 2000);
          console.log("Запрос успешно отправлен на сервер!");
          console.log(response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          console.log("Gjrfpfnm kjflth");
          rerenderLinks();

          signInModal.classList.add("hidden-item");
        })
        .catch((err) => {
          showLoader();
          setTimeout(() => {
            hideLoader();
          }, 2000);
          console.log(err);
          if (err._message) {
            alert(err._message);
          }
        })
        .finally(() => {});
    } else {
      console.log("Есть ошибки в заполнении формы");
    }
  });
})();
