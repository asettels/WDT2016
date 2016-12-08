var main = function () {
	"use strict";
	

	// general settings
	$('#input-textbox').focus(function() { $(this).select(); } );
	hide_box();

	// binding interactive controls to functions
	$("#add-button").click(show_box);
	$("#submit-new-button").click(add);
	$("#cancel-new-button").click(hide_box);
	$("#srt-button").click(sort);
	$("#qst-button").click(function() { alert("To add an item, pres the +-icon. To sort all your tasks alphabetically, press the sort button.\ If you want to delete an item, press the x, if you want to mark an item as done, press the check."); } );

	$('#input-textbox').keyup(enter_pressed_tb);
	
	// cursor looks
	document.getElementById("add-button").style.cursor = "pointer";
	document.getElementById("qst-button").style.cursor = "pointer";
	document.getElementById("srt-button").style.cursor = "pointer";
	document.getElementById("submit-new-button").style.cursor = "pointer";
	document.getElementById("cancel-new-button").style.cursor = "pointer";

};


var enter_pressed_tb = function(event) {
	if (event.keyCode == 13) { // enter
     	add();       
    }
    else if (event.keyCode == 27) { // escape
    	hide_box();
    }
}

var show_box = function () {
	$("#add-new-container").show();
	$("#input-textbox").val("enter todo here");
	$("#input-textbox").focus();
};
var hide_box = function () {
	$("#add-new-container").hide();
};



var new_id = 0;
var add = function() {

	var li = document.createElement("li");
	var list = document.getElementById("todoList");
	var new_id = list.childNodes.length; 
	li.setAttribute("id", "i" + new_id);
	var textbox = document.getElementById("input-textbox");
	li.innerHTML = textbox.value;
	li.innerHTML += "<img id=\"done-btn"+new_id+"\" src=\"blauw-vinkje-1.png\" alt=\"done\" height=\"45\" width=\"45\" onclick=done_item(" + new_id + ")>";
	li.innerHTML += "<img id =\"del-btn"+new_id+"\" src=\"delete-2-xxl.png\" alt=\"del\" height=\"45\" width=\"45\" onclick=delete_item(i" + new_id + ")></div>"; 
	

	hide_box();

	list.append(li);

	document.getElementById("done-btn"+new_id).style.cursor = "pointer";
	document.getElementById("del-btn"+new_id).style.cursor = "pointer";
	
	new_id++;
};

var delete_item = function(id)
{
	console.log("Item "+id+" was deleted.");
	id.parentNode.removeChild(id);
}

var done_item = function(id)
{
    console.log("Item "+id+" was marked as done.");
	id.parentNode.removeChild(id);
}

var sort = function() 
{
	var items = $('.the-list li').get();
	items.sort(function(a,b){
  		var keyA = $(a).text();
  		var keyB = $(b).text();

  		if (keyA < keyB) return -1;
  		if (keyA > keyB) return 1;
  		return 0;
	});

	var ul = $('.the-list');
	$.each(items, function(i, li){
  		ul.append(li);
	});
};


$(document).ready(main);