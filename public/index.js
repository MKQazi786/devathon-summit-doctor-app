const firebaseConfig = {
    apiKey: "AIzaSyAsc6u0IebLl18aAAeyOijQ1bvpCITsTAs",
    authDomain: "personal-blogging-app.firebaseapp.com",
    projectId: "personal-blogging-app",
    storageBucket: "personal-blogging-app.appspot.com",
    messagingSenderId: "798023453384",
    appId: "1:798023453384:web:f4eabc64356185ccf773fd",
    measurementId: "G-CKWNGZ3MRX"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

window.signUp = (event) => {

    event.preventDefault()
    let firstName = document.getElementById("FirstName").value;
    let lastName = document.getElementById("LastName").value;
    let email = document.getElementById("emailAddress").value
    let password = document.getElementById("Password").value
    let repeatPassword = document.getElementById("RepeatPassword").value;

    if (!firstName || !lastName || !email || !password || !repeatPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill out all required fields.',
        });
        return
    }

    if (password !== repeatPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match.',
        });
        return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            Swal.fire({
                title: 'succesfully signup',
                text: 'new user is registered',
                icon: 'success',
            }).then(() => {
                let user = userCredential.user;
                console.log("user: ", user)
                window.location = "login.html"
                // ...
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'signup error:',
                text: error,
            });
            console.log("firebase signup error: ", error)

            // ..
        });

}

window.logIn = (event) => {
    event.preventDefault();

    let email = document.getElementById("emailAddress").value;
    let password = document.getElementById("Password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            Swal.fire({
                title: 'Successfully Logged In',
                text: 'You are redirected to the blogging app',
                icon: 'success',
            }).then(() => {
                window.location = "dashboard.html";
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: errorMessage,
            });
        });
};