$(document).ready(function () {

	// console.log("\n Test: \n" + parseInt($(".idea-score").html()))

	$(".newIdea").on("click", function (event) {
		event.preventDefault();

		let newIdea = {
			title: $("#title").val().trim(),
			body: $("#body").val().trim()
		}

		$.post("/api/newIdea", newIdea).then(function () {
			window.location.replace("/");
		});
	});

	$(".comment-button").on("click", function (event) {
		event.preventDefault();

		const id = $(this).data().id
		const point = $(this).data().points
		const upOrDown = $(this).data().upordown
		const bodyText = $(".comment-form").val();
		
		console.log(bodyText)
		let comment = {
			ideaID: id,
			body: bodyText,
			points: point,
			vote: upOrDown
		}
		if (bodyText) {
			$.post("/api/newComment", comment).then(function () {
				location.reload();
			});
		}
		else ($(".warning-div").html("<br>You must enter a comment to vote."));
	});

	$(".remove").on("click", function (event) {
		event.preventDefault();

		const remove = { id: $(this).data().id }

		$.post("/api/delete", remove).then(function () {
			window.location.reload();
		});
	})

	const ideaScore = parseInt($(".idea-score").html());
	if (ideaScore > 0) {
		$(".idea-score").html("+" + ideaScore)
		$(".idea-score").css("color", "#27a745");
	}
	else if (ideaScore < 0) {
		$(".idea-score").css("color", "#dc3545");
	}
	else {
		$(".idea-score").css("color", "black");
	}

	const maxCardId = parseInt($(".card-score").first().data("thisid"));
	console.log(maxCardId);

	for (var i = 1; i <= maxCardId; i++){
		const thisScore = parseInt($("#idea-card-"+i).data("index"));
		if (thisScore>0){
			$("#idea-card-"+i).html("+"+thisScore)
			$("#idea-card-"+i).css("color","#27a745")
		}
		else if (thisScore<0){
			$("#idea-card-"+i).css("color","#dc3545")
		}
		else {
			$("#idea-card-"+i).css("color","black")
		}
		// console.log(parseInt($("#idea-card-"+i).data("index")));
		// console.log("Number of Cards: " + $(".card-score").length);
	}

});