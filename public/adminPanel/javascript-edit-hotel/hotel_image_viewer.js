
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[n].style.display = "block";
}

// Open the thumb Image
function openThumb() {
    document.getElementById("thumbImg").style.display = "block";
}

// Close the thumb image
function closeThumb() {
    document.getElementById("thumbImg").style.display = "none";
}

function showThumb(n) {
    var i;
    var slides = document.getElementsByClassName("thumbImgCurrent");

    slides[n].style.display = "block";
}