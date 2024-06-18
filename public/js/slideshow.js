let clickCount = 0;
let images = [
    "/images/judul (1).png",
    "/images/judul (1).png",
    "/images/judul (3).png",
    "/images/judul (2).png"
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
