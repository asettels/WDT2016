function ToDo(id, task,date, time, important,note){
	var self = this;
	this.done=false;
	this.id = id;

	this.fill = function(task, date, time, important, note){
		self.task=task;
		self.date=date;
		self.time=time;
		self.important=important;
		self.note=note;
	}

	this.fill(task,date,time,important,note);

	this.makeElement = function(onDelete, onEdit){
		//make list
		var $li = $('<li></li>').attr('id', 'task_' + self.id);
		var $cb = $('<input type = "checkbox">');
		$cb.change(function(){
			self.done=($(this).is(":checked"));
			$li.toggleClass("done",self.done);
		});
		var $span = $('<span></span>').text(self.task + ", " + self.date +  ", " + self.time);
		$li.toggleClass("important",self.important);
		var $button = $('<button>Delete</button>');
		$button.click(function(){
			$li.remove();
			onDelete(self);
		});
		var $edit = $('<button>Edit</button>');
		$edit.click(function(){
			onEdit(self);
		});
		//fill list with checkbox, task, date, time
		var $note = $('<p></p>').addClass("note");
		$li.append($cb).append($span).append($button).append($edit).append($note);

		if(self.note){
			$note.text("Note: " + self.note);
		}

		return $li;
	}

	this.update = function(task, date, time, important, note){
		self.fill(task, date, time, important, note);
		var $li = $('#task_'+self.id);
		$('span', $li).text(self.task + ", " + self.date +  ", " + self.time);
		$li.toggleClass("important",self.important==='on');
		if(self.note){
			$('.note', $li).text("Note: "+self.note);
		}else{
			$('.note',$li).text("");
		}
	}
}

function ToDoList(){
	var self = this;
	self.tasks=[];

	self.add = function(newToDo){
		self.tasks.push(newToDo);
		var $ul = $('#list1');
		$ul.append(newToDo.makeElement(self.delete, self.edit));
		// var json = JSON.stringify(self.tasks);
		// $.post("/addTodo", json);

	
	}
	self.delete = function(todoloo){
		var index = self.tasks.indexOf(todoloo);
		self.tasks.splice(index, 1);
	}
	self.edit = function(todo){
		$('#edit_input_task').val(todo.task);
		$('#edit_input_date').val(todo.date);
		$('#edit_input_time').val(todo.time);
		$('#edit_input_important').attr('checked', todo.important);
		$('#edit_input_note').val(todo.note);
		$('#edit_input_id').val(todo.id);
		$('#newTask').hide(300,function(){$('#editTask').show(300)});
	}

	self.find = function(id){
		for(var i=0; i<self.tasks.length;i++){
			if(id==self.tasks[i].id){
				return self.tasks[i];
			}
		}
	}
}


$(function(){
	var list = new ToDoList();
	var newId = 1,
		listToClear = $("#list1");

	$('#newToDo').submit(function(event){
		event.preventDefault();
		var data = new FormData(this);

		var todo = new ToDo(newId, data.get("task"), data.get("date"), data.get("time"), data.get("important")==='on', data.get("note"));
		
		$.post({
			url: '/addTodo',
			data: {
				"id": newId,
				"task" : data.get("task"),
				"date" : data.get("time"),
				"important": data.get("important")==='on',
				"note" : data.get("note")
			},
			dataType: 'json'
		}).fail(function (err) {
			console.log('er gaat iets fout!');
			console.log(err);
		});

		newId++;
		list.add(todo);
		$('#newToDo')[0].reset();
		$.post('/addTodo', data);
	});

	$('#editTodo').submit(function(event){
		$('#editTask').hide(300,function(){$('#newTask').show(300)});

		event.preventDefault();
		var data = new FormData(this);
		var id = data.get("id");
		var todo = list.find(id);
		todo.update(data.get("task"), data.get("date"), data.get("time"), data.get("important")==='on', data.get("note"));
		$('#editTodo')[0].reset();
	});

	$('#edit_cancel').click(function(event){
		$('#editTodo')[0].reset();
		$('#editTask').hide(300,function(){$('#newTask').show(300)});
	});

	function clearList(){
		list.tasks = [];
		listToClear.html("");
	}

	var fetchTodos = function(){
		$.ajax({
			url: "/todos.json",
			dataType: "json"
		}).done(function(data){
			console.log(data);
			clearList();
			data.forEach(function (todo) {
				list.add(new ToDo(todo["id"], todo["task"], todo["date"], todo["time"], todo["important"]==='on', todo["note"]));
			});
		})
	};

	$(document).ready(function(){
	// var list = $("#list1"); //get list element
	if(undefined!==list){
		fetchTodos();
		setInterval(fetchTodos, 5000);
	}
});

});

