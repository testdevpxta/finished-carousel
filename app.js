// let parentElement = document.querySelector('.css1');

// parentElement.firstElementChild.style.display = "block"

function loadedImages() {
    fetch('https://script.google.com/macros/s/AKfycby8xrUcuFUSH48sTIwu48J0AK-DZ1iDttZPIg76W8ZcKdxaz5a6mlkRJrAr807OxpI4IQ/exec')
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
                    <img class="cssImg" id="zmCssImg" src="https://lh3.googleusercontent.com/d/${imageID}"
                        alt="">
                </div>`;
            });
            document.getElementById("loaderr").style.display = "none";
            document.getElementById("renderImage").innerHTML = layout;
            document.getElementById("renderImage2").innerHTML = layout;
            document.getElementById("renderImage").style.display = "block";
            document.querySelector(".carouselbtns").style.display = "block"
            imgIdCount <= 1 ? document.getElementById("nextBtn").style.display = "none" : document.getElementById("nextBtn").style.display = "flex";
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
        let imgNum = document.querySelectorAll(".css2 .css").length;
        let currentImage = document.querySelectorAll(".css2  .css")[imageVal];
        let nextImage = document.querySelectorAll(".css2  .css")[imageVal + 1];

        if (imageVal < imgNum - 1) {
            currentImage.style.display = "none";
            nextImage.style.display = "flex";
            imageVal += 1;
        }
        else {
            imageVal = 0;
            document.querySelectorAll(".css2  .css")[imgNum - 1].style.display = "none";
            document.querySelectorAll(".css2  .css")[0].style.display = "flex";
        }
    }
}

let imageVal2 = 0;
function imageSwitchAlbum(a) {
    if (a.value == "next") {
        let imgNum = document.querySelectorAll(".css3 .css").length;
        let currentImage = document.querySelectorAll(".css3 .css")[imageVal2];
        let nextImage = document.querySelectorAll(".css3 .css")[imageVal2 + 1];

        if (imageVal2 < imgNum - 1) {
            currentImage.style.display = "none";
            nextImage.style.display = "flex";
            imageVal2 += 1;
        }
        else {
            imageVal2 = 0;
            document.querySelectorAll(".css3 .css")[imgNum - 1].style.display = "none";
            document.querySelectorAll(".css3 .css")[0].style.display = "flex";
        }
    }
    else if (a.value == "prev") {
        let currentImage = document.querySelectorAll(".css3  .css")[imageVal2];
        let prevImage = document.querySelectorAll(".css3  .css")[imageVal2 - 1];

        if (imageVal2 > 0) {
            currentImage.style.display = "none";
            prevImage.style.display = "flex";
            imageVal2 -= 1;
        }
    }
}

function openZoomView(a) {
    let view = document.querySelector(".css3");
    let img = document.querySelectorAll(".css3 .cssImg")
    let scale = document.querySelector('meta[name="viewport"]')
    let full_btn = document.querySelector(".css3_fullview");

    if (a.value == "open") {
        view.style.display = "flex";
        // scale.setAttribute("content", 'width=device-width, initial-scale=1.0');

    }
    else if (a.value == "close") {
        view.style.display = "none";
        // scale.setAttribute("content", 'width=device-width, initial-scale=1.0, maximum-scale= 1.0, user-scalable=no');

    }
    else if (a.value == "small") {
        img.forEach((item) => {
            item.style.width = "350%";
            full_btn.innerHTML = "Small Screen View"
            a.value = "full";
        })
    }
    else if (a.value == "full") {
        img.forEach((item) => {
            item.style.width = "100%";
            full_btn.innerHTML = "Full Screen View"
            a.value = "small";
        })
    }
    changeScale()
}

let interval = setInterval(imageSwitch, 8000);

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
        interval = setInterval(imageSwitch, 5000);
        imageStatus = "NotZoomed";
    }

}

// const changeScale = () => {
//     let scale = document.querySelector('meta[name="viewport"]')
//     let disable = "width=device-width, initial-scale=1.0"

//     scale.setAttribute("content", disable)
// }

// const changeScale = () => {
//     let scale = document.getElementsByTagName('meta')["viewport"].content
//     // let disable = "width=device-width, initial-scale=1.0"

//    scale = "width=device-width, initial-scale=1.0"
// }

function enableImgZoom() {
    let scale = document.querySelector('meta[name="viewport"]')
    var imageContainer =  document.getElementById("renderImage");

    // Initialize Hammer.js on the image container
    var mc = new Hammer.Manager(imageContainer);

    // Enable pinch to zoom
    mc.add(new Hammer.Pinch());

    // Add event listener for pinch events
    mc.on('pinch', function (ev) {
        // Scale the image based on pinch gesture
        // var scale = Math.max(1, Math.min(ev.scale, 4));
        var scale = ev.scale;
        imageContainer.style.transform = 'scale(' + scale + ')';
        scale.setAttribute("content", 'width=device-width, initial-scale=1.0');
        clearInterval(interval)
    });

    // Reset image scale when pinch ends
    mc.on('pinchend', function () {
        imageContainer.style.transform = 'scale(1)';
        scale.setAttribute("content", 'width=device-width, initial-scale=1.0, maximum-scale= 1.0, user-scalable=no');
        interval = setInterval(imageSwitch, 5000);
    });
}

 enableImgZoom()
