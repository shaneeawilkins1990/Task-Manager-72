function saveTask(){
    //1. Get values from the DOM
    const title = $("#txtTitle").val(); // read title
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    //2. Create object object using our class
    const taskToSave = new Task(title,desc,color,date,status,budget)
    //3. Send to srver

    $.ajax(
        {
            type:"POST", // normally it is case senisitve, HTTP Verb: create
            url: serverNAme, //serverName is a variable of the url
            data: JSON.stringify(taskToSave), //the mandetory stepconvert to obect into JSON format
            contentType: "application/json", // specify that the application is JSON
            success: function(response)
            {
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
const serverNAme="https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks"

function loadTask(){ // read the 
    $.ajax( // 
        {
            type:"GET", //HTTP verb: READ
            url: serverNAme, 
            success: function(response)
            {
                console.log(response);
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
    <div class="task" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
      </div>
    </div>`;

  // Add to DOM
  $(".list").append(html);
}




function init() 
{
    console.log("Hello from ch72"); 
    //hook the save button
    $("#btnSave").click(saveTask);



    //load data from the sever by executing theb loadTask function  
    loadTask();
}


window.onload  = init; 
//Function force the HTML and CSS gets resolved before the logic
// No () becuase it means execute now, and we do not want it to execute now, we want it to execute after the html and css
// html and css and 1st then logic. Logic is the function

