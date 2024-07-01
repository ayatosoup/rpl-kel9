let clickCount = 0;
let images = [
    "/images/cerita4.png",
    "/images/cerita5.png",
    "/images/cetita6.png",
    "/images/cerita7.png"
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
