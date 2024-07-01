let clickCount = 0;
let images = [
    "/images/cerita11.png",
    "/images/cerita12.png",
    "/images/cerita13.png",
    "/images/cerita14.png",
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
