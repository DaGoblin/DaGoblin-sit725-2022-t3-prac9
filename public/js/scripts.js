// const cardList = [
//   {
//       title: "Arthur",
//       image: "images/Arthur.jpg",
//       link: "Photo of Arthur with a toy",
//       desciption: "Is he not cute"
//   },
//   {
//       title: "Gwen",
//       image: "images/Gwen.jpg",
//       link: "Photo of Gwen",
//       desciption: "But is Gwen cuter"
//   }
// ]

const getProjects = () => {
  $.get("/api/projects", (response) => {
    if (response.statusCode == 200) {
      addCards(response.data);
    }
  });
};

// const clickMe = () => {
//   alert("Thanks for clicking me. Hope you have a nice day!");
// };

// const submitForm = () => {
//     let formData = {};
//     formData.first_name = $('#first_name').val();
//     formData.last_name = $('#last_name').val();
//     formData.password = $('#password').val();
//     formData.email = $('#email').val();

//     console.log("Form Data Submitted: ", formData);
// }

const submitForm = () => {
  let formData = {};
  formData.title = $("#title").val();
  formData.image = $("#image").val();
  formData.link = $("#link").val();
  formData.desciption = $("#description").val();

  console.log("Form Data Submitted: ", formData);
  addProjectToApp(formData);
};

//ajax
const addProjectToApp = (project) => {
  $.ajax({
    url: "/api/projects",
    data: project,
    type: "POST",
    success: (result) => {
      alert(result.message);
      location.reload(); //used to reload the page
    },
  });
};

// Updated this I just prefer using a back tick for text and variables better for making multiple lines of clean html
const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend = `<div class="col s4 center-align">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light"><img class="activator" src="${item.image}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
            <p><a href="#">${item.link}</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
            <p class="card-text">${item.desciption}</p>
          </div>
        </div>
      </div>`;
    $("#card-section").append(itemToAppend);
  });
};


let socket = io();
socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})



$(document).ready(function () {
  $(".materialboxed").materialbox();
  $("#formSubmit").click(() => {
    submitForm();
  });
  getProjects();
  $(".modal").modal();
});
