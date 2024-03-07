// let parentElement = document.querySelector('.css1');

// parentElement.firstElementChild.style.display = "block"

function loadedImages() {
    fetch('https://script.google.com/macros/s/AKfycbx6RKT5D7d85qP8kdCSGQ9FLSrQSYGiSXmVB0swAG8A3bn_VwHB-DahBXuGNn1wezztHA/exec')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let imgIdCount = data.data.length;
            console.log(imgIdCount)
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
            imgIdCount <= 1 ? document.getElementById("nextBtn").style.display = "none" : document.getElementById("nextBtn").style.display = "flex";
            // if (imgIdCount === 1) {
            //     document.querySelector(".carouselbtns").style.display = "none"
            // }
            // else {
            //     document.querySelector(".carouselbtns").style.display = "flex"
            // }
        })
        .catch(error => {
            document.querySelector(".css2").style.display = "none";
            console.log(error.message)
        })
}

loadedImages()

let imageVal = 0;
function imageSwitch(a) {
    if (imageVal > -1 || a.value == "next") {
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

let interval = setInterval(imageSwitch, 8000);
// let loopValue = 1;
// function loop() {
//     if (loopValue === 1) {
//         console.log(loopValue);
//         clearInterval(interval);
//         loopValue = 0;
//     }
//     else if (loopValue === 0) {
//         console.log(loopValue);
//         interval = setInterval(imageSwitch, 8000);
//         loopValue = 1;
//     }
// }

let imageStatus = "NotZoomed";
const imageZoom = () => {
    let images = document.querySelectorAll(".cssImg");
    let imageOutter = document.querySelector(".css1");
    let zoomBtn = document.getElementById("zoomBtn")

    if (imageStatus === "NotZoomed") {
        imageOutter.style.height = "320px"
        images.forEach((e) => {
            e.style.width = "250%";
            zoomBtn.innerHTML = `<svg width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z"/></svg>`
        })
        loopValue = 0;
        clearInterval(interval)
        imageStatus = "Zoomed";
    } else if (imageStatus === "Zoomed") {
        imageOutter.style.height = "220px"
        images.forEach((e) => {
            e.style.width = "100%";
            zoomBtn.innerHTML = `<svg width="15px"
            height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z" />
            </svg>`

        })
        loopValue = 1;
        interval = setInterval(imageSwitch, 5000);
        imageStatus = "NotZoomed";
    }

}
