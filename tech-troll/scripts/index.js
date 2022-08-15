// Add the button.
topButton = document.getElementById('topBtn');

// When the user scrolls down, show the button.
window.onscroll = function () {
    displayTopBtn();
};

function topScrollFunction() {
    document.body.scrollTop = 0; // For Safari 
    document.documentElement.scrollTop = 0;
}

function displayTopBtn() {
    const topButton = document.querySelector('#topBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block"
    } else {
        topButton.style.display = "none"
    }
}

/* 
Add a 'listener' to wait for a submission of our form.
When that happens run the code below.
*/
function sendMessage() {
    const userName = document.getElementById('user-name');
    var noName = document.getElementById('no-name');

    const userEmail = document.getElementById('user-email');
    var noEmail = document.getElementById('no-email');

    const userMsg = document.getElementById('user-msg');
    var noMsg = document.getElementById('no-msg');

    var response = document.getElementById('feedback');

    response.innerHTML = '';

    // If the user_name field is empty.
    if (userName.value == '') {
        // Show the prompt to enter a name.
        noName.innerHTML = 'Please enter your name.';
        // Set focus on the user_name field.
        userName.focus();
    } else {
        // Hide the prompt to enter a name.
        noName.innerHTML = '';
        // If the user_email field is empty.
        if (userEmail.value == '') {
            // Show the prompt to enter an email.
            noEmail.innerHTML = 'Please enter your email.';
            // Set focus on the user_email field.
            userEmail.focus();
        } else {
            // Hide the prompt to enter an email.
            noEmail.innerHTML = '';
            // If the user_msg field is empty.
            if (userMsg.value == '') {
                // Show the prompt to enter a message.
                noMsg.innerHTML = 'Please enter your message.';
                // Set focus on the user_msg field.
                userMsg.focus();
                // If none of the above are true.
            } else {
                // Hide the prompt to enter a message.
                noMsg.innerHTML = '';

                // Set the text of the response message.
                response.innerHTML = 'Hello ' + userName.value + '! Thank\
                    you for your message. We will get back to you as soon as possible!';

                // Clear the form fields
                userName.value = '';
                userEmail.value = '';
                userMsg.value = '';
            }
        }
    }

}