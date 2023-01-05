let filterForm = document.forms.myBlogFilterForm;
const SERVER_URL = "https://academy.directlinedev.com";
const mainLoader = document.querySelector(".main-loader_js");
//проверяем наличие поискового запроса в url
// if (location.search) {
//   const params = {}; //создаем объект будущих параметров

//   //создаем массив строк параметров например ['tagId=checkbox-blue, 'tagId=checkbox-light-blue', 'howShowId=radio-show-5'];
//   const arrayStringParams = location.search.substring(1).split("&");
//   //делаем перебор массива, коротый мы создали выше.
//   for (let stringParam of arrayStringParams) {
//     // создаем массив одного параметра ('tagId=checkbox-blue' => ['tagId', 'checkbox-blue'])
//     let param = stringParam.split("=");
//     let nameParam = param[0]; // получаем имя параметра.
//     let valueParam = param[1]; // получаем значение параметра
//     //выполняем проверку на то, присутствует ли имя параметра в нашем объекте params.

//     if (nameParam in params) {
//       // если присутствует то добавляем в массив значение параметра,
//       params[nameParam].push(valueParam);
//     } else {
//       //иначе создаем ключ внутри объекта и кладем в него значение параметра
//       params[nameParam] = [valueParam];
//     }
//   }

//   const updateInput = (gInputs, typeParam) => {
//     for (let input of gInputs) {
//       if (!params[typeParam]) continue;
//       const param = params[typeParam];
//       // console.log(`params: ${params}`, `param: ${param}`);
//       for (partParam of [...param]) {
//         if (partParam === input.value) input.checked = true;
//       }
//     }
//   };

//   updateInput(filterForm.filterTag, `tagId`);
//   updateInput(filterForm.filterViewsGroup, `viewsId`);
//   updateInput(filterForm.filterComments, `commentsId`);
//   updateInput(filterForm.filterHowShowGroup, `howShowId`);
//   updateInput(filterForm.filterSortByGroup, `sortById`);
// }

// filterForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   let arrayCheckedInput = [];
//   const addCheckedInput = (nameGroupInput, typeParam) => {
//     for (let checkbox of nameGroupInput) {
//       if (checkbox.checked) {
//         arrayCheckedInput.push(`${typeParam}=${checkbox.value}`);
//       }
//     }
//   };

//   addCheckedInput(e.target.filterTag, `tagId`);
//   addCheckedInput(e.target.filterViewsGroup, `viewsId`);
//   addCheckedInput(e.target.filterComments, `commentsId`);
//   addCheckedInput(e.target.filterHowShowGroup, `howShowId`);
//   addCheckedInput(e.target.filterSortByGroup, `sortById`);

//   //собираем строку с нажатыми инпутами
//   let stringCheckedInput = "";
//   for ([index, activeInput] of arrayCheckedInput.entries()) {
//     stringCheckedInput += activeInput;

//     if (index != arrayCheckedInput.length - 1) {
//       stringCheckedInput += "&";
//     }
//   }
//   const baseUrl = `${location.origin}${location.pathname}`;
//   const newUrl = baseUrl + `?${stringCheckedInput}`;
// location = newUrl;
// });

//////////////////////////////////////////////////////////////////////////////
///////////////////////////работаем с location history////////////////////////
//////////////////////////////////////////////////////////////////////////////

