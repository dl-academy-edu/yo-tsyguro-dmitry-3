const BASE_SERVER_PATH = "https://academy.directlinedev.com";

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

//////////////////////валидация пароля //////////////////////
function isPasswordValid(password) {
  if (password.length >= 6) {
    return true;
  }
}
////////////////////валидация повтора пароля ////////////////
function isPasswordRepeatValid(password, passwordRepeat) {
  if (password === passwordRepeat) {
    return true;
  }
}
////////////////////////валидация возраста //////////////////
function isAgeValid(age) {
  if (age > 6 && age < 1000 && Number.isInteger(Number(age))) {
    return true;
  }
}
/////////////////////валидация почты ////////////////////
function isEmailValid(email) {
  if (!email) {
    return false;
  } else {
    return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
  }
}
///////////////// добавить красный цвет бордеру/////////////
function addInvalidColor(field) {
  field.classList.remove("modal-is-valid-field");
  field.classList.add("modal-is-invalid-field");
}
// ///////////////добавить зеленый цвет бордеру///////////////
function addValidColor(field) {
  field.classList.remove("modal-is-invalid-field");
  field.classList.add("modal-is-valid-field");
}
/////////////////////////////Удалить цвет полей при вводе в инпут//////////////////////
(function deleteFieldStyle() {
  const inputs = [...document.getElementsByTagName("input")];
  inputs.forEach((input) => {
    input.addEventListener(
      "input",
      () => {
        if (input.classList.contains("modal-is-valid-field")) {
          input.classList.remove("modal-is-valid-field");
        }
      }
      // { once: true }
    );
  });
})();

/////////////////////////Рендеринг данных профиля//////////////////////
function renderProfile(profile) {
  // profileImg.remove();
  profileImg.src = `${BASE_SERVER_PATH + profile.photoUrl}`;
  // profileImgWrapper.append(profileImg);
  profileName.innerText = profile.name;
  profileSurname.innerText = profile.surname;
  profileEmail.innerText = profile.email;
  profileLocation.innerText = profile.location;
  profileAge.innerText = profile.age;
}

//////////////////////////////////////////////////////////////////////
////////////////////////Лоадер////////////////////////////////////////
const mainLoader = document.querySelector(".main-loader_js");
let loaderCount = 0;
console.log(loaderCount);
///Функция Показать loader////
const showLoader = () => {
  loaderCount++;
  mainLoader.classList.remove("hidden-item");
};
///Функция Скрыть loader////
const hideLoader = () => {
  loaderCount--;
  if (loaderCount <= 0) {
    mainLoader.classList.add("hidden-item");
    loaderCount = 0;
  }
};

////////////////////////////////////////////////////
///////////////Функция преобразования даты//////////
function modifDate(date) {
  let tagDate = new Date(date);
  let day = tagDate.getDate();
  if (day < 10) day = "0" + day;
  let month = tagDate.getMonth();
  if (month < 10) month = "0" + month;
  let cardDate = `${day}.${month}.${tagDate.getFullYear()}`;
  console.log(cardDate);
  return cardDate;
}
