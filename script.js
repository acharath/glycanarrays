document.getElementById("save-button").addEventListener("click", saveValues);

function saveValues() {
    const outerGridColumns = document.getElementById("outer-grid-columns").value;
    const outerGridRows = document.getElementById("outer-grid-rows").value;
    const innerGridColumns = document.getElementById("inner-grid-columns").value;
    const innerGridRows = document.getElementById("inner-grid-rows").value;
    const uploadedFile = document.getElementById("image-upload").files[0];
    
    if (!uploadedFile) {
        alert("Please upload an image before saving.");
        return;
    }

    if (
        !outerGridColumns || isNaN(outerGridColumns) || outerGridColumns <= 0 ||
        !outerGridRows || isNaN(outerGridRows) || outerGridRows <= 0 ||
        !innerGridColumns || isNaN(innerGridColumns) || innerGridColumns <= 0 ||
        !innerGridRows || isNaN(innerGridRows) || innerGridRows <= 0
    ) {
        alert("Please enter valid positive numbers for all grid dimensions.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById("uploaded-image").src = reader.result;

        document.querySelector(".image-container").style.display = "flex";
        document.querySelector(".upload-box").style.display = "none";
    };
    reader.readAsDataURL(uploadedFile);

    console.log({
        outerGridColumns,
        outerGridRows,
        innerGridColumns,
        innerGridRows,
    });
}

function manipulateImage(action) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = document.getElementById("uploaded-image");

    if (!image || !image.src) return;

    // Load the image onto the canvas only once for pixel manipulations
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    ctx.drawImage(image, 0, 0);

    switch (action) {
        case "grayscale":
            // Apply grayscale filter using CSS
            image.style.filter = "grayscale(100%)";
            break;

        case "invert":
            // Apply invert filter using CSS
            image.style.filter = "invert(100%)";
            break;

        case "mean-thresholding":
            // Get the image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Calculate the mean intensity
            let totalIntensity = 0;
            for (let i = 0; i < data.length; i += 4) {
                const intensity = (data[i] + data[i + 1] + data[i + 2]) / 3; // Average RGB
                totalIntensity += intensity;
            }
            const meanIntensity = totalIntensity / (data.length / 4);

            // Apply mean thresholding
            for (let i = 0; i < data.length; i += 4) {
                const intensity = (data[i] + data[i + 1] + data[i + 2]) / 3; // Average RGB
                const value = intensity > meanIntensity ? 255 : 0; // Threshold
                data[i] = data[i + 1] = data[i + 2] = value; // Apply threshold
                data[i + 3] = 255; // Fully opaque
            }

            // Update the canvas with thresholded data
            ctx.putImageData(imageData, 0, 0);

            // Replace the displayed image with the processed canvas
            image.src = canvas.toDataURL();
            break;

        default:
            console.warn(`Unknown action: ${action}`);
            break;
    }
}