if (location.search) {
  const params = {};

  const arrayStringParams = location.search.substring(1).split("&");

  for (let stringParam of arrayStringParams) {
    let param = stringParam.split("=");
    let nameParam = param[0];
    let valueParam = param[1];
    if (nameParam in params) {
      params[nameParam] = [valueParam];
    }
  }

  const updateInput = (gInputs, typeParam) => {
    for (let input of gInputs) {
      if (!params[typeParam]) continue;
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

const url = new URL(location.partname, location.origin);
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  url.searchParams.delete("tagId");
  url.searchParams.delete("viewsId");
  url.searchParams.delete("commentsId");
  url.searchParams.delete("howShowId");
  url.searchParams.delete("sortById");

  const addCheckedInput = (nameGroupInput, typeParam) => {
    for (let checkbox of nameGroupInput) {
      if (checkbox.checked) {
        url.searchParams.append(typeParam, checkbox.value);
      }
    }
  };
  addCheckedInput(e.target.filterTag, `tagId`);
  addCheckedInput(e.target.filterViewsGroup, `viewsId`);
  addCheckedInput(e.target.filterComments, `commentsId`);
  addCheckedInput(e.target.filterHowShowGroup, `howShowId`);
  addCheckedInput(e.target.filterSortByGroup, `sortById`);

  history.replaceState(null, "", url);
});

//////////////////////////////////////////////////////////////////////////////
///////////////////////////XHR запрос/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
let loaderCount = 0;

const showLoader = () => {
  loaderCount++;
  mainLoader.classList.remove("hidden-item");
};
const hideLoader = () => {
  loaderCount--;
  if (loaderCount <= 0) {
    mainLoader.classList.add("hidden-item");
    loaderCount = 0;
  }
};

(function () {
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {};

    // data.tags = [];
    // for (let checkbox of [...filterForm.elements.filterTag]) {
    //   if (checkbox.checked) {
    //     data.tags.push(checkbox.value);
    //   }
    // }
    data.tags = [...filterForm.elements.tags]
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    data.view = (
      [...filterForm.elements.filterViewsGroup].find(
        (radio) => radio.checked
      ) || { value: null }
    ).value;
    data.comments = [];
    for (let checkbox of [...filterForm.elements.filterComments]) {
      if (checkbox.checked) {
        data.comments.push(checkbox.value);
      }
    }
    data.howshow = (
      [...filterForm.elements.filterHowShowGroup].find(
        (radio) => radio.checked
      ) || { value: null }
    ).value;
    data.sortby = (
      [...filterForm.elements.filterSortByGroup].find(
        (radio) => radio.checked
      ) || { value: null }
    ).value;
    getData(data);
    setSearchParams(data);
  });

  let xhr = new XMLHttpRequest();
  xhr.open("GET", SERVER_URL + "/api/tags");
  xhr.send();
  showLoader();
  xhr.onload = () => {
    const tags = JSON.parse(xhr.response).data;
    const tagsBox = document.querySelector(".select-of-box_js");
    // tags.forEach((tag) => {
    // const tagHTML = createTag(tag);
    // tagsBox.insertAdjacentHTML("beforeend", tagHTML);
    // });
    const params = getParamsFromLocation();
    setDataToFilter(params);
    getData(params);
    hideLoader();
  };
})();
function getParamsFromLocation() {
  let searchParams = new URLSearchParams(location.search);
  return {
    tags: searchParams.getAll("tags"),
    view: searchParams.get("view"),
    comments: searchParams.getAll("comments"),
    howshow: searchParams.get("howshow"),
    sortby: searchParams.get("sortby"),
  };
}

function setSearchParams(data) {
  let searchParams = new URLSearchParams();
  if (data.name) {
    searchParams.set("name", data.name);
  }
  data.tags.forEach((tag) => {
    searchParams.append("tags", tag);
  });
  if (data.view) {
    data.view.forEach((view) => {
      searchParams.append("view", view);
    });
  }
  if (data.comments) {
    data.comments.forEach((comments) => {
      searchParams.append("comments", comments);
    });
  }
  if (data.howshow) {
    data.howshow.forEach((howshow) => {
      searchParams.append("howshow", howshow);
    });
  }
  if (data.sortby) {
    data.vsortby.forEach((sortby) => {
      searchParams.append("sortby", sortby);
    });
  }
  history.replaceState(null, document.title, "?" + searchParams.toString());
}

function setDataToFilter(data) {
  filterForm.elements.tags.forEach((checkbox) => {
    checkbox.checked = data.tags.includes(checkbox.value);
  });
  filterForm.elements.view.forEach((radio) => {
    radio.checked = data.view === radio.value;
  });
  filterForm.elements.comments.forEach((checkbox) => {
    checkbox.checked = data.comments.includes(checkbox.value);
  });
  filterForm.elements.howshow.forEach((radio) => {
    radio.checked = data.howshow === radio.value;
  });
  filterForm.elements.sortby.forEach((checkbox) => {
    checkbox.checked = data.sortby.includes(checkbox.value);
  });
}
function getData(params) {
  const result = document.querySelector(".result_js");
  let xhr = new XMLHttpRequest();
  let searchParams = new URLSearchParams();
  searchParams.set("v", "1.0.0");

  if (params.tags && Array.isArray(params.tags) && params.tags.length) {
    searchParams.set("tags", JSON.stringify(params.tags));
  }

  let filter = {};
  if (params.name) {
    filter.title = params.name;
  }
  searchParams.set("filter", JSON.stringify(filter));

  if (params.sortby) {
    searchParams.set("sort", JSON.stringify([params.sortby, "DESC"]));
  }

  xhr.open("GET", SERVER_URL + "/api/posts?" + searchParams.toString());
  xhr.send();
  showLoader();
  result.innerHTML = "";
  xhr.onload = () => {
    const response = JSON.parse(xhr.response);
    response.data.forEach((post) => {
      const card = cardCreate({
        title: post.title,
        text: post.text,
        src: post.photo.desktopPhotoUrl,
        tags: post.tags,
      });
      result.insertAdjacentHTML("beforeend", card);
    });
    hideLoader();
  };
}
function cardCreate({ title, text, src, tags }) {
  return `
  <div class="my-blog__article">
    <div class="card">
      <img src="${SERVER_URL}${src}" class="card-img-top" alt="$[title}"></img>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${text}</p>${tags
    .map((tag) => `<span style="color: ${tag.color}">${tag.name}</span>`)
    .join("<br>")}
      </div>
    </div>
  </div> `;
}

function setDataToFilter(data) {}

// function createTag({ id, name, color }) {
//   return;
// }
