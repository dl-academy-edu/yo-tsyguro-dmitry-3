let filterForm = document.forms.myBlogFilterForm;
///проверяем наличие поискового запроса в url
if (location.search) {
  let params = {}; //создаем объект будущих параметров

  //создаем массив строк параметров например ['phoneId=apple', 'phoneId=xiaomi', 'howShow=10'];
  const arrayStringParams = location.search.substring(1).split("&");
  //делаем перебор массива, коротый мы создали выше.
  for (let stringParam of arrayStringParams) {
    // создаем массив одного параметра ('phoneId=apple' => ['phoneId', 'apple'])
    let param = stringParam.split("=");
    let nameParam = param[0]; // получаем имя параметра.
    let valueParam = param[1]; // получаем значение параметра
    //выполняем проверку на то, присутствует ли имя параметра в нашем объекте params.

    if (nameParam in params) {
      // если присутствует то добавляем в массив значение параметра,
      params[nameParam].push(valueParam);
    } else {
      //иначе создаем ключ внутри объекта и кладем в него значение параметра
      params[nameParam] = [valueParam];
    }
  }

  console.log(filterForm);

  const updateInput = (gInputs, typeParam) => {
    for (let input of gInputs) {
      const param = params[typeParam];
      for (partParam of param) {
        if (partParam === input.value) input.checked = true;
      }
    }
  };

  updateInput(filterForm.filterTag, "tagId");
  updateInput(filterForm.filterViewsGroup, "viewsId");
  updateInput(filterForm.filterComments, "commentsId");
  updateInput(filterForm.filterHowShowGroup, "howShowId");
  updateInput(filterForm.filterSortByGroup, "sortById");
}
console.log(filterForm);

filterForm.addEventListener("submit", (e) => {
  console.log("Нажал submit");
  e.preventDefault();

  let arrayCheckedInput = [];
  const addCheckedInput = (nameGroupInput, typeParam) => {
    for (checkbox of nameGroupInput) {
      if (checkbox.checked) {
        arrayCheckedInput.push(`${typeParam}=${checkbox.value}`);
      }
    }
  };
  console.log(e.target.filterSortByGroup);
  console.log(filterForm);
  addCheckedInput(e.target.filterTag, `tagId`);
  console.log(filterForm);
  addCheckedInput(e.target.filterViewsGroup, `viewsId`);
  addCheckedInput(e.target.filterComments, `commentsId`);
  addCheckedInput(e.target.filterHowShowGroup, `howShowId`);
  addCheckedInput(e.target.filterSortByGroup, `sortById`);

  //собираем строку с нажатыми инпутами
  let stringCheckedInput = "";
  for ([index, activeInput] of arrayCheckedInput.entries()) {
    stringCheckedInput += activeInput;

    if (index != arrayCheckedInput.length - 1) {
      stringCheckedInput += "&";
    }
  }
  const baseUrl = `${location.origin}${location.pathname}`;
  const newUrl = baseUrl + `?${stringCheckedInput}`;
  location = newUrl;
});
//////////////////////////////////////////////////////////////////////////////

// Не работает функция
