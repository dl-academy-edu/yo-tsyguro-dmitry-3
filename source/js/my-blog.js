// const { active } = require("browser-sync");

let filterForm = document.forms.myBlogFilterForm;
const SERVER_URL = "https://academy.directlinedev.com";

const paginationLinks = document.querySelector(".my-blog__pagination_js");

//проверяем наличие поискового запроса в url
if (location.search) {
  const params = {}; //создаем объект будущих параметров
  //создаем массив строк параметров например ['tags=checkbox-blue, 'tags=checkbox-light-blue', 'howShow=radio-show-5'];
  const arrayStringParams = location.search.substring(1).split("&");
  //делаем перебор массива, коротый мы создали выше.
  for (let stringParam of arrayStringParams) {
    // создаем массив одного параметра ('tags=checkbox-blue' => ['tags', 'checkbox-blue'])
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

  const updateInput = (gInputs, typeParam) => {
    for (let input of gInputs) {
      if (!params[typeParam]) continue;
      const param = params[typeParam];
      // console.log(params[typeParam]);
      // console.log(`params: ${params}`, `param: ${param}`);
      for (partParam of [...param]) {
        if (partParam === input.value) input.checked = true;
      }
    }
  };

  updateInput(filterForm.filterTag, `tags`);
  updateInput(filterForm.filterViewsGroup, `views`);
  updateInput(filterForm.filterComments, `commentsCount`);
  updateInput(filterForm.filterHowShowGroup, `limit`);
  updateInput(filterForm.filterSortByGroup, `sort`);
}

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

  addCheckedInput(e.target.filterTag, `tags`);
  addCheckedInput(e.target.filterViewsGroup, `views`);
  addCheckedInput(e.target.filterComments, `commentsCount`);
  addCheckedInput(e.target.filterHowShowGroup, `limit`);
  addCheckedInput(e.target.filterSortByGroup, `sort`);

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

  updateInput(filterForm.filterTag, "tags");
  updateInput(filterForm.filterViewsGroup, "views");
  updateInput(filterForm.filterComments, "commentsCount");
  updateInput(filterForm.filterHowShowGroup, "limit");
  updateInput(filterForm.filterSortByGroup, "sort");
}

const url = new URL(location.partname, location.origin);
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  url.searchParams.delete("tags");
  url.searchParams.delete("views");
  url.searchParams.delete("commentsCount");
  url.searchParams.delete("limit");
  url.searchParams.delete("sort");
  url.searchParams.delete("page"); ////////////////////////////?????????????????????/

  const addCheckedInput = (nameGroupInput, typeParam) => {
    for (let checkbox of nameGroupInput) {
      if (checkbox.checked) {
        url.searchParams.append(typeParam, checkbox.value);
      }
    }
  };
  addCheckedInput(e.target.filterTag, `tags`);
  addCheckedInput(e.target.filterViewsGroup, `views`);
  addCheckedInput(e.target.filterComments, `commentsCount`);
  addCheckedInput(e.target.filterHowShowGroup, `limit`);
  addCheckedInput(e.target.filterSortByGroup, `sort`);

  history.replaceState(null, "", url);
});

