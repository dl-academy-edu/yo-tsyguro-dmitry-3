const signUpForm = document.forms.signUp; //получаем форму
const EMAIL_REGEXP =
  '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/iu';
//const NAME_REGEXP = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/; // имя + фамилия (исходник что нашел в инете)

///////////////////Включение кнопки чекбоксом///////////////////////////////
const checkbox = signUpForm.elements.checkbox;

const signUpButton = document.querySelector(".register-button_js");

///////////////////////////////////включаем кнопку////////////
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    signUpButton.removeAttribute("disabled", "disabled");
  } else {
    signUpButton.setAttribute("disabled", "disabled");
  }
});
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////Главная функция////////////////////////////////////////////////////
(function () {
  //получаем элементы формы
  const email = signUpForm.elements.email;
  const name = signUpForm.elements.name;
  const surname = signUpForm.elements.surname;
  const password = signUpForm.elements.password;
  const passwordRepeat = signUpForm.elements.passwordRepeat;
  const location = signUpForm.elements.location;
  const age = signUpForm.elements.age;
  // console.log(age);
  //объект ошибок
  let errors = {};

  //Нажатие на submit
  signUpForm.addEventListener("submit", (e) => {
    errors = {}; //обнуляем объект
    e.preventDefault(); //отменяем стандартное поведение при submit

    //очищаем предварительно код от ошибки после первого нажатия на submit
    const errorMessages = signUpForm.querySelectorAll(".invalid-feedback");
    if (errorMessages) {
      for (let errorMessage of errorMessages) {
        errorMessage.remove();
      }
    }

    //условия валидации
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

    if (!name.value) {
      errors.name = "This field is required";
      addInvalidColor(name);
    } else if (!name.value) {
      errors.name =
        "Please enter a valid name (2 letters minimum, and no numbers and other symbols)";
      addInvalidColor(name);
    } else {
      addValidColor(name);
    }

    if (!surname.value) {
      errors.surname = "This field is required";
      addInvalidColor(surname);
    } else if (!surname.value) {
      errors.surname =
        "Please enter a valid surname (2 letters minimum, and no numbers and other symbols)";
      addInvalidColor(password);
    } else {
      addValidColor(surname);
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

    if (!passwordRepeat.value) {
      errors.passwordRepeat = "This field is required";
      addInvalidColor(passwordRepeat);
    } else if (!isPasswordRepeatValid(password.value, passwordRepeat.value)) {
      errors.passwordRepeat =
        "The entered value does not match with entered password above";
      addInvalidColor(passwordRepeat);
    } else {
      addValidColor(passwordRepeat);
    }

    if (!location.value) {
      errors.location = "This field is required";
      addInvalidColor(location);
    } else if (!location.value) {
      errors.location = "Please enter a valid location (2 letters minimum)";
      addInvalidColor(location);
    } else {
      addValidColor(location);
    }

    if (!age.value) {
      errors.age = "This field is required";
      addInvalidColor(age);
    } else if (!isAgeValid(age.value)) {
      errors.age = "Please enter your age (only integer numbers required)";
      addInvalidColor(age);
    } else {
      addValidColor(age);
    }

    /////////////////сообщение об ошибке/////////////
    if (Object.keys(errors).length) {
      //перебираем массив с ошибками
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = signUpForm.elements[key];
        setErrorText(input, messageError);
        // console.log(messageError);
      });
    }
    //данные для отправки на сервер
    const data = {
      email: email.value,
      name: name.value,
      surname: surname.value,
      password: password.value,
      location: location.value,
      age: age.value,
    };
    console.log(data);
  });
})();

//создание кода с ошибкой
function errorCreator(message) {
  let messageError = document.createElement("div");
  messageError.classList.add("invalid-feedback");
  messageError.innerText = message;
  // console.log(messageError);
  return messageError;
}
/////////////////////////////Удалить цвет полей при вводе в инпут//////////////////////
// (function deleteFieldStyle() {
//   let inputs = [...document.querySelectorAll(".modal-is-valid-field")];
//   // console.log(inputs);
//   if (!inputs) return;
//   inputs.forEach((input) => {
//     input.addEventListener(
//       "input",
//       function () {
//         input.classList.remove("modal-is-valid-field");
//       },
//       { once: true }
//     );
//   });
// })();
(function deleteFieldStyle() {
  const inputs = [...document.getElementsByTagName("input")];
  inputs.forEach((input) => {
    input.addEventListener(
      "input",
      () => {
        if (input.classList.contains("modal-is-valid-field")) {
          console.log("удаляю");
          input.classList.remove("modal-is-valid-field");
        }
      }
      // { once: true }
    );
  });
})();
//добавление ошибки инпуту
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

//валидация почты (используется выше)

function isEmailValid(email) {
  if (!email) {
    return false;
  } else {
    return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
  }
}
//валидация пароля (используется выше)
function isPasswordValid(password) {
  if (password.length >= 6) {
    return true;
  }
}
//валидация повтора пароля (используется выше)
function isPasswordRepeatValid(password, passwordRepeat) {
  if (password === passwordRepeat) {
    return true;
  }
}
//валидация возраста (используется выше)
function isAgeValid(age) {
  if (age > 6 && age < 1000 && Number.isInteger(Number(age))) {
    return true;
  }
}
// добавить красный цвет бордеру
function addInvalidColor(field) {
  field.classList.remove("modal-is-valid-field");
  field.classList.add("modal-is-invalid-field");
}
// добавить зеленый цвет бордеру
function addValidColor(field) {
  field.classList.remove("modal-is-invalid-field");
  field.classList.add("modal-is-valid-field");
}
