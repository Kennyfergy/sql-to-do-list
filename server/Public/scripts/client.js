console.log("JS");

$(document).ready(function () {
  console.log("JQ");
  setupClickListeners();
  //load existing tasks on page load
  getTasks();
  //click listeners
}); // end onReady

//this function is an overly complicated input value grabber
//added a checkEmpty function to check if the input fields are empty before submitting
function setupClickListeners() {
  $("#submitBtn").on("click", function () {
    console.log("in addButton on click");
    if (checkEmpty()) {
      let taskToSubmit = {
        task: $("#toDoInput").val(),
      };
      postTask(taskToSubmit);
    }
  });
  //add click listener here

  $("#viewTasks").on("click", ".deleteBtn", deleteSwal);
  $("#viewTasks").on("click", ".completeBtn", putSwal);
} //end setupClickListeners

//this function handles the get request and appends the dom with the response
function getTasks() {
  console.log("in get todo");
  $.ajax({
    type: "GET",
    url: "/todo",
  })
    .then(function (response) {
      console.log(response);
      appendDom(response);
    })
    .catch((err) => console.log("Error in GET", err));
} //end getTasks

//function to check if input fields are empty when clicking submit
function checkEmpty() {
  if ($("#toDoInput").val() === "") {
    alert("Please input a task");
    return false;
  }
  return true;
} // end checkEmpty

//this function displays the data on the DOM
function appendDom(tasks) {
  $("#viewTasks").empty();
  $("#toDoInput").val(""); //emptying input field after submit
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    let completionStatus = task.is_complete ? "Y" : "N";
    let backgroundColor = task.is_complete ? "#8AD5A8" : "#C47E7E";

    $("#viewTasks").append(`
  <tr style="background-color: ${backgroundColor}">
  <td>${task.task}</td>
 
 
  <td>${completionStatus}</td>
  <td>
  ${
    task.is_complete
      ? "Complete"
      : `<button class="completeBtn" data-id=${task.id}> Mark Complete</button>`
  }
  </td>
  <td>
  <button class="deleteBtn" data-id=${task.id}>Delete</button>
  </td>
  </tr>
  `);
  }
} //end appendDOM

//this function handles posting new tasks to the dom
function postTask(newTask) {
  console.log("in postTask", newTask);
  $.ajax({
    type: "POST",
    url: "/todo",
    data: newTask,
  })
    .then(function (response) {
      getTasks(); //adding new task to the dom right away
    })
    .catch((err) => console.log("Error in POST", err));
} //end postTask

function putSwal(event) {
  swal({
    title: "Are you sure?",
    text: "Click OK to mark the task complete",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((confirm) => {
    console.log(confirm);
    if (confirm) {
      putTask(event);
      console.log("task marked complete");
      swal("Great job completing this task!", {
        icon: "success",
      });
    } else {
      swal("Don't be lazy. finish your task");
    }
  });
} // end putSwal

function putTask(event) {
  const taskId = $(event.target).data("id");
  console.log("Change status of task", $(event.target));

  $.ajax({
    type: "put",
    url: `/todo/${taskId}`,
    data: { is_complete: "Y" },
  })
    .then(function (response) {
      console.log("Response from server.", response);
      getTasks();
    })
    .catch((err) => console.log("Error in PUT", err));
} //end putTask

function deleteSwal(event) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this task",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((confirm) => {
    console.log(confirm);
    if (confirm) {
      deleteTask(event);
      console.log("deleted task!");
      swal("The task has been deleted", {
        icon: "success",
      });
    } else {
      swal("Don't be lazy. finish your task");
    }
  });
} // end deleteSwal

const deleteTask = (event) => {
  const id = $(event.target).data("id");
  $.ajax({
    method: "DELETE",
    url: `/todo/${id}`,
  })
    .then(() => getTasks())
    .catch((err) => console.log(err));
}; // end deleteTask
