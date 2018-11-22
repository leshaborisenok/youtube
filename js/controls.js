/*Requare:
    - Main
    + ScreenManager
    + BlockBuilder
    + YoutubeAPILoader
*/
import screenManager from './screenManager';
import blockBuilder from './blockBuilder';
import youtubeAPILoader from './youtubeApiLoader';

class Controls{
	turnPrevPage(){
    if(screenManager.currentPage !== 1){
      const nextPage = screenManager.currentPage - 1;
      this.passSelectedPaginatorItem(nextPage);
      const setOfElements = this.giveSelectedSetOfVideos(nextPage);
      document.querySelector(".main__slider-page").classList.add("move-left");
      this.delayDrawExecution(setOfElements, nextPage, 450);
      }
    }

  turnNextPage(){
  	const nextPage = screenManager.currentPage + 1;
    console.log("current = " + screenManager.currentPage + "   next = " + nextPage);
  	this.passSelectedPaginatorItem(nextPage);
  	const setOfElements = this.giveSelectedSetOfVideos(nextPage);
    document.querySelector(".main__slider-page").classList.add("move-right");
    this.delayDrawExecution(setOfElements, nextPage, 450);
	}

  turnCertainPage(event){
  	if (event.target.parentElement === event.currentTarget) {
    	const nextPage = +event.target.innerHTML;
    	this.passSelectedPaginatorItem(nextPage);
    	const setOfElements = this.giveSelectedSetOfVideos(nextPage);

      if(nextPage > screenManager.currentPage){
        document.querySelector(".main__slider-page").classList.add("move-right");
      } else {
        document.querySelector(".main__slider-page").classList.add("move-left");
      }
      this.delayDrawExecution(setOfElements, nextPage, 450);
  	} else {
    	return;
  	}
	}

  delayDrawExecution(setOfElements, nextPage, time){
    setTimeout(function() { 
      document.querySelector(".main__slider").innerHTML = "";
      blockBuilder.createSetOfVideoDataElements(setOfElements);
      screenManager.currentPage = nextPage;
     }, time);
  }


	clearPreviousResponse(){
  	if(document.querySelector(".main__slider")){
    	document.querySelector(".main__slider").innerHTML = "";
    	youtubeAPILoader.listOfVideos.length = 0;
    	screenManager.currentPage = 1;
    	this.reloadPaginator();
  	}
	}

	reloadPaginator(){
  	this.deselectPaginator();
  	Array.from(document.querySelector(".paginator").children).forEach((item, index) => {
    	item.innerHTML = index + 1;
    		if(index === 0){
      		item.classList.add("paginator__page_current");
    		}
  	});
	}

  deselectPaginator(){
  	Array.from(document.querySelector(".paginator").children).forEach((item) => {
    	if(item.classList.contains("paginator__page_current")){
      	item.classList.remove("paginator__page_current");
    	}
  	});
	}

	giveSelectedSetOfVideos(nextPage = screenManager.currentPage){
  	const nextPageStart = nextPage * screenManager.videosPerPage - screenManager.videosPerPage;
  	const nextPageEnd = nextPageStart + screenManager.videosPerPage;
  	const lastPageNumber = +document.querySelector(".paginator").children[screenManager.pagesPerPage-1].innerHTML;

  	if(screenManager.videosPerPage*(lastPageNumber+1) > youtubeAPILoader.getSetLength()){
    	youtubeAPILoader.makeRequest(youtubeAPILoader.makeNextPageURL());
  	}

  	return youtubeAPILoader.listOfVideos.slice(nextPageStart, nextPageEnd);
	}

	passSelectedPaginatorItem(nextPage){
  	const listOfPages = document.querySelector(".paginator").children;
  	const center = Math.floor(listOfPages.length/2);
  	const centerValue = +listOfPages[center].innerHTML;
  	const pagiatorMiddle = Math.round(listOfPages.length/2);
  	const diff = nextPage - centerValue;
  	this.deselectPaginator();
  	if(nextPage > screenManager.currentPage){
    	if(nextPage <= pagiatorMiddle){
      	listOfPages[nextPage - 1].classList.add("paginator__page_current");
    	} else {
      	Array.from(listOfPages).forEach((item) => {
        	const prevValue = +item.innerHTML;
        	item.innerHTML = prevValue + diff;
      	});
      	listOfPages[center].classList.add("paginator__page_current");
    	}
  	} else {
    	if(nextPage <= pagiatorMiddle){
      	Array.from(listOfPages).forEach((item, i) => {
        	item.innerHTML = i + 1;
      	});
      	listOfPages[nextPage - 1].classList.add("paginator__page_current");
    	} else{
      	Array.from(listOfPages).forEach((item) => {
        	const prevValue = +item.innerHTML;
        	item.innerHTML = prevValue + diff;
      	});
      	listOfPages[center].classList.add("paginator__page_current");
    	}
  	}
	}

	rebuildSlider(){
  	const basicElem = screenManager.videosPerPage*(screenManager.currentPage - 1) + 1;
  	const prevPagesPerPage = screenManager.pagesPerPage;
  	screenManager.defineInitalDisplayProperties();
  	const newPageOfBasicElem = Math.ceil(basicElem/screenManager.videosPerPage);
		const paginator = document.querySelector(".paginator");
  	if(paginator){
    	if(prevPagesPerPage != screenManager.pagesPerPage){
      	paginator.innerHTML = "";
      	blockBuilder.createSetOfNavigatElems(screenManager.pagesPerPage);
    	}

    	this.passSelectedPaginatorItem(newPageOfBasicElem);

    	screenManager.currentPage = newPageOfBasicElem;

    	const setOfElements = this.giveSelectedSetOfVideos();
    	document.querySelector(".main__slider").innerHTML = "";
    	blockBuilder.createSetOfVideoDataElements(setOfElements);
  	}
	}

  controlPagesByKeys(event) {
    const navigationPrev = document.querySelector(".navigation__prev");
		const navigationNext = document.querySelector(".navigation__next");
		const searchInput = document.querySelector(".header__search");
		const searchButton = document.querySelector(".header__search-button");
    const focusedElement = document.activeElement;
    if (event.keyCode === 37) {
      navigationPrev.dispatchEvent(new MouseEvent('click'));
    }
    if (event.keyCode === 39) {
      navigationNext.dispatchEvent(new MouseEvent('click'));
    }
     if (event.keyCode === 13 && focusedElement === searchInput) {
      searchButton.dispatchEvent(new MouseEvent('click'));
    }
  }

	selectWorkingArea() {
  	document.querySelector(".header__title").classList.add("header_color-decoration");
  	document.querySelector(".header__search").classList.add("header_color-decoration");
  	document.querySelector(".header__search").value = '';
  	document.querySelector(".header__highlight").classList.add("header_color-decoration");
	}

	deselectWorkingArea(){
  	document.querySelector(".header__title").classList.remove("header_color-decoration");
  	document.querySelector(".header__search").classList.remove("header_color-decoration");
  	document.querySelector(".header__highlight").classList.remove("header_color-decoration");
	}

}

export default new Controls();