function ToDo(id, task,date, time, important,note){
	var self = this;
	this.task=task;
	this.date=date;
	this.time=time;
	this.important=important;
	this.note=note;
	this.done=false;
	this.id = id;

	this.makeElement = function(onDelete){
		//make list
		var $li = $('<li></li>');
		var $cb = $('<input type = "checkbox">');
		$cb.change(function(){
			self.done=($(this).is(":checked"));
			$li.toggleClass("done",self.done);
		});
		var $span = $('<span></span>').text(self.task + ", " + self.date +  ", " + self.time);
		$li.toggleClass("important",self.important==='on');
		var $button = $('<button>Delete</button>');
		$button.click(function(){
			$li.remove();
			onDelete(self);
		});
		//fill list with checkbox, task, date, time
		$li.append($cb).append($span).append($button);
		if(self.note){
			var $note = $('<p></p>').addClass("note").text("Note: " + self.note);
			$li.append($note);
		}
		return $li;
	}
}

function ToDoList(){
	var self = this;
	self.tasks=[];

	self.add = function(newToDo){
		self.tasks.push(newToDo);
		var $ul = $('#list1');
		$ul.append(newToDo.makeElement(self.delete));
	}
	self.delete = function(todoloo){
		var index = self.tasks.indexOf(todoloo);
		self.tasks.splice(index, 1);
	}
}

$(function(){
	var list = new ToDoList(); 
	var newId = 1;

	$('#newToDo').submit(function(event){
		data = new FormData(this);
		var todo = new ToDo(newId, data.get("task"), data.get("date"), data.get("time"), data.get("important"), data.get("note"));
		newId++;
		list.add(todo);
		event.preventDefault();
		// same as document.getElementById('newToDo').reset()
		$('#newToDo')[0].reset();
	})

});