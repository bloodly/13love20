var $window = $(window),
	gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
$(function() {
	$loveHeart = $("#loveHeart");
	var a = $loveHeart.width() / 2;
	var b = $loveHeart.height() / 2 - 55;
	$garden = $("#garden");
	gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
	gardenCanvas.height = $("#loveHeart").height();
	gardenCtx = gardenCanvas.getContext("2d");
	gardenCtx.globalCompositeOperation = "lighter";
	garden = new Garden(gardenCtx, gardenCanvas);
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	setInterval(function() {
		garden.render()
	}, Garden.options.growSpeed)
});
$(window).resize(function() {
	var b = $(window).width();
	var a = $(window).height();
	if (b != clientWidth && a != clientHeight) {
		location.replace(location)
	}
});

function getHeartPoint(c) {
	var b = c / Math.PI;
	var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
	var d = -20 * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
	return new Array(offsetX + a, offsetY + d)
}
function startHeartAnimation() {
	var c = 50;
	var d = 10;
	var b = new Array();
	var a = setInterval(function() {
		var h = getHeartPoint(d);
		var e = true;
		for (var f = 0; f < b.length; f++) {
			var g = b[f];
			var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
			if (j < Garden.options.bloomRadius.max * 1.3) {
				e = false;
				break
			}
		}
		if (e) {
			b.push(h);
			garden.createRandomBloom(h[0], h[1])
		}
		if (d >= 30) {
			clearInterval(a);
			showMessages();
		} else {
			d += 0.2
		}
	}, c)
}(function(a) {
	a.fn.typewriter = function() {
		this.each(function() {
			var d = a(this),
				c = d.html(),
				b = 0;
			d.html("");
			var e = setInterval(function() {
				var f = c.substr(b, 1);
				if (f == "<") {
					b = c.indexOf(">", b) + 1
				} else {
					b++
				}
				d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
				if (b >= c.length) {
					clearInterval(e)
					$(".mlls").fadeIn("slow");
				}
			}, 75)
		});
		return this
	}
})(jQuery);

function timeElapse(c) {
	var e = Date();
	var f = (Date.parse(e) - Date.parse(c)) / 1000;
	var g = Math.floor(f / (3600 * 24));
	f = f % (3600 * 24);
	var b = Math.floor(f / 3600);
	if (b < 10) {
		b = "0" + b
	}
	f = f % 3600;
	var d = Math.floor(f / 60);
	if (d < 10) {
		d = "0" + d
	}
	f = f % 60;
	if (f < 10) {
		f = "0" + f
	}
	var a = '<span class="digit">' + g + '</span> days <span class="digit">' + b + '</span> hours <span class="digit">' + d + '</span> minutes <span class="digit">' + f + "</span> seconds";
	$("#elapseClock").html(a)
}
function showMessages() {
	$("#messages").fadeIn(5000, function() {
		showLoveU()
	})
}
function adjustWordsPosition() {
	$("#words").css("position", "absolute");
	$("#words").css("top", $("#garden").position().top + 195);
	$("#words").css("left", $("#garden").position().left + 70)
}
function adjustCodePosition() {
	$("#code").css("margin-top", ($("#garden").height() - $("#code").height()) / 2)
}
function showLoveU() {
	$("#loveu").fadeIn(3000)
};


$(document).ready(init);

function highlight(element) {
	$("nav ul li").removeClass("highlight");
	if(!element.hasClass("highlight")) {
		element.addClass("highlight");
	}
}

function init() {
	/* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */
	$.fn.scrollPath("getPath")
		// Move to 'start' element
		.moveTo(400, 50, {
			callback: function() {
				highlight($(".page_1"));
				adjustWordsPosition();
			},
			name: "start"})
		// Line to 'description' element
		.lineTo(400, 1200, {
			callback: function() {
				highlight($(".page_2"));
				showMessages();
			},
			name: "description"})
		// Arc down and line to 'syntax'
		.arc(800, 1200, 400, Math.PI, Math.PI/2, true)
		.lineTo(800, 1600, {
			callback: function() {
				highlight($(".page_3"));
				showMessages();
			},
			name: "syntax"})
		// Continue line to 'scrollbar'
		.lineTo(1750, 1600, {
			callback: function() {
				highlight($(".page_4"));
				showMessages();
			},
			name: "scrollbar"
		})
		// Arc up while rotating
		.arc(1800, 1000, 600, Math.PI/2, 0, true, {rotate: Math.PI/2 })
		// Line to 'rotations'
		.lineTo(2400, 750, {
			callback: function() {
				highlight($(".page_5"));
				showMessages();
			},
			name: "rotations"
		})
		// Rotate in place
		.rotate(3*Math.PI/2, {
			callback: function() {
				highlight($(".page_6"));
				showMessages();
			},
			name: "rotations-rotated"
		})
		// Continue upwards to 'source'
		.lineTo(2400, -700, {
			callback: function() {
				highlight($(".page_7"));
				showMessages();
			},
			name: "source"
		})
		// Small arc downwards
		.arc(2250, -700, 150, 0, -Math.PI/2, true)
		//Line to 'follow'
		.lineTo(1350, -850, {
			callback: function() {
				highlight($(".page_8"));
				showMessages();
			},
			name: "follow"
		})
		// Arc and rotate back to the beginning.
		.arc(1300, 50, 900, -Math.PI/2, -Math.PI, true, {rotate: Math.PI*2, name: "end"});
	// We're done with the path, let's initate the plugin on our wrapper element
	$(".wrapper").scrollPath({drawPath: false, wrapAround: true});
	$( '#fc-slideshow' ).show().flipshow();
	// Add scrollTo on click on the navigation anchors
	$("nav").find("a").each(function() {
		var target = $(this).attr("href").replace("#", "");
		$(this).click(function(e) {
			e.preventDefault();
			// Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
			// for extra easing functions like the one below
			$.fn.scrollPath("scrollTo", target, 800, "easeInOutSine");
		});
	});
}
$(document).ready(function(){
	$(".mlls").hover(function(){
		$(".notice").stop(true,true).fadeIn("slow");
	}).mouseout(function(){
		$(".notice").stop(true,true).fadeOut("slow");
	}).click(function(){
		$.fn.scrollPath("scrollTo", "description", 800, "easeInOutSine");
	});
	$("#tile1").liveTile(
	    {
	      mode:'fade',
	      swapFront: 'image'
	    }
	);
	$("#tile2").liveTile(
	    {
	      mode:'flip',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile3").liveTile(
	    {
	      mode:'none',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile4").liveTile(
	    {
	      mode:'flip',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile5").liveTile(
	    {
	      mode:'flip',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile6").liveTile(
	    {
	      mode:'none',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile7").liveTile(
		{ 
			delay:3000, 
			initDelay:500, 
			mode:'flip-list' 
		}
	);
	$("#tile8").liveTile(
	    {
	      mode:'none',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile9").liveTile(
	    {
	      mode:'none',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile10").liveTile(
		{ 
			delay:3000, 
			initDelay:500, 
			mode:'flip-list' 
		}
	);
	$("#tile11").liveTile(
	    {
	      mode:'none',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile12").liveTile(
	    {
	      mode:'flip',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile13").liveTile(
	    {
	      mode:'flip',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile14").liveTile(
	    {
	      mode:'none',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile15").liveTile(
	    {
	      mode:'flip',
	        // or swapBack:'image'
	      swap: 'image'
	    }
	);
	$("#tile16").liveTile(
	    {
	      mode:'none',
	        // or swapBack:'image'
	      swap: 'image'
	  }
	);
});