

/*
// function to shuffle the six images inside the section.
$(document).ready(
    function () {
        
        var a = $("#gameCanvas > img").remove().toArray();
        for (var i = a.length - 1; i >= 1; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var bi = a[i];
            var bj = a[j];
            a[i] = bj;
            a[j] = bi;
        }
        $("#gameCanvas").append(a);
    });
    */ // Moved to setup()

//function that makes the six images draggable and one div droppable

$(document).ready(
    function () {

        $('#geo1').draggable({
            
        });
        $('#geo2').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#geo3').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#geo4').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#geo5').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#geo6').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#dog1').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#dog2').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#dog3').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#dog4').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#dog5').draggable({
            revert: "invalid",
            revertDuration: "500"
        });
        $('#dog6').draggable({
            revert: "invalid",
            revertDuration: "500"
        });


        //makes the div droppable only for geo1 image
        $('#drop').droppable({
            accept: "#geo1",
            drop: function (event, ui) {
                console.log(this);
                alert("Dropped"); // Doesn't seem to work
                $(this).addClass('dropped');
                
            }


        });
     
    });

/*
$("#StartButton").click(function () {
     $("#StartButton").hide();
     $("#gameCanvas").show();

 });*/ // Moved into binding function 



function binding() {
    /*$("#StartButton").on("click", reset);*/ // No longer needed
    restartButton.on("click", reset);
}

 function allowDrop(ev) {
     ev.preventDefault();
 }

 function drag(ev) {
     ev.dataTransfer.setData("text", ev.target.id);
 }

 function drop(ev) {
     ev.preventDefault();
     var data = ev.dataTransfer.getData("text");
     ev.target.appendChild(document.getElementById(data));
     $("#" + data).addClass("dropped");
     /*$("#" + data).css({
         "position": "absolute",
         "top": "0",
         "left": "0",
         "padding": "0",
         "float": "none"
     });*/
     //window.alert("YOU WON!!!");
     win();
     /*if (alert("PLAY AGAIN!!")) {
         reset();
     }
     else {
         //window.location.reload(); 
         reset();
     }*/
 }

/* Code to replace alerts with modal overlay */

 var paused = false;
 var game = $(".game"); // Holds the reference to the game canvas
 var overlay = $(".modal-overlay"); // Holds the reference to the overlay div
 var modal = $(".modal");; // Holds the reference to the modal div
 var restartButton = $("button.restart"); // Holds the reference to restart button in modal screen


 function win() {
     this.paused = true;
     setTimeout(function () {
         showModal();
         game.fadeOut();
     }, 1000);
 }

function showModal() {
    overlay.show();
    modal.fadeIn("slow");
}

function hideModal() {
    overlay.hide();
    modal.hide();
}

function reset() {

    $("#geo1").removeClass("dropped");

    var a = $("#gameCanvas img").remove().toArray(); // Removed > to also get the dropped img inside the sub div
    for (var i = a.length - 1; i >= 1; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var bi = a[i];
        var bj = a[j];
        a[i] = bj;
        a[j] = bi;
    }
    // $("#gameCanvas").append(a);
    $("#gameCanvas").prepend(a); // Prepend keeps the drop zone after the images

    paused = false;

    hideModal();
    game.show("slow");

}

$(document).ready(function () {
    binding();
    reset();
});