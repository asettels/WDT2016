var main = function(){
	var new_id = 0;
	var tasks = [];
	$('#submit-new-button').click(read);

	function Task(job, id){
		this.id = id;
		this.job = job;
		
		this.getJob = function() {return this.job;};
		this.getId = function() {return this.id;};

		function getElement(){
			var li = $('<li></li>');
			li.attr("id", "i" + this.id);
			
			var li = $('<li></li>').attr('id','i'+this.id).text(this.job);
			$('<img/>').attr('src','blauw-vinkje-1.png').click(task_done).appendTo(li);
			$('<img/>').attr('src','delete-2-xxl.png').click(task_remove).appendTo(li);
			
			return li;
		};
		
		
	};
		
	function add(task){
		new_id++;
		var jobtopush = new Task(task, new_id)
		tasks.push(task);
		$("#todoList").append(jobtopush.getElement());
	};
	
	function task_done(){
		var task = event.target.parent;
		console.log("Task "+ task.job + " was marked done");
		task.remove();
	};
	
	function read(){
		var textbox = document.getElementById("input-textbox");
		add(textbox.value);
	}
	
}

$(document).ready(main);