const changeOtherForm = document.forms.changeOther;

/////////////////////Изменение текста в поле//////////////////////////
(function uploadName() {
  if (!changeOtherForm) return;
  //   inputFileFieldText.innerHTML = "Choose a file...";
  const inputFileField = changeOtherForm.elements.file;
  const inputFileFieldText = document.querySelector(
    ".change-other-modal__file-info_js"
  );

  inputFileField.addEventListener("change", function (e) {
    let fileName = this.files[0].name;
    //console.log(fileName);
    if (fileName) {
      inputFileFieldText.innerHTML = fileName;
    }
  });
})();

/////////////////////Валидация полей//////////////////////////////////
(function () {
  if (!changeOtherForm) return;
  //получаем элементы формы
  const email = changeOtherForm.elements.email;
  const name = changeOtherForm.elements.name;
  const surname = changeOtherForm.elements.surname;
  const location = changeOtherForm.elements.location;
  const age = changeOtherForm.elements.age;
  const file = changeOtherForm.elements.file;
  // console.log(age);

  let errors = {}; //объект ошибок

  //Нажатие на submit
  changeOtherForm.addEventListener("submit", (e) => {
    errors = {}; //обнуляем объект
    e.preventDefault(); //отменяем стандартное поведение при submit

    //очищаем предварительно код от ошибки после первого нажатия на submit
    const errorMessages = changeOtherForm.querySelectorAll(".invalid-feedback");
    if (errorMessages) {
      for (let errorMessage of errorMessages) {
        errorMessage.remove();
      }
    }

    //условия валидации
    if (!isEmailValid(email.value)) {
      errors.email =
        'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    }
    if (!name.value) {
      errors.name =
        "Please enter a valid name (2 letters minimum, and no numbers and other symbols)";
    }
    if (!surname.value) {
      errors.surname =
        "Please enter a valid surname (2 letters minimum, and no numbers and other symbols)";
    }
    if (!location.value) {
      errors.location = "Please enter a valid location (2 letters minimum)";
    }
    if (!isAgeValid(age.value)) {
      errors.age = "Please enter your age (only integer numbers required)";
    }

    /////////////////сообщение об ошибке/////////////
    if (Object.keys(errors).length) {
      //перебираем массив с ошибками
      Object.keys(errors).forEach((key) => {
        const messageError = errors[key];
        const input = changeOtherForm.elements[key];
        setErrorText(input, messageError);
        // console.log(messageError);
      });
    }
    //данные для отправки на сервер
    const data = {
      email: email.value,
      name: name.value,
      surname: surname.value,
      location: location.value,
      age: age.value,
      picture: file.value,
    };
    console.log(data);
  });
})();
