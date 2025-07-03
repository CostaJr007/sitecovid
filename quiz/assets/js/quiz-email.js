$(document).ready(function(){
	var qn = 1; var anspoints=0;
	var qa = new Array();

	$(".quest"+qn+" .qoptions li").click(function(){
		ans = $(this).attr("data-ans");
		anspoints_val = $(this).attr("data-points");
		anspoints=anspoints+parseInt(anspoints_val);
		$(".qoptions li").each(function(){
			$(this).find(".qcir").removeClass("active");
		});

		$(this).find(".qcir").addClass("active");
		console.log($(this).attr("data-ans"));
		$(".quest"+qn).fadeOut("slow", function () {
			answer(qn,ans);
			$(".quest"+qn).fadeIn(1000);
		});

		console.log("points:"+anspoints);
	});

	//$(".btn").click(function(){
	//	alert("Go to Next Page.");
	//});

	var answer = function(q,a){
		qa[q] = a;
			qn++;
			$(".quiznumber").html(qn);
		//change button
		var i = 1;
		$(".quiznum li").each(function(){
			if(i!=qn){
				$(this).removeClass("qactive");
			}else{
				$(this).addClass("qactive");
			}
			i++;
		});

		$(".quest"+qn+" .qoptions li").click(function(){
			ans = $(this).attr("data-ans");
			anspoints_val = $(this).attr("data-points");
			anspoints=anspoints+parseInt(anspoints_val);
			$(".qoptions li").each(function(){
				$(this).find(".qcir").removeClass("active");
			});
			console.log("points:"+anspoints);

			$(this).find(".qcir").addClass("active");
			if(parseInt($(".qs").length)>parseInt(qn)){
				$(".quest"+qn).fadeOut("slow", function () {
					answer(qn,ans);
					console.log(qn);
					if($(".qs").length==qn){
						$(".quiznummob h3").html("Result");
						$(".result").fadeIn(1000);
   						window.scrollTo(0,0);
					if (anspoints>6){
						$("#headertitle").html("Congratulations!<br />It turns out, that you have good \"luck\", although it's not actually \"luck\" that is responsible for your good fortune.");
						$('#result_ponit2').html("However, your brain may still resemble the out-of-tune image on the left, which means, you're not even close to unlocking your full potential.</p><p>But don't worry... we can help... please scroll down to see what we can do for you...");
						$('#result_ponit3').html("People confuse \"luck\" with proper Manipura chakra alignment.  That's why some people are \"luckier\" than others and can manifest what we call \"luck\".");
						$('#result_ponit4').html("<p><strong>Now, the good news</strong> is that you're already a lot closer to being in proper alignment than many other people deemed to be what we consider \"unlucky\".</p><p>By fine tuning your solar plexus chakra, or Manipura, you can greatly enhance what you perceive to be your \"luck\".</p><p>Once the aligning process is complete, your brain will more closely resemble the image on the right, and you will literally be able to manifest \"good luck\" almost at will.</p><p>It\'s no secret that several very wealthy, and \"lucky\" lottery winners, and talk about the power of manifestation, and the chakras.</p><p><strong>Add your email below</strong> and click the button to see a short, free video I put together that talks about the true stories of these lottery winners and other celebrities talking about how they were able to manifest their wealth!</p>");
					} else {
						$("#headertitle").html("Uuh Oh! It turns out, that you could definitely use some help in the \"Luck\" Department.");
						$('#result_ponit2').html("The reason for your bad \"luck\", is that your brain most likely resembles the out-of-tune image on the left, which means, you're not even close to unlocking your full potential.");
						$('#result_ponit3').html("People confuse \"luck\" with proper Manipura chakra alignment.  That's why some people are \"luckier\" than others and can manifest what we call \"luck\".");
						$('#result_ponit4').html("<p><strong>Now, the good news</strong> is that you're already a lot closer to being in proper alignment than many other people deemed to be what we consider \"unlucky\".</p><p>By fine tuning your solar plexus chakra, or Manipura, you can greatly enhance what you perceive to be your \"luck\".</p><p>Once the aligning process is complete, your brain will more closely resemble the image on the right, and you will literally be able to manifest \"good luck\" almost at will.</p><p>It\'s no secret that several very wealthy, and \"lucky\" lottery winners, and talk about the power of manifestation, and the chakras.</p><p><strong>Add your email below</strong> and click the button to see a short, free video I put together that talks about the true stories of these lottery winners and other celebrities talking about how they were able to manifest their wealth!");
					}
						$(".resultbtn").show();

						$(".resultonly").show();




					}else{
						$(".quest"+qn).fadeIn(1000);
					}

				});
			}else{
				answer(qn,ans);
				//show result
				console.log("show result");
				console.dir(qa);
			}


		});
	}

});
