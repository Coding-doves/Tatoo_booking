// Navigation section
const menu = document.getElementById("menu");
const menuDisplay = document.querySelector("header nav ul");
const menuIcon = document.querySelector(".menu-icon");

menu.addEventListener('click', () => {
    let isOpen = menuDisplay.classList.toggle('clicked');
    
    menuIcon.src = isOpen ? "./assets/icons/collapse_all.svg" : "./assets/icons/mobile_menu.svg";

    menu.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );
    menu.setAttribute(
        "title",
        isOpen ? "Close menu" : "Open menu"
    );
});


// Slider section
const slideContainer = document.getElementById("slide-container");
const nxtbtn = document.getElementById("nxt");
const prvbtn = document.getElementById("prv");

function nextSlide(){
    // Get first div
    const current = slideContainer.firstElementChild;
    // Remove animation
    current.classList.remove("active");
    // Hidden it behind other divs
    slideContainer.append(current);

    // Activate animation for the current front div
    slideContainer.firstElementChild.classList.add("active");
}

function previousSlide(){
    // Get first div
    const current = slideContainer.firstElementChild;
    // Remove animation
    current.classList.remove("active");
    // Get the last div, place it in front
    slideContainer.prepend(slideContainer.lastElementChild);
    // Activate animation for the current front div
    slideContainer.firstElementChild.classList.add("active")
}
// Automatic slide
let autoSlide = setInterval(nextSlide, 5000);

// Reset timer after next and prev buttons are click
function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}
const banner = document.querySelector(".banner");
// Pause slide on hover
banner.addEventListener("mouseenter", () => clearInterval(autoSlide));

banner.addEventListener("mouseleave", () => resetTimer()
);

// Slider maunal control
nxtbtn.addEventListener("click", () => {
    nextSlide();
    resetTimer();
});

prvbtn.addEventListener("click", () => {
    previousSlide();
    resetTimer();
});


const formSubmit = document.getElementById('submit');

formSubmit.addEventListener('click', () => {
    alert("Booking via mail is currently not avaliable. Please book via whatsapp of or via web");
})
