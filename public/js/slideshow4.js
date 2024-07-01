let clickCount = 0;
let images = [
    "/images/cerita8.png",
    "/images/cerita9.png",
    "/images/cerita10.png",
];

document.body.style.backgroundImage = "url('" + images[0] + "')";

function changeBackground() {
    clickCount++;
    
    if (clickCount === images.length) {
        window.location.href = "/gameplay"; 
    } else {
        document.body.style.backgroundImage = "url('" + images[clickCount] + "')";
    }
}
