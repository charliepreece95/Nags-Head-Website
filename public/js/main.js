const navSlider=()=>{const e=document.querySelector(".toggle"),l=document.querySelector(".nav-links"),s=window.matchMedia("(min-width: 1025px)"),t=window.matchMedia("(max-width: 1025px)");e.addEventListener("click",(()=>{e.classList.toggle("open")?l.style.display="flex":l.style.display="none"})),window.addEventListener("resize",(()=>{s.matches?l.style.display="flex":e.classList.contains("open")?(e.classList.toggle("open"),l.style.display="none"):t.matches&&(l.style.display="none")}))};navSlider();let slideIndex=0;const slideShow=()=>{let e=document.getElementsByClassName("slideshow");for(let l=0;l<e.length;l++)e[l].style.display="none";slideIndex++,slideIndex>e.length&&(slideIndex=1),e[slideIndex-1].style.display="block",setTimeout(slideShow,5e3)};slideShow();let slideIndexNo=1;const showSlides=e=>{let l=document.getElementsByClassName("figure-item"),s=document.getElementsByClassName("article-content");e>l.length&&e>s.length&&(slideIndexNo=1),e<1&&(slideIndexNo=l.length&&s.length);for(let e=0;e<l.length;e++){l[e].style.display="none";for(let e=0;e<s.length;e++)s[e].style.display="none"}l[slideIndexNo-1].style.display="block",s[slideIndexNo-1].style.display="block"},plusSlides=e=>{showSlides(slideIndexNo+=e)},currentSlide=e=>{showSlides(slideIndexNo=e)};showSlides(slideIndexNo);let slideThumbnailIndex=1;const showSlideShow=e=>{let l,s=document.getElementsByClassName("slides"),t=document.getElementsByClassName("thumbnail"),n=document.getElementById("caption");for(e>s.length&&(slideThumbnailIndex=1),e<1&&(slideThumbnailIndex=s.length),l=0;l<s.length;l++)s[l].style.display="none";for(l=0;l<t.length;l++)t[l].className=t[l].className.replace(" active","");s[slideThumbnailIndex-1].style.display="block",t[slideThumbnailIndex-1].className+=" active",n.innerHTML=t[slideThumbnailIndex-1].alt},plusSlideImage=e=>{showSlideShow(slideThumbnailIndex+=e)},currentSlideImage=e=>{showSlideShow(slideThumbnailIndex=e)};showSlideShow(slideThumbnailIndex);const scrollToTop=()=>{let e=document.getElementById("btn-scrolltop");window.onscroll=()=>{l()};const l=()=>{document.body.scrollTop>100||document.documentElement.scrollTop>100?e.style.display="block":e.style.display="none"};e.addEventListener("click",(()=>{document.documentElement.scrollTo({top:0,behavior:"smooth"})}))};scrollToTop();const openForm=()=>{const e=document.querySelector(".toggle"),l=window.matchMedia("(max-width: 1024px)");document.querySelector(".contact-popup").style.display="flex",l.matches&&(e.classList.toggle("open"),document.querySelector(".nav-links").style.display="none")},closeForm=()=>{document.querySelector(".contact-popup").style.display="none",document.getElementById("reset").reset()};