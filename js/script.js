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


// Fetch instagram feeds
fetch("https://legit-ink-tattoo.onrender.com/api/v1/instafeed/")
.then(response => {return response.json()})
.then(
    data => {
        const container = document.getElementById("instafeed-container");

        data.data.slice(0, 6).forEach(post => {
            const postWrapper = document.createElement("div");
            postWrapper.classList.add("insta-post");

            const instaPostLink = document.createElement("a");
            instaPostLink.href = post.permalink;
            instaPostLink.target = "_blank";
            instaPostLink.rel = "noopener noreferrer";

            let instaMedia;

            if (post.media_type === "VIDEO") {
                instaMedia = document.createElement("video");
                instaMedia.src = post.media_url;
                instaMedia.controls = false;
                instaMedia.autoplay = true;
                instaMedia.muted = true;
                instaMedia.loop = true;
                instaMedia.playsInline = true;
            } else {
                instaMedia = document.createElement("img");
                instaMedia.src = post.media_url;
                instaMedia.loading = "lazy";
            }

            instaMedia.classList.add("insta-post-media");            

            const overlay = document.createElement("div");
            overlay.classList.add("overlay");

            const overlayLink = document.createElement("a");
            overlayLink.href = post.permalink;
            overlayLink.target = "_blank";
            overlayLink.rel = "noopener noreferrer";
            overlayLink.classList.add("overlayLink");

            const instaIcon = document.createElement("img");
            instaIcon.src = "../assets/icons/icons8-instagram-50.png";
            instaIcon.alt = "Instagram Icon";
            instaIcon.classList.add("insta-icon");

            overlayLink.appendChild(instaIcon);
            overlay.appendChild(overlayLink);

            postWrapper.appendChild(instaMedia);
            postWrapper.appendChild(overlay);
            instaPostLink.appendChild(postWrapper);

            container.appendChild(instaPostLink);
        });
    }
)
.catch(err => console.error("Fetch error:", err));


// Form submission
bookingForm = document.querySelectorAll(".form_req")

bookingForm.forEach((form) => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        // Convert FormData to plain object
        const payload = Object.fromEntries(formData.entries());

        try{
            const response = await fetch(
                "https://legit-ink-tattoo.onrender.com/api/v1/send-booking-mail/",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.detail || "Booking failed");
            }

            alert("Booking submitted successfully");
            form.reset();

        } catch (err){
            console.error("Booking error:", err);
            alert("Something went wrong. Please try again.")
        }
    });
});