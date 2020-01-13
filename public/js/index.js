$(document).ready(function () {

	// console.log("\n Test: \n" + parseInt($(".idea-score").html()))

	$(".newIdea").on("click", function (event) {
		event.preventDefault();

		let userid = $(this).data().userid
		let newIdea = {
				title: $("#title").val().trim(),
				body: $("#body").val().trim(),
				userID: userid
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
		let userid = $(this).data().userid;
		let comment;
		if (userid > 0){
			comment = {
				ideaID: id,
				body: bodyText,
				points: point,
				userID: userid,
				vote: upOrDown
			}
		}
		else {
			comment = {
				ideaID: id,
				body: bodyText,
				points: point,
				vote: upOrDown
			}

		}
		
		if (bodyText) {
			$.post("/api/newComment", comment).then(function () {
				window.location.reload();
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

	$(".remove-comment").on("click", function (event) {
		event.preventDefault();

		const remove = { id: $(this).data().id }

		$.post("/api/deleteComment", remove).then(function () {
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

	const firstCardId = parseInt($(".card-score").first().data("thisid"));
	const cardsLength = $(".card-score").length;
	let highestID = 0;

	if (cardsLength > firstCardId) {
		for (var i = 1; i < cardsLength; i++){
			let thisCardId = parseInt($(".idea-card:nth-of-type("+i+")").data("thisid"));
			if (thisCardId > highestID){
				highestID = thisCardId;
			}
		}	
	}
	if (firstCardId<highestID){
		for (var i = 1; i < highestID; i++) {
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
		}
	}
	else {
		for (var i = 1; i <= firstCardId; i++){
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
		}
	}

	$(".edit-button").on("click", function(event){
		// console.log($(this).closest(".card-top").children(".card-title").text());
		event.preventDefault();
		const thisid = $(this).data("id");
		const thisTitle = $(this).parent().parent().children().children("h5").text();
		const thisBody = $(this).parent().parent().children().children("p").text();
		console.log("eid:" +thisid);
		$('#editModal').on('show.bs.modal', function (event) {
				var modal = $(this)
				modal.find('#title-text').text(thisTitle)
				modal.find('#message-text').val(thisBody);		
				modal.find(".save-edit").data("id",thisid);
				console.log("mid: " + $(".save-edit").data("id"));
		})
	});

	$(".save-edit").on("click", function(event){
		event.preventDefault();
		const thisid = $(this).data("id")
		const thisBody = $("#message-text").val();
		console.log("thisid: "+thisid)
		console.log("thisBody: "+thisBody)
		let editedComment = {
			id: thisid,
			body: thisBody
		}
		console.log(thisid);
		$.post("/api/updateIdea", editedComment).then(function(){
			window.location.reload();
		})
	})


	// $('#editModal').on('show.bs.modal', function (event) {
	// 	// var button = $(event.relatedTarget) // Button that triggered the modal
	// 	// var title = button.data('title')
	// 	// var body = button.data('body')
	// 	// var id = button.data('thisid')
	// 	// var modal = $(this)
	// 	// modal.find('#title-text').text(title)
	// 	// modal.find('#message-text').text(body)
	// 	var body = $(".edit-button").data("body")
	// 	("#message-text").html(body)
		

	//   })

});