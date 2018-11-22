/*Requare:
    - Controls
*/
import controls from './controls';

class YoutubeAPILoader{
  constructor(){
    this.KEY = "AIzaSyCouAADWroSP9SX23a5KMzQlVa6X46fLJ4";
    this.URL = "https://www.googleapis.com/youtube/v3/";
    this.maxResults = 15;
    this.prevPage = null;
    this.nextPage = null;
    this.searchRequest = null;
    this.statisticRequest = null;
    this.listOfVideos = [];
    this.listOfVideosId = null;
  }

  makeSearchURL(purpose, part, type, q){
    this.searchRequest = `${this.URL+purpose}?key=${this.KEY}&part=${part}&type=${type}&maxResults=${this.maxResults}&q=${q}`;
    return this.searchRequest;
  }

  makeStatisticURL(purpose, part){
    this.statisticRequest = `${this.URL+purpose}?key=${this.KEY}&part=${part}&id=${this.listOfVideosId.join()}`;
    return this.statisticRequest;
  }

  makeRequest(searchRequestUrl, callback){
    const that = this;
    fetch(searchRequestUrl).
    then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      that.setListOfVidiosId(data.items);
      that.nextPage = data.nextPageToken;
      const url = that.makeStatisticURL("videos", "snippet,statistics");
      console.log(url);
      return fetch(url);
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      that.addResponsDataToList(data.items);
      if(callback){
        const setOfElements = controls.giveSelectedSetOfVideos();
        callback(setOfElements);
      }
    }).catch(function(error) {
      console.log('Request failed', error)
    })
  }

  setListOfVidiosId(responsList) {
    this.listOfVideosId = responsList.map((item) => {
      return item.id.videoId;
    });
  }

  addResponsDataToList(responsList) {
    this.listOfVideos.push(...responsList);
  }

  makePrevPageURL(){
    return this.searchRequest + `&pageToken=${this.prevPage}`;
  }

  makeNextPageURL(){
    return this.searchRequest + `&pageToken=${this.nextPage}`;
  }

  getSetLength(){
    return this.listOfVideos.length;
  }
}

export default new YoutubeAPILoader();
