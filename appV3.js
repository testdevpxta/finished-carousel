let mainData,renderImage,renderImage2 = document.getElementById("renderImage2"),mappedData;

fetch("https://script.google.com/macros/s/AKfycby8xrUcuFUSH48sTIwu48J0AK-DZ1iDttZPIg76W8ZcKdxaz5a6mlkRJrAr807OxpI4IQ/exec")
    .then((response) => response.json())
    .then((json) => {
        mainData = json.data;
        mappedData = mainData.map((item) => `<div class="css">
    <img class="cssImg" id="zmCssImg" src="https://lh3.googleusercontent.com/d/${item.img_id}"
        alt="">
    </div>`);

        renderImage = document.getElementById("renderImage");
        document.getElementById('loaderr').style.display = "none";
        renderImage.innerHTML = mappedData.join('');
        renderImage.style.display = "flex";
        document.querySelector(".css").style.display = "flex"
    })

let crntImageVal = 0;
function nextImage() {
    let images = document.querySelectorAll(".css")

    if (crntImageVal < images.length - 1) {
        images[crntImageVal].style.display = "none";
        crntImageVal += 1;
        images[crntImageVal].style.display = "flex";
    }
    else {
        images[crntImageVal].style.display = "none";
        crntImageVal = 0;
        images[crntImageVal].style.display = "flex";
    }
}

function prevImage() {
    let images = document.querySelectorAll(".css");
    if (crntImageVal > 0) {
        images[crntImageVal].style.display = "none";
        crntImageVal -= 1;
        images[crntImageVal].style.display = "flex";
    }
}

let startX = 0, endX = 0, delta, msd = document.getElementById("renderImage");
function handleStart(e) {
    startX = e.touches[0].clientX;
}
function handleEnd(e) {
    endX = e.changedTouches[0].clientX;
    delta = endX - startX;

    delta < 0 ? nextImage() : prevImage();
}

msd.addEventListener('touchstart', handleStart);
msd.addEventListener('touchend', handleEnd)

let dialogStatus = 'closed';
function openZoomedDialog() {
    let dialog = document.querySelector(".css3"), scale = document.querySelector('meta[name="viewport"]');
    if (dialogStatus == 'closed') {
        crntImageVal = 0;
        renderImage.innerHTML = '';
        renderImage2.innerHTML = mappedData.join('');
        scale.setAttribute("content", 'width=device-width, initial-scale=1.0');
        dialog.style.display = "flex";
        dialogStatus = 'opened';
        document.querySelector(".css").style.display = "flex";
    }
    else {
        crntImageVal = 0;
        renderImage.innerHTML = mappedData.join('');
        renderImage2.innerHTML = '';
        scale.setAttribute("content", 'width=device-width, initial-scale=1.0, maximum-scale= 1.0, user-scalable=no');
        dialog.style.display = "none";
        dialogStatus = 'closed'
        document.querySelector(".css").style.display = "flex";
    }
}