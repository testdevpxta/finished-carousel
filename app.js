let dataVisiblity = "loadData", mappedDataCommented, mappedData;
function fetchImage() {
    if (dataVisiblity == 'loadData') {
        fetch("https://script.google.com/macros/s/AKfycby8xrUcuFUSH48sTIwu48J0AK-DZ1iDttZPIg76W8ZcKdxaz5a6mlkRJrAr807OxpI4IQ/exec")
            .then((response) => response.json())
            .then((json) => {
                const mainData = json.data;
                mappedDataCommented = mainData.map((item, index) => `<!-- <div class="css ${index === 0 ? 'active' : ''}">
            <img class="cssImg" id="zmCssImg" src="https://lh3.googleusercontent.com/d/${item.img_id}"
                alt="">
        </div> -->`);
                mappedData = mainData.map((item, index) => `<div class="css ${index === 0 ? 'active' : ''}">
            <img class="cssImg" id="zmCssImg" src="https://lh3.googleusercontent.com/d/${item.img_id}"
                alt="">
        </div>`)

                let imagePrntDiv = document.getElementById("renderImage");
                let imagePrntDiv2 = document.getElementById("renderImage2");
                imagePrntDiv.innerHTML = mappedData.join('');
                imagePrntDiv2.innerHTML = mappedDataCommented.join('')
                document.getElementById("loaderr").style.display = "none";
                imagePrntDiv.style.display = 'flex';
            })
    }
    else if (dataVisiblity == 'dataOne') {
        let imagePrntDiv = document.getElementById("renderImage");
        let imagePrntDiv2 = document.getElementById("renderImage2");
        imagePrntDiv.innerHTML = mappedData.join('');
        imagePrntDiv2.innerHTML = mappedDataCommented.join('')
    }

    else {
        let imagePrntDiv = document.getElementById("renderImage");
        let imagePrntDiv2 = document.getElementById("renderImage2");
        imagePrntDiv2.innerHTML = mappedData.join('');
        imagePrntDiv.innerHTML = mappedDataCommented.join('')
    };
}
fetchImage()

let currentImageVal = 0;
function nextImage() {
    let images = document.querySelectorAll(".css");
    console.log(currentImageVal);
    if (currentImageVal < images.length - 1) {
        images[currentImageVal].style.display = 'none';
        currentImageVal += 1;
        images[currentImageVal].style.display = 'flex';
    }
    else {
        images[currentImageVal].style.display = 'none';
        currentImageVal = 0;
        images[currentImageVal].style.display = 'flex';
    }
}

function prevImage() {
    let images = document.querySelectorAll(".css");
    if (currentImageVal > 0) {
        images[currentImageVal].style.display = 'none';
        currentImageVal -= 1;
        images[currentImageVal].style.display = 'flex';
    }
}

let startX = 0, endX = 0, delta, msd = document.getElementById("renderImage");

function handleStart(e) {
    startX = e.touches[0].clientX;
}

function handleEnd(e) {
    endX = e.changedTouches[0].clientX;
    delta = endX - startX;

    if (delta < 0) {
        nextImage()
    }
    else if (delta > 0) {
        prevImage()
    }
}

msd.addEventListener('touchstart', handleStart, false);
msd.addEventListener('touchend', handleEnd, false);

let dialogStatus = 'closed';
function openZoomedDialog() {
    let dialog = document.querySelector(".css3"), scale = document.querySelector('meta[name="viewport"]');


    if (dialogStatus == 'closed') {
        scale.setAttribute("content", 'width=device-width, initial-scale=1.0');
        currentImageVal = 0;
        dataVisiblity = "dataTwo";
        fetchImage();
        dialog.style.display = "flex";
        dialogStatus = 'opened';
    }
    else {
        scale.setAttribute("content", 'width=device-width, initial-scale=1.0, maximum-scale= 1.0, user-scalable=no');
        currentImageVal = 0;
        dataVisiblity = "dataOne";
        fetchImage()
        dialog.style.display = "none";
        dialogStatus = 'closed'
    }
}