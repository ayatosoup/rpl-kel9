let clickCount = 0;
let images = [
    "/images/cerita1.png",
    "/images/cerita2.png",
    "/images/cerita3.png",
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
