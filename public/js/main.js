//this causes an issue when toggle is clicked twice it'll display:none when resized
const navSlider = () => {
    const toggle = document.querySelector(".toggle");
    const nav = document.querySelector(".nav-links");
    //toggle nav
    //nav.classList.toggle("nav-active");
    toggle.addEventListener("click", () => {
     //toggle animation 
     if(toggle.classList.toggle("open")) {
         nav.style.display = "flex";
     }else {
        nav.style.display = "none";
     }
  });
};

navSlider();

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
