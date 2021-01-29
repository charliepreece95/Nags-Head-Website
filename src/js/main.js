//const { reset } = require("browser-sync");

//Nav slider for mobile and tablet  
const navSlider = () => {
    const toggle = document.querySelector(".toggle");
    const nav = document.querySelector(".nav-links");
    const LgScreen = window.matchMedia("(min-width: 1024px)");
  
    //toggle nav
    toggle.addEventListener("click", () => {
      //toggle animation 
      if(toggle.classList.toggle("open")) {
          nav.style.display = "flex";
      }else {
          nav.style.display = "none";
      }
  });
    //override toggle to display nav as flex on desktop when resized.
    window.addEventListener("resize", () => {
      if(LgScreen.matches) {
        nav.style.display = "flex";
      } else {
        nav.style.display = "none";
      }
  });
};

navSlider();
/*
const resize = () => {
  window.addEventListener("resize", () => {
  const file = location.pathname.split( "./css" ).pop();
  const x = window.watchMedia("(min-width: 320px) and (max-width: 320px)");
  if(x.matches) {
    const link = document.createElement( "link" );
    link.href = file.substr( 0, file.lastIndexOf(".") ) + ".css";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
  }
 document.getElementsByTagName( "head" )[0].appendChild(link);
});};

resize();
*/

//New function

//Automated slideshow of images spanning 3 seconds
let slideIndex = 0;

const slideShow = () => {
    let slides = document.getElementsByClassName("slideshow");
    for (let i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(slideShow, 5000); // Change image every 5 seconds
}

slideShow();

//New function

//Manual slideshow with toggle buttons
let slideIndexNo = 1;

const showSlides = (toggle) => {
  let slides = document.getElementsByClassName("figure-item");
  let content = document.getElementsByClassName("article-content");
  if (toggle > slides.length && toggle > content.length) {slideIndexNo = 1}
  if (toggle < 1) {slideIndexNo = slides.length && content.length} 
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      for (let j = 0; j < content.length; j++) {
        content[j].style.display = "none";
      }
    }
  slides[slideIndexNo-1].style.display = "block";
  content[slideIndexNo-1].style.display = "block";
}

// Next/previous controls
const plusSlides = (toggle) => {
    showSlides(slideIndexNo += toggle);
  }
  // Thumbnail image controls
  const currentSlide = (toggle) => {
    showSlides(slideIndexNo = toggle);
  }

showSlides(slideIndexNo);

//New function

let slideThumbnailIndex = 1;


const showSlideShow = (n) => {
  let i;
  let slides = document.getElementsByClassName("slides");
  let thumbnails = document.getElementsByClassName("thumbnail");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideThumbnailIndex = 1}
  if (n < 1) {slideThumbnailIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < thumbnails.length; i++) {
    thumbnails[i].className = thumbnails[i].className.replace(" active", "");
  }
  slides[slideThumbnailIndex-1].style.display = "block";
  thumbnails[slideThumbnailIndex-1].className += " active";
  captionText.innerHTML = thumbnails[slideThumbnailIndex-1].alt;
}

// Next/previous controls
const plusSlideImage = (n) => {
  showSlideShow(slideThumbnailIndex += n);
}

// Thumbnail image controls
const currentSlideImage = (n) => {
  showSlideShow(slideThumbnailIndex = n);
}

showSlideShow(slideThumbnailIndex);

const scrollToTop = () => {
  let btnScrollToTop = document.getElementById("btn-scrolltop");
  window.onscroll = () => {
    //When user scrolls 100px from top, show button
    scrollFunction();
  }
  const scrollFunction = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btnScrollToTop.style.display = "block";
    } else {
      btnScrollToTop.style.display = "none";
    }
  }
  //click event to smooth scroll to top of page
  btnScrollToTop.addEventListener("click", () => {
    document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
  });
}

scrollToTop();