///////////////////////Перерисовать ссылки/////////////////////
function rerenderLinks() {
  const isLogin = localStorage.getItem("token");
  if (isLogin) {
    //если токен присутствует
    signInButton.classList.add("hidden-item");
    registerButton.classList.add("hidden-item");
    toProfileButton.classList.remove("hidden-item");
  } else {
    //если токен отсутствует
    signInButton.classList.remove("hidden-item");
    registerButton.classList.remove("hidden-item");
    toProfileButton.classList.add("hidden-item");
  }
}

///////////////////////Очистка ошибок//////////////////////////
function clearErrors(element) {
  const messages = element.querySelectorAll(".invalid-feedback");
  const invalids = element.querySelectorAll(".is-invalid");
  messages.forEach((message) => message.remove());
  invalids.forEach((invalid) => invalid.classList.remove(".is-invalid"));
}

//////////////////////Добавление ошибки инпуту///////////////
function setErrorText(input, errorMessage) {
  const error = errorCreator(errorMessage);
  input.classList.add("is-invalid");
  input.insertAdjacentElement("afterend", error);
  input.addEventListener(
    "input",
    function () {
      error.remove();
      input.classList.remove("is-invalid");
      //Удалить красный цвет поля при вводе в инпут
      input.classList.remove("modal-is-invalid-field");
    },
    { once: true }
  );
}

///////////////////Cоздание кода с ошибкой////////////////
function errorCreator(message) {
  let messageError = document.createElement("div");
  messageError.classList.add("invalid-feedback");
  messageError.innerText = message;
  // console.log(messageError);
  return messageError;
}

/////////////////Cообщение об ошибке//////////////////////
function errorFormHandler(errors, form) {
  if (Object.keys(errors).length) {
    //перебираем массив с ошибками
    Object.keys(errors).forEach((key) => {
      const messageError = errors[key];
      const input = form.elements[key];
      setErrorText(input, messageError);
    });
    return;
  }
}

////////////////////////////////Отправка запроса//////////////////////
function sendRequest({ url, method = "GET", headers, body = null }) {
  return fetch(BASE_SERVER_PATH + url + "?v=0.0.1", {
    method,
    headers,
    body,
  });
}
