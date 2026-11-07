function saveTask(){
    //1. Get values from the DOM (this section is to collect the data)
    const title = $("#txtTitle").val(); // read title
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    
    //2. Create object using our class (this puts all the data in one container together)
    const taskToSave = new Task(title,desc,color,date,status,budget)
    
    //3. Send to server
    $.ajax(//Asyc JavaScript "XML"-legacy version of JSON
        {
            type:"POST", // normally it is case senisitve, HTTP Verb: send
            url: serverName, //serverName is a variable of the url 
            data: JSON.stringify(taskToSave), //the mandatory stepconvert to obect into JSON format
            contentType: "application/json", // specify that the application is JSON
            success: function(response) {
                displayTask( response || taskToSave ) // || means or
                console.log(response);
                 
                
            },
            error: function(fails)
            {
                console.log(fails);
            }


        }
    )

}


//tjhis url is the server
const serverName="https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks"

function updateTask(){
    let btn = $(this); 
    let element = btn.closet(".task");
    let id = element.attr("id"); //id provided by server
    console.log(id);
    // 

    $.ajax({
         type: "PUT", //HTTP Verb: Update
         url: serverName + "/" + id,
         data: JSON.stringify({
            title: "Hello",
            budget: 99999,
            }),
            contentType: "application/json", //specify to the server what your using
            success: function(response)
            {
                console.log(response);
            }, error: function(fails)
            {
                console.log(fails);
            }
        })
}

function loadTask(){ // read the 
    $.ajax( // 
        {
            type:"GET", //HTTP verb: "READ" retrive data from the server
            url: serverName, 
            success: function(response)
            {

                console.log(response);
                for(let i=0; i <response.length; i++) //reusing the displaytask code
                {
                    displayTask(response[i]);
                }
            },
            error: function(fail)
            {
                console.log(fail);
            }
        }
    )
}

function displayTask(task) {
  // Template literal using backticks
  let html = `
    <div class="task" id= "${task.id}" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
      </div>
      <button class="btn-edit">Edit</button>
      <button class="btn-delete">Delete</button>
      
    </div>`;

  // Add to DOM
  $(".list").append(html);
}


function deleteTask(){
    console.log("hello from delete")
    //1. This sithe specif button that was clicked
    let btn = $(this);
    //2. find the parent
    let element = btn.parents(".task");
    //3. get the ID
    let id = element.attr("id");
    console.log(id);

    $.ajax({ // removing element, no need to convert the element
        type: "DELETE", 
        url: serverName + "/" + id, //concatenating the element
        success: function(){
            element.fadeOut(500, function(){ // does nt delete, nut helps user to see that something is happening, 500 milliseconds
            $(this).remove();
            }
        )
        }

    })
}


function init() 
{
    console.log("Hello from ch72"); 
    //hook the save button
    $("#btnSave").click(saveTask);
    //Lets try this in to the delete button
    //$(".btn-delete").click(deleteTask);
    $(".list").on("click", ".btn-delete", deleteTask);
    $(".list").on("click", ".btn-edit", updateTask);



    //load data from the sever by executing the loadTask function  
    loadTask();
}


window.onload  = init; 
//Function force the HTML and CSS gets resolved before the logic
// No () becuase it means execute now, and we do not want it to execute now, we want it to execute after the html and css
// html and css and 1st then logic. Logic is the function

