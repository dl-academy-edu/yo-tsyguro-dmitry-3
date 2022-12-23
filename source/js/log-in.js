const loginForm = document.forms.login;
const email = loginForm.elements.email;
const password = loginForm.elements.password;

///////////////////////////////Функция валидации////////////////////////////////
(function () {
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
    //прописываем сообщения при валидации
    if (!isEmailValid(email.value)) {
      errors.email =
        'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    }
    if (!isPasswordValid(password.value)) {
      errors.password = "Please enter a valid password (6 symbols minimum)";
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
    console.log(data);
  });
})();

//валидация пароля (используется выше)
function isPasswordValid(password) {
  if (password.length >= 6) {
    return true;
  }
}
