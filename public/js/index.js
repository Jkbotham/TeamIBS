$(document).ready(function(){

$(".newIdea").on("click", function(event){
	event.preventDefault();

	let newIdea = {
		title: $("#title").val().trim(),
		body: $("#body").val().trim()
	}

	$.post("/api/newIdea", newIdea).then(function(){
		window.location.reload();
	});
});

$(".comment").on("click", function(event){
	event.preventDefault();

	const id = $(this).data().id
	const point = $(this).data().points
	const upOrDown = $(this).data().upordown
	const bodyText = $(this).parent().parent().siblings(".commentText").val().trim()

	let comment = {
		ideaID: id,
		body: bodyText,
		points: point,
		vote: upOrDown
	}

	$.post("/api/newComment", comment).then(function(){
		location.reload();
	});
});

});