let searchButton;
let searchInput;
let mainSlider;
let paginator;
import youtubeAPILoader from "./youtubeApiLoader";
import screenManager from './screenManager';
import blockBuilder from './blockBuilder';
import controls from './controls';
import swipe from './swipe';
let innitSearch = false;

window.onload = function() {
  blockBuilder.createSearchingBlock();
  searchButton = document.querySelector(".header__search-button");
  searchInput = document.querySelector(".header__search");

  screenManager.createMediaQueries();
  screenManager.addMediaQueryListeners(defineSizeListener);
  screenManager.defineInitalDisplayProperties();

  window.addEventListener('keydown', controls.controlPagesByKeys);

  searchButton.addEventListener("click", processNewUserRequest);
  searchButton.addEventListener('keydown', controls.controlPagesByKeys);
  searchInput.addEventListener("focus", controls.selectWorkingArea);
  searchInput.addEventListener("blur", controls.deselectWorkingArea);
}


function processNewUserRequest() {
  controls.clearPreviousResponse();

  if(!innitSearch){
    innitSearch = true;
    blockBuilder.createMainBlock();
    mainSlider = document.querySelector(".main__slider");
    paginator = document.querySelector(".paginator");
    blockBuilder.createSetOfNavigatElems(screenManager.pagesPerPage);
    initEventListeners();
  }

  const userInput = searchInput.value;
  const searchRequestUrl = youtubeAPILoader.makeSearchURL("search", "snippet", "video", userInput);
  let callback = blockBuilder.createSetOfVideoDataElements.bind(blockBuilder);
  youtubeAPILoader.makeRequest(searchRequestUrl, callback);
}

function initEventListeners(){
  const navigationPrev = document.querySelector(".navigation__prev");
  const navigationNext = document.querySelector(".navigation__next");

  const turnPrevCallback = controls.turnPrevPage.bind(controls);
  const turnNextCallback = controls.turnNextPage.bind(controls);
  const turnCertainCallback = controls.turnCertainPage.bind(controls);

  navigationPrev.addEventListener("click", turnPrevCallback);
  navigationNext.addEventListener("click", turnNextCallback);
  paginator.addEventListener("click", turnCertainCallback);

  /*Swipe adding*/

  mainSlider.addEventListener("mousedown", swipe.downEvent.bind(swipe));
  mainSlider.addEventListener("mouseup", swipe.upEvent.bind(swipe));
  mainSlider.addEventListener("touchstart", swipe.downEvent.bind(swipe));
  mainSlider.addEventListener("touchend", swipe.upEvent.bind(swipe));
}

function defineSizeListener(e){
  if(e.matches){
    controls.rebuildSlider();
  }
}
