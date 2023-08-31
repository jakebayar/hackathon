// listen for button click

// take value from url and key 

// store to storage as k:v 

document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.querySelector('#submitbutton');
    console.log(saveButton);

    saveButton.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('click');

        const url = document.getElementById('url').value;
        const key = document.getElementById('key').value;

        if (url && key) {
            let obj = {};
            obj[key] = url;

            chrome.storage.local.set(obj, function () {
                console.log(`Saved: ${key} : ${url}`);

                chrome.storage.local.get(key, function (result) {
                    console.log(result);
                });
                // Clear the input fields
                url.value = '';
                key.value = '';

                // Display success message in the popup
                const messageElement = document.getElementById('successMessage'); // Assuming you've added an element with this ID to display the message
                messageElement.textContent = "Saved successfully!";
                messageElement.style.display = "block";

                // Hide the success message after a short delay, if desired
                setTimeout(() => {
                    messageElement.style.display = "none";
                }, 3000); // Hides after 3 seconds

            });
        }


    });
});
