let clickCount = 0;
let images = [
    "/images/end1.png",
    "/images/end2.png",
    "/images/end3.png",
    "/images/end4.png",
    "/images/end5.png",
    "/images/end6.png",
    "/images/end7.png",
    "/images/end8.png",
    "/images/end9.png",
    "/images/end10.png",
    "/images/end11.png",
];

document.body.style.backgroundImage = "url('" + images[0] + "')";

function changeBackground() {
    clickCount++;
    
    if (clickCount === images.length) {
        window.location.href = "/game"; 
    } else {
        document.body.style.backgroundImage = "url('" + images[clickCount] + "')";
    }
}
