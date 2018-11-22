class ScreenManager{
  constructor(){
    this.hugeScreen = null;
    this.largeScreen = null;
    this.mediumScreen = null;
    this.smallScreen = null
    this.currentPage = 1;
	  this.videosPerPage = null;
	  this.pagesPerPage = null;
	  this.hugeScreenQuery = '(min-width: 1200px)';
    this.largeScreenQuery = '(min-width: 900px) and (max-width: 1199px)';
    this.mediumScreenQuery = '(min-width: 600px) and (max-width: 899px)';
    this.smallScreenQuery = '(min-width: 300px) and (max-width: 599px)';
  }

  createMediaQueries(){
  	this.hugeScreen = window.matchMedia(this.hugeScreenQuery);
    this.largeScreen = window.matchMedia(this.largeScreenQuery);
    this.mediumScreen = window.matchMedia(this.mediumScreenQuery);
    this.smallScreen = window.matchMedia(this.smallScreenQuery);
  }

  addMediaQueryListeners(redefinePageStructure){
  	this.hugeScreen.addListener(redefinePageStructure);
  	this.largeScreen.addListener(redefinePageStructure);
  	this.mediumScreen.addListener(redefinePageStructure);
  	this.smallScreen.addListener(redefinePageStructure);
  }

  defineInitalDisplayProperties(){
 	if(this.hugeScreen.matches){
      this.videosPerPage = 4;
      this.pagesPerPage = 5;
  	} else if(this.largeScreen.matches){
      this.videosPerPage = 3;
      this.pagesPerPage = 5;
    } else if(this.mediumScreen.matches){
      this.videosPerPage = 2;
      this.pagesPerPage = 5;
    } else if(this.smallScreen.matches){
      this.videosPerPage = 1;
      this.pagesPerPage = 3;
    }
  }
}

export default new ScreenManager();