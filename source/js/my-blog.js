let filterForm = document.forms.myBlogFilterForm;
///проверяем наличие поискового запроса в url
if (location.search) {
  const params = {}; //создаем объект будущих параметров

  //создаем массив строк параметров например ['tagId=checkbox-blue, 'tagId=checkbox-light-blue', 'howShowId=radio-show-5'];
  const arrayStringParams = location.search.substring(1).split("&");
  //делаем перебор массива, коротый мы создали выше.
  for (let stringParam of arrayStringParams) {
    // создаем массив одного параметра ('tagId=checkbox-blue' => ['tagId', 'checkbox-blue'])
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
    console.log(`7 строка условия отработала`);
  }

  const updateInput = (gInputs, typeParam) => {
    for (let input of gInputs) {
      const param = params[typeParam];
      console.log(`params: ${params}`, `param: ${param}`);
      for (partParam of [...param]) {
        if (partParam === input.value) input.checked = true;
      }
    }
  };
  // console.log(`param: ${param}, params: ${params}`);
  // console.log(`filterForm: ${filterForm.filterTag}`);
  updateInput(filterForm.filterTag, `tagId`);
  updateInput(filterForm.filterViewsGroup, `viewsId`);
  updateInput(filterForm.filterComments, `commentsId`);
  updateInput(filterForm.filterHowShowGroup, `howShowId`);
  updateInput(filterForm.filterSortByGroup, `sortById`);
}
console.log(filterForm);

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let arrayCheckedInput = [];
  const addCheckedInput = (nameGroupInput, typeParam) => {
    for (let checkbox of nameGroupInput) {
      if (checkbox.checked) {
        arrayCheckedInput.push(`${typeParam}=${checkbox.value}`);
      }
    }
  };
  addCheckedInput(e.target.filterTag, `tagId`);
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
///////////////////////////работаем с location history////////////////////////
//////////////////////////////////////////////////////////////////////////////

// if (location.search) {
//   const params = {};

//   const arrayStringParams = location.search.substring(1).split("&");

//   for (let stringParam of arrayStringParams) {
//     let param = stringParam.split("=");
//     let nameParam = param[0];
//     let valueParam = param[1];
//     if (nameParam in params) {
//       params[nameParam] = [valueParam];
//     }
//   }

//   const updateInput = (gInputs, typeParam) => {
//     for (let input of gInputs) {
//       const param = params[typeParam];
//       for (partParam of param) {
//         if (partParam === input.value) input.checked = true;
//       }
//     }
//   };

//   updateInput(filterForm.filterTag, "tagId");
//   updateInput(filterForm.filterViewsGroup, "viewsId");
//   updateInput(filterForm.filterComments, "commentsId");
//   updateInput(filterForm.filterHowShowGroup, "howShowId");
//   updateInput(filterForm.filterSortByGroup, "sortById");
// }

// const url = new URL(location.partname, location.origin);
// filterForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   url.searchParams.delete("tagId");
//   url.searchParams.delete("viewsId");
//   url.searchParams.delete("commentsId");
//   url.searchParams.delete("howShowId");
//   url.searchParams.delete("sortById");

//   const addCheckedInput = (nameGroupInput, typeParam) => {
//     for (let checkbox of nameGroupInput) {
//       if (checkbox.checked) {
//         url.searchParams.append(typeParam, checkbox.value);
//       }
//     }
//   };
//   addCheckedInput(e.target.filterTag, `tagId`);
//   addCheckedInput(e.target.filterViewsGroup, `viewsId`);
//   addCheckedInput(e.target.filterComments, `commentsId`);
//   addCheckedInput(e.target.filterHowShowGroup, `howShowId`);
//   addCheckedInput(e.target.filterSortByGroup, `sortById`);

//   history.replaceState(null, "", url);
// });
