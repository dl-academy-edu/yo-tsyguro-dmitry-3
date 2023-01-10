const loginForm = document.forms.login;

///////////////////////////////Функция валидации////////////////////////////////
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

    // //очищаем предварительно код от ошибки после первого нажатия на submit
    // const errorMessages = loginForm.querySelectorAll(".invalid-feedback");

    // if (errorMessages) {
    //   for (let errorMessage of errorMessages) {
    //     errorMessage.remove();
    //   }
    // }
    //прописываем сообщения при валидации
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
    if (!password.value) {
      errors.password = "This field is required";
      addInvalidColor(password);
    } else if (!isPasswordValid(password.value)) {
      errors.password = "Please enter a valid password (6 symbols minimum)";
      addInvalidColor(password);
    } else {
      addValidColor(password);
    }
    /////////////////сообщение об ошибке/////////////
    if (Object.keys(errors).length) {
      //перебираем массив с ошибками
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = loginForm.elements[key];
        setErrorText(input, messageError);
      });
    }

    //данные для отправки на сервер
    const data = {
      email: email.value,
      password: password.value,
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////Аутинтификация по токену///////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    sendRequest({
      method: "POST",
      url: "/api/users/login",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Вы успешно вошли!");
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        rerenderLinks();
        signInModal.classList.add("hidden-item");
      })
      .catch((err) => {
        console.log(err);
        if (err._message) {
          alert(err._message);
        }
        clearErrors(loginForm);
        errorFormHandler(err.errors, loginForm);
      });
  });
})();
