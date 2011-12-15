var boton = '<label for="menu"><div class="circle-container"><button class="circle">&#10006;</button></div></label>'; //The button to perform the animation
var $itemsMenu = $('.items li'); //Collection of menu items
var radius = 170; //Radius of the circumference where the items will be positioned
var arc = 90; //Portion of circumference where the items will be positioned
var angle = arc/$itemsMenu.length; //Angle between 2 items
var delay = 50; //Delay on the animation of each item

/*  Rotation of the items when deploying
	This function uses the jQuery Rotate Plugin:
	http://code.google.com/p/jqueryrotate/	*/
var deployItem = function(){
   $itemsMenu.rotate({
      angle:0, 
      animateTo:720,
	  duration:600
   });
};
 
/*  Rotation of the items on undeploying
	This function uses the jQuery Rotate Plugin:
	http://code.google.com/p/jqueryrotate/ */
var undeployItem = function(){
   $itemsMenu.rotate({
      angle:720, 
      animateTo:-720,
	  duration:800
   });
};

/*	Rotation of the cross when deploying
	Using again the jQuery Rotate Plugin:
	http://code.google.com/p/jqueryrotate/ 	*/
var crossButtonDeploy = function(){
	$('button.circle').rotate({
      angle:45, 
      animateTo:0,
	  duration:300
	});
};

/*	Rotation of the cross on undeploying
	Once more, the jQuery Rotate Plugin:
	http://code.google.com/p/jqueryrotate/ 	*/
var crossButtonUndeploy = function(){
	$('button.circle').rotate({
      angle:0, 
      animateTo:45,
	  duration:300	
	});
};
 
/*  Menu deploy animation 
	The easing of the main animation is from jQuery UI
	http://jqueryui.com/demos/effect/easing.html*/
var deploy = function(){
	delay=50;

	crossButtonDeploy();
	
	$itemsMenu.each(function(i){
		delay *=1.35;
		$(this).stop(true,true).delay(delay).animate({
			bottom: 20+(radius*((Math.sin((i+0.5)*angle*Math.PI/180)))),
			left: 20+(radius*((Math.cos((i+0.5)*angle*Math.PI/180))))
		}, 400, 'easeOutBack');
	});
		
	deployItem();
};

/* Menu undeploy animation 
	The easing of the main animation is from jQuery UI
	http://jqueryui.com/demos/effect/easing.html*/
var undeploy = function(){
	delay = 50;
	
		crossButtonUndeploy();
	
	$itemsMenu.each(function(){
		delay *=1.35;
		$(this).stop(true,true).delay(delay).animate({
			bottom: 20,
			left: 20
		}, 400, 'easeInBack');
	});		
	
	undeployItem();
};



/*	MAIN: inicializations and event binding...	*/
/*	Setting it up width progressive enhancement	*/
$('html').removeClass('no-js').addClass('js');
$('.items').before(boton); 
$('button.circle').rotate(45);

/*	Event binding	*/
$('button.circle').toggle(deploy,undeploy);