class BlockBuilder{
  createSearchingBlock(){
    const header = document.createElement("header");
    header.classList.add("header");

    const headerTitle = document.createElement("h1");
    headerTitle.classList.add("header__title");
    headerTitle.innerHTML = "gle";

    const headerHighlight = document.createElement("span");
    headerHighlight.classList.add("header__highlight");
    headerHighlight.innerHTML = "You";

    const searchForm = document.createElement("div");
    searchForm.classList.add("search__form");

    const headerSearch = document.createElement("input");
    headerSearch.classList.add("header__search");
    headerSearch.setAttribute("type","text");
    headerSearch.setAttribute("placeholder","Type here");

    const headerSearchButton = document.createElement("button");
    headerSearchButton.classList.add("header__search-button");
    const faIcon = document.createElement("i");
    faIcon.classList.add("fas", "fa-search");

    headerSearchButton.appendChild(faIcon);
    searchForm.appendChild(headerSearch);
    searchForm.appendChild(headerSearchButton);
    headerTitle.prepend(headerHighlight);
    header.appendChild(headerTitle);
    header.appendChild(searchForm);

    document.body.appendChild(header);
  }

  createMainBlock(){
    const main = document.createElement("main");
    main.classList.add("main");

    const mainSlider = document.createElement("div");
    mainSlider.classList.add("main__slider");

    const mainNavigation = this.createNavigation();
    main.appendChild(mainSlider);
    main.appendChild(mainNavigation);

    document.body.appendChild(main);
  }

  createNavigation(){
    const mainNavigation = document.createElement("div");
    mainNavigation.classList.add("main__navigation");

    const navigationPrev = document.createElement("button");
    navigationPrev.classList.add("navigation__prev", "navigation__button");
    navigationPrev.innerHTML = "Prev";
    const navigationNext = document.createElement("button");
    navigationNext.classList.add("navigation__next", "navigation__button");
    navigationNext.innerHTML = "Next";

    const mainPaginator = document.createElement("ul");
    mainPaginator.classList.add("paginator");

    mainNavigation.appendChild(navigationPrev);
    mainNavigation.appendChild(mainPaginator);
    mainNavigation.appendChild(navigationNext);

    return mainNavigation;
  }

  createVideoDataElement(data) {
    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider__item");

    const videoLink =  document.createElement("a");
    videoLink.classList.add("item__link");
    videoLink.setAttribute("href", "https://www.youtube.com/watch?v=" + data.id);
    videoLink.setAttribute("draggable", 'false');
    videoLink.setAttribute("target", '_blank');

    const itemImg = document.createElement("img");
    const imgSrc = data.snippet.thumbnails.medium.url;
    itemImg.classList.add("item__image");
    itemImg.setAttribute("src", imgSrc);
    itemImg.setAttribute("draggable", 'false');

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item__container");

    const itemTitle = document.createElement("h2");
    itemTitle.classList.add("item__title");
    itemTitle.innerHTML = data.snippet.title;

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item__info");

    const itemAuthor = document.createElement("span");
    itemAuthor.classList.add("item__author");
    itemAuthor.innerHTML = data.snippet.channelTitle;

    const itemDate = document.createElement("span");
    itemDate.classList.add("item__date");
    itemDate.innerHTML = new Date(Date.parse(data.snippet.publishedAt)).toDateString();

    const itemDescription = document.createElement("p");
    itemDescription.classList.add("item__description");
    itemDescription.innerHTML = data.snippet.description;

    const itemStatistic = document.createElement("ul");
    itemStatistic.classList.add("item__statistic");

    const itemLikes = document.createElement("li");
    itemLikes.classList.add("item__likes", 'item__count');
    itemLikes.innerHTML = data.statistics.likeCount;
    const itemDislikes = document.createElement("li");
    itemDislikes.classList.add("item__dislikes", 'item__count');
    itemDislikes.innerHTML = data.statistics.dislikeCount;
    const itemViews = document.createElement("li");
    itemViews.classList.add("item__views", 'item__count');
    itemViews.innerHTML = data.statistics.viewCount;
 
    itemInfo.appendChild(itemAuthor);
    itemInfo.appendChild(itemDate);

    itemStatistic.appendChild(itemLikes);
    itemStatistic.appendChild(itemDislikes);
    itemStatistic.appendChild(itemViews);

    videoLink.appendChild(itemImg);

    itemContainer.appendChild(itemTitle);
    itemContainer.appendChild(itemInfo);
    itemContainer.appendChild(itemDescription);
    itemContainer.appendChild(itemStatistic);

    sliderItem.appendChild(videoLink);
    sliderItem.appendChild(itemContainer);

    return sliderItem;
  }

  createSetOfVideoDataElements(elems) {
    const numberOfElems = elems.length;

    const mainSliderPage = document.createElement("div");
    mainSliderPage.classList.add("main__slider-page");

    for(let i = 0; i < numberOfElems; i++){
      const item = this.createVideoDataElement(elems[i]);
       mainSliderPage.appendChild(item);
    }

    document.querySelector(".main__slider").appendChild(mainSliderPage);
  }

  createSetOfNavigatElems(number){
    const elemsContainer = document.createDocumentFragment();
    const paginatorPage = document.createElement("li");
    paginatorPage.classList.add("paginator__page");
    for(let i = 0; i < number; i++){
      const paginatorItem =  paginatorPage.cloneNode(true);
      paginatorItem.innerHTML = i + 1;

      if(i === 0)
        paginatorItem.classList.add("paginator__page_current");

      elemsContainer.appendChild(paginatorItem);
    }

     document.querySelector(".paginator").appendChild(elemsContainer);
  }

}

export default new BlockBuilder();