//////////////////////////////////////////////////////////////////////////////
///////////////////////////XHR запрос/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/////////////////////Функция///////////////
(function () {
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    ///Создаем и наполняем  объект с выбранными фильтрами////
    let data = {
      page: 0,
    };
    data.tags = [...filterForm.elements.filterTag]
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    data.views = (
      [...filterForm.elements.filterViewsGroup].find(
        (radio) => radio.checked
      ) || { value: null }
    ).value;

    // data.commentsCount = (
    //   [...filterForm.elements.filterComments].filter(
    //     (checkbox) => checkbox.checked
    //   ) || { value: null }
    // ).value;
    data.commentsCount = [...filterForm.elements.filterComments]
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    data.limit = (
      [...filterForm.elements.filterHowShowGroup].find(
        (radio) => radio.checked
      ) || { value: null }
    ).value;

    data.sort = (
      [...filterForm.elements.filterSortByGroup].find(
        (radio) => radio.checked
      ) || { value: null }
    ).value;

    console.log(data);
    getData(data);
    setSearchParams(data);
  });

  let xhr = new XMLHttpRequest();
  xhr.open("GET", SERVER_URL + "/api/tags");
  xhr.send();
  showLoader();
  xhr.onload = () => {
    // const tags = JSON.parse(xhr.response).data;
    // const tagsBox = document.querySelector(".select-of-box_js");
    // tags.forEach((tag) => {
    //   const tagHTML = createTag(tag);
    //   tagsBox.insertAdjacentHTML("beforeend", tagHTML);
    // });
    const params = getParamsFromLocation();
    // setDataToFilter(params);
    getData(params);
    hideLoader();
  };
})();
/////////////////////Функция получения данных из location.search///////////////
function getParamsFromLocation() {
  let searchParams = new URLSearchParams(location.search);
  return {
    tags: searchParams.getAll("tags"),
    views: searchParams.get("views"), //("filter")
    commentsCount: searchParams.getAll("commentsCount"), //("filter")
    limit: searchParams.get("limit"), //("filter")
    sort: searchParams.get("sort"),
    page: +searchParams.get("page") || 0,
  };
}
/////////////////////Функция  позволяет положить новые значения в searchParams///////////////
function setSearchParams(data) {
  let searchParams = new URLSearchParams();
  if (data.name) {
    searchParams.set("name", data.name);
  }
  if (data.tags) {
    data.tags.forEach((tags) => {
      searchParams.append("tags", tags);
    });
  }
  if (data.views) {
    data.views.forEach((views) => {
      searchParams.append("views", views);
    });
  }
  if (data.commentsCount) {
    data.commentsCount.forEach((commentsCount) => {
      searchParams.append("commentsCount", commentsCount);
    });
  }
  if (data.limit) {
    data.limit.forEach((limit) => {
      searchParams.append("limit", limit);
    });
  }
  if (data.sort) {
    searchParams.set("sort", data.sort);
  }
  if (data.page) {
    searchParams.set("page", data.page);
  } else {
    searchParams.set("page", 0);
  }
  history.replaceState(null, document.title, "?" + searchParams.toString());
}
/////////////////////Функция выделение элементов верстки которые выбраны///////////////
function setDataToFilter(data) {
  console.log(data);
  filterForm.elements.filterTag.forEach((checkbox) => {
    checkbox.checked = data.tags.includes(checkbox.value);
  });
  filterForm.elements.filterViewsGroup.forEach((radio) => {
    radio.checked = data.views === radio.value;
  });
  filterForm.elements.filterComments.forEach((checkbox) => {
    checkbox.checked = data.commentsCount.includes(checkbox.value);
  });
  filterForm.elements.filterHowShowGroup.forEach((radio) => {
    radio.checked = data.limit === radio.value;
  });
  filterForm.elements.filterSortByGroup.forEach((radio) => {
    radio.checked = data.sort === radio.value;
  });
}
////////////////////////////////////////////////////////////
/////////////////////Функция получения постов///////////////
////////////////////////////////////////////////////////////
function getData(params) {
  const result = document.querySelector(".result_js");
  let xhr = new XMLHttpRequest();
  let searchParams = new URLSearchParams();
  searchParams.set("v", "1.0.0");
  //////////////////////////////////////////
  ////////////Реализация фильтров///////////

  //по тегу//
  if (params.tags && Array.isArray(params.tags) && params.tags.length) {
    searchParams.set("tags", JSON.stringify(params.tags));
  }
  ////////по просмотрам и комментариям//////////
  let filter = {};
  //по просмотрам
  if (params.views) {
    filter.views = {
      $between: [+params.views.split("-")[0], +params.views.split("-")[1]],
    };
  }
  //формируем объект чекбоксов с комментариями///
  let maxComments;
  let minComments;
  let commentsArr = params.commentsCount;
  switch (commentsArr.length) {
    //нажаты все чекбоксы
    case 0: {
      maxComments = 0;
      minComments = 0;
      break;
    }
    default: {
      minComments = commentsArr[0].split("-")[0];
      maxComments = commentsArr[commentsArr.length - 1].split("-")[1];
      break;
    }
  }
  filter.commentsCount = {
    $between: [minComments, maxComments],
  };
  console.log(filter);

  // console.log(params.commentsCount);
  // if (
  //   params.commentsCount &&
  //   Array.isArray(params.commentsCount) &&
  //   params.commentsCount.length
  // ) {
  //   filter.commentsCount = {
  //     $between: [
  //       +params.commentsCount[0].split("-")[0],
  //       +params.commentsCount[0].split("-")[1],
  //     ],
  //   };
  // }

  searchParams.set("filter", JSON.stringify(filter));
  //по кол-ву постов//
  let postLimit = (() => {
    if (+params.limit > 0) {
      return +params.limit;
    } else {
      return 10;
    }
  })();
  if (postLimit) {
    searchParams.set("limit", postLimit);
  }
  //по виду сортировки//
  if (params.sort) {
    searchParams.set("sort", JSON.stringify([params.sort, "DESC"]));
  }
  //по пропущенным постам (для пагинации)//
  if (+params.page) {
    searchParams.set("offset", +params.page * postLimit);
  }

  ///////////////////////////////////////////////////////////////////
  ////////////Запрос//////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  xhr.open("GET", SERVER_URL + "/api/posts?" + searchParams.toString());
  xhr.send();
  showLoader();
  result.innerHTML = "";
  paginationLinks.innerHTML = ""; ///?????????????????????????????????????????????????????????????????

  xhr.onload = () => {
    const response = JSON.parse(xhr.response);
    let dataPosts = "";
    response.data.forEach((post) => {
      dataPosts += cardCreate({
        title: post.title,
        text: post.text,
        src: post.photo.desktopPhotoUrl,
        tags: post.tags,
      });
    });
    result.innerHTML = dataPosts;

    const pageCount = Math.ceil(response.count / postLimit);
    for (let i = 0; i < pageCount; i++) {
      const link = linkElementCreate(i);
      paginationLinks.insertAdjacentElement("beforeend", link);
      paginationLinks.insertAdjacentHTML("beforeend", "<br>");
    }
    hideLoader();
  };
}
////////////////////////////////////////////////////////////////////////
/////////////////////Функция создания ссылки для пагинации//////////////
function linkElementCreate(page) {
  const link = document.createElement("a");
  link.href = "?page=" + page;
  link.innerText = "Страница №" + (page + 1);
  link.classList.add("link_js");

  let params = getParamsFromLocation();
  if (page === +params.page) {
    link.classList.add("active");
  }
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const links = document.querySelectorAll(".link_js");
    let searchParams = new URLSearchParams(location.search);
    let params = getParamsFromLocation();
    links[params.page].classList.remove("active");
    searchParams.set("page", page);
    console.log(links[page]);
    links[page].classList.add("active");
    history.replaceState(null, document.title, "?" + searchParams.toString());
    getData(getParamsFromLocation());
  });
  return link;
}

/////////////////////////////////////////////////////////////////////
/////////////////////Функция создания верстки карточек///////////////
//////////////////////////////////////////////////////////////////////
function cardCreate({ title, text, src, tags }) {
  return `
  <div class="my-blog__article">
    <div class="my-blog__card">
      <img src="${SERVER_URL}${src}" class="my-blog__card-img" alt="$[title}"></img>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${text}</p>${tags
    .map((tag) => `<span style="color: ${tag.color}">${tag.name}</span>`)
    .join("<br>")}
      </div>
    </div>
  </div> `;
}

////Функция создания тегов(чекбоксов) - не используется//////
// function createTag({ id, name, color }) {
//   return `
//   <div class="filter__tags-group">
//     <input name="tags" type="checkbox" class="filter__check-input" id="tags-${id}" value="${id}">
//     <label style="color: ${color}" class="filter__check-label" for="tags-${id}">${name}</label>
//   </div>`;
// }
