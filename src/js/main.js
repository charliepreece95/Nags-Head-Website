//Nav slider for mobile and tablet  
const navSlider = () => {
    const toggle = document.querySelector(".toggle");
    const nav = document.querySelector(".nav-links");
    const LgScreen = window.matchMedia("(min-width: 1025px)");
    const smScreen = window.matchMedia("(max-width: 1025px)");

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
      }else if(toggle.classList.contains("open")) {
        toggle.classList.toggle("open");
        nav.style.display = "none";
      }else if(smScreen.matches) {
        nav.style.display = "none";
      }});      
}

//Call Function
navSlider();

//Automated slideshow of images spanning 5 seconds
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

//Call Function
slideShow();

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

//Call Function
showSlides(slideIndexNo);

//static slideshow and clickable thumbnails
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

//Call function
showSlideShow(slideThumbnailIndex);

//ScrollTopTop function
const scrollToTop = () => {
  let btnScrollToTop = document.getElementById("btn-scrolltop");
  window.onscroll = () => {
    //When user scrolls 100px from top, show button
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btnScrollToTop.style.display = "block";
    } else {
      btnScrollToTop.style.display = "none";
    }
  //click event to smooth scroll to top of page
  btnScrollToTop.addEventListener("click", () => {
    document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
    });
  }
}
//Call function
scrollToTop();

//Open contact form
const openForm = () => {
  const toggle = document.querySelector(".toggle");
  const smScreen = window.matchMedia("(max-width: 1024px)");
  //Make contact form visable
  document.querySelector(".contact-popup").style.display = "flex";
  document.querySelector("main").style.opacity = "0.5";
    //close nav-links and reset toggle after opening form if width < 1024px
    if(smScreen.matches) {
      toggle.classList.toggle("open");
      document.querySelector(".nav-links").style.display = "none";
    }
  }  

//Close contact form
const closeForm = () => {
    //change display: flex to none and reset form fields
    document.querySelector(".contact-popup").style.display = "none";
    document.querySelector("main").style.opacity = "1";
    document.getElementById("reset").reset();
}

const Submit = () => {
  //declare and get Id's from HTML 
  let name = document.getElementById("name").value;
  let number = document.getElementById("number").value;
  let textarea = document.getElementById("text").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let dateTime = Date.parse(date + " " + time); //convert date, time strings to a Date format and parse to output in milliseconds
  //new Date(date + " " + time); Gives a GMT date instead in milliseconds
  //prevent cache
  autocomplete = "off";
//prevent form submitting with invalid data
const noSubmit = () => {

  let refuseSubmit = document.querySelector("form");
  //listen to see if user submits invalid data and prevent it
  refuseSubmit.addEventListener("submit", event => {
      event.preventDefault();
      console.log("form not submitted");
  });
}
  //name or number is blank
  if(name === "" || number === "" || textarea === "" || date === "" || time === "") {
         noSubmit();
         document.getElementById("valid").innerHTML = "You must fill all fields \
         before submitting";
  }
  //letters only
  else if(!isNaN(name)) {
          noSubmit(); 
          document.getElementById("valid").innerHTML = "Numbers not allowed in \
          the name field";
  }
  //only allows eleven digits
  else if(number.length < 11 || number.length > 11) {  
          noSubmit(); 
          document.getElementById("valid").innerHTML = "Your number must be \
          11 digits";
  }
  //date of booking has to be an hour ahead of time / 3.6e+6 equats to 1hr 
  else if(dateTime - 3.6e+6 < Date.now()) {
    noSubmit(); 
    document.getElementById("valid").innerHTML = "Make sure you're booking \
    a table in the future and at least an hour ahead of time";
  }
  //data is valid so is submitted
  else {
          //allow data to be submitted
          let submit = document.querySelector("form");
          //submit form click event 
          submit.addEventListener("submit", event => { 
          event.submit();
          });
          setTimeout( function () { location.reload(); }, 3000);
          document.getElementById("valid").innerHTML = "Thank You " + "<strong>" + name.toUpperCase() + "<strong/>";
          console.log("form submitted");
  }
}

//reset book table form
const Clear = () => {
  document.getElementById("btn-cancel").addEventListener("click", () => {
    document.getElementById("clear").reset();
    document.getElementById("valid").innerHTML = "";
  });
}