// let parentElement = document.querySelector('.css1');

// parentElement.firstElementChild.style.display = "block"

function loadedImages() {
    fetch('https://script.google.com/macros/s/AKfycbx6RKT5D7d85qP8kdCSGQ9FLSrQSYGiSXmVB0swAG8A3bn_VwHB-DahBXuGNn1wezztHA/exec')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let layout = '';
            data.data.forEach(function (item, index) {
                let imageID = item.img_id;
                layout += `
                <div class="css ${index === 0 ? 'active' : ''}">
                    <img class="cssImg" src="https://lh3.googleusercontent.com/d/${imageID}"
                        alt="">
                </div>`;
            });
            document.getElementById("loaderr").style.display = "none";
            document.getElementById("renderImage").innerHTML = layout;
            document.getElementById("renderImage").style.display = "block";
            document.querySelector(".carouselbtns").style.display = "block"
        })
        .catch(error => {
            document.querySelector(".css2").style.display = "none";
            console.log(error.message)
        })
}

loadedImages()

let imageVal = 0;
function imageSwitch(a) {
    if (imageVal > -1) {
        let imgNum = document.querySelectorAll(".css").length;
        let currentImage = document.querySelectorAll(".css")[imageVal];
        let nextImage = document.querySelectorAll(".css")[imageVal + 1];

        if (imageVal < imgNum - 1) {
            currentImage.style.display = "none";
            nextImage.style.display = "flex";
            imageVal += 1;
        }
        else {
            imageVal = 0;
            document.querySelectorAll(".css")[imgNum - 1].style.display = "none";
            document.querySelectorAll(".css")[0].style.display = "flex";
        }
    }
    else if (a.value == "next") {
        let imgNum = document.querySelectorAll(".css").length;
        let currentImage = document.querySelectorAll(".css")[imageVal];
        let nextImage = document.querySelectorAll(".css")[imageVal + 1];

        if (imageVal < imgNum - 1) {
            currentImage.style.display = "none";
            nextImage.style.display = "flex";
            imageVal += 1;
        }
        else {
            imageVal = 0;
            document.querySelectorAll(".css")[imgNum - 1].style.display = "none";
            document.querySelectorAll(".css")[0].style.display = "flex";
        }
    }
}

let interval = setInterval(imageSwitch, 5000)
function loop() {
    let img = document.querySelector(".css2")

    img.addEventListener("mousedown", function () {
        clearInterval(interval)
    })
    img.addEventListener("mouseup", function () {
        interval = setInterval(imageSwitch, 5000)
    })
}
loop()

let imageStatus = "NotZoomed";
const imageZoom = () => {
    let images = document.querySelectorAll(".cssImg");
    let imageOutter = document.querySelector(".css1");
    let zoomBtn = document.getElementById("zoomBtn")

    if (imageStatus === "NotZoomed") {
        imageOutter.style.height = "320px"
        images.forEach((e) => {
            e.style.width = "250%";
            clearInterval(interval)
            zoomBtn.innerHTML = "Zoom Out"
        })
        imageStatus = "Zoomed";
    } else if (imageStatus === "Zoomed") {
        imageOutter.style.height = "220px"
        images.forEach((e) => {
            e.style.width = "100%";
            interval = setInterval(imageSwitch, 5000);
            zoomBtn.innerHTML = "Zoom In"

        })
        imageStatus = "NotZoomed";
    }

}