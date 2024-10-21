const imageInput = document.getElementById("imageInput");
const responseContainer = document.getElementById("responseContainer");
const loadingScreen = document.getElementById("loadingScreen");
const imageDisplay = document.getElementById("imageDisplay");
const displayedImage = document.getElementById("displayedImage");
const errorMessage = document.getElementById("errorMessage");

imageInput.addEventListener("change", function () {
    // Check if a file is selected
    if (imageInput.files.length === 0) {
        errorMessage.textContent = "Please select an image to upload.";
        errorMessage.classList.remove("hidden");
        return;
    }

    // Check the file extension
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".laz", ".las"];
    const fileName = imageInput.files[0].name;
    const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        errorMessage.textContent = "Invalid file extension. Please upload a .jpg, .jpeg, .png, .laz, or .las file.";
        errorMessage.classList.remove("hidden");
        return;
    }

    // Hide the error message if no errors
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");


        // Display the selected image immediately
    const imageUrl = URL.createObjectURL(imageInput.files[0]);
    displayedImage.src = imageUrl;

    // Display the original filename
    const filenameElement = document.getElementById("filename");
    filenameElement.textContent = imageInput.files[0].name; // Set the filename text


    imageDisplay.classList.remove("hidden");
});



document.getElementById("uploadButton").addEventListener("click", function () {
    // Check if a file is selected
    if (imageInput.files.length === 0) {
        errorMessage.textContent = "Please select an image to upload.";
        errorMessage.classList.remove("hidden");
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);

    // Show loading screen
    loadingScreen.classList.remove("hidden");

    // Hide the error message if no errors
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");


  

    // Hide the previously displayed image
    imageDisplay.classList.add("hidden");

    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    const apiUrl = "YOUR_API_ENDPOINT";

    fetch(apiUrl, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            // Hide loading screen
            loadingScreen.classList.add("hidden");

            // Display the JSON response on the webpage
            responseContainer.innerHTML = JSON.stringify(data, null, 2);

            // Remove the displayed image
            displayedImage.src = "";
        })
        .catch((error) => {
            // Hide loading screen on error
            loadingScreen.classList.add("hidden");

            errorMessage.textContent = "An error occurred: " + error.message;
            errorMessage.classList.remove("hidden");

            // Clear the displayed image
            displayedImage.src = "";
        });
});
