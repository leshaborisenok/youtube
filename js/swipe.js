class Swipe{
  constructor(){
    this.startX = 0;
    this.endX = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.swipeMinLength = 100;
    this.swipeMaxDuration = 800;
  }

  downEvent(e){
    this.startTime = Date.now();
    this.startX = e.clientX || e.changedTouches[0].clientX;
  }

  upEvent(e){
    this.endX =  e.clientX || e.changedTouches[0].clientX;
    this.endTime = Date.now();
    const swipeLenght = this.endX - this.startX;
    const swipeDuration = this.endTime - this.startTime;
    console.log(swipeDuration);

  
    if(swipeLenght < -this.swipeMinLength && swipeDuration < this.swipeMaxDuration){
      document.querySelector(".navigation__next").dispatchEvent(new MouseEvent('click'));
    }

    if(swipeLenght > +this.swipeMinLength && swipeDuration < this.swipeMaxDuration){
      document.querySelector(".navigation__prev").dispatchEvent(new MouseEvent('click'));
   }
  }
}

export default new Swipe();