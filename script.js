document.getElementById("save-button").addEventListener("click", saveValues);

function saveValues() {
    // Save the grid and image values
    const outerGridColumns = document.getElementById("outer-grid-columns").value;
    const outerGridRows = document.getElementById("outer-grid-rows").value;
    const innerGridColumns = document.getElementById("inner-grid-columns").value;
    const innerGridRows = document.getElementById("inner-grid-rows").value;
    const uploadedFile = document.getElementById("image-upload").files[0];

    if (!uploadedFile) {
        alert("Please upload an image before saving.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById("uploaded-image").src = reader.result;

        // Show the image and buttons
        document.querySelector(".image-container").style.display = "flex";
        document.querySelector(".upload-box").style.display = "none";
    };
    reader.readAsDataURL(uploadedFile);

    // Save values for later use (can be sent to a back-end server if needed)
    console.log({
        outerGridColumns,
        outerGridRows,
        innerGridColumns,
        innerGridRows,
    });
}

function manipulateImage(action) {
    const image = document.getElementById("uploaded-image");

    // Example actions (extend as needed)
    switch (action) {
        case "rotate":
            image.style.transform = "rotate(90deg)";
            break;
        case "grayscale":
            image.style.filter = "grayscale(100%)";
            break;
        case "invert":
            image.style.filter = "invert(100%)";
            break;
    }
}
