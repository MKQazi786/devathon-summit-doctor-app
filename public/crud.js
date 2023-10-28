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


window.createPost = (event) => {    

    event.preventDefault()

    let postTitle = document.getElementById("postTitle").value;
    let postText = document.getElementById("postText").value;

    axios.post(`/api/v1/post`, {
        title: postTitle,
        text: postText
    })
        .then(function (response) {
            console.log(response.data);
            document.getElementById("result").innerHTML = response.data;
            getAllPost()})
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.getElementById("result").innerHTML = "error in post"
        })
}

window.getAllPost = (event) => {


    axios.get(`/api/v1/posts`)
        .then(function (response) {
            console.log(response.data);

            let postsHtml = ``
            response.data.map((eachPost) => {
                postsHtml +=
                    `<div id="card-${eachPost.id}" class="post-card">
                    <h3> ${eachPost.title} </h3> 
                    <p> ${eachPost.text} </p>
                    <button onclick="delPost('${eachPost.id}')"> Delete </button>
                    <button onclick="editPost('${eachPost.id}','${eachPost.title}','${eachPost.text}')"> Edit </button>
                </div> 
                <br>`
            })

            document.getElementById("posts").innerHTML = postsHtml;
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.getElementById("result").innerHTML = "error in post"
        })
}

window.delPost = (postId) => {
    Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this post?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete',
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`/api/v1/post/${postId}`)
                .then(() => {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The post has been deleted.',
                        icon: 'success',
                    });
                    getAllPost();
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Error',
                        text: `An error occurred: ${error.message}`,
                        icon: 'error',
                    });
                });
        }
    });
};
  

window.editPost = (postId, title, text) => {
        console.log("PostId :", postId)

        document.getElementById(`card-${postId}`).innerHTML += 
        `<form onsubmit="savePost('${postId}')" >
        <br/>
          title: <input type="text" value="${title}" id="title-${postId}" />
          <br/>
          text: <input type="text" value="${text}" id="text-${postId}" />
          <br/>
          <button>Save</button>
        </form>`

}

window.savePost = (postId) => {

        const updatedTitle = document.getElementById(`title-${postId}`).value
        const updatedText = document.getElementById(`text-${postId}`).value

        axios.put(`/api/v1/post/${postId}`, {
            title: updatedTitle,
            text: updatedText
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                document.getElementById("result").innerHTML = "error in post"
            })
}

window.signOut = (event) => {
    event.preventDefault()

    firebase.auth().signOut().then(() => {
        console.log("Sign out successful");
        Swal.fire({
            title: 'Sign out successful',
            text: 'you are redirected to SignUP page',
            icon: 'success',
        });

        window.location.href = "index.html";
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'logout is not succesful:',
            text: error,
        });

        console.log("logout is not succesful:", error);

    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("user").innerText = user.email;
        console.log(user.email);
    } else {
        document.getElementById("user").innerText = "Unknown";
        window.location.href = "../index.html"
        console.log("not signed in");
    }
});