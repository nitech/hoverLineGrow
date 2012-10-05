/*
                 
	         .:::.     C           .C            
	     o@@@8OOO8@@. c@o          O@.           
	   C@8:           8@@c        C@@C           Hi there, curious stranger. 
	  8@c            c@@@8.      c@@@@:          
	 C@c             O8 :@O     .@@ c@O          Jørgen wanted underlines on links to grow. I tried fixing this with CSS3 first 
	 O@.     cccccccccc  o@o    8@:  8@:         only to realize only Firefox supports animating pseudo-elements. Gah... 
	 O@:    .CCCOCCCCO@O  O@c  O@o   c@O         
	 :@8              o@C  @@.c@O     8@:        
	  :@8c           C@8.  :@@@8      c@O        
	    o@@Oc....co8@8c     c@@.       8@:       Developed by Simon Pedersen
	       cCO888Oo:         Oc        :Oc       good-morning.no
	       

Usage example:

$(function() {
    $(".menu-top-item").hoverLineGrow({
    	variant: "left-to-right",
    	easeOver: "easeOutQuad",
    	durationOver: 100,
    	easeOut: "easeOutQuad",
    	lineStyle: "1px solid",
    	lineDistance: 1
    });
});

// trigger out-event as follows: 
$(".set-grid-equal .label").data("hoverLineGrow").out(true, true);

*/
(function($){
    $.hoverLineGrow = function(el, options){

        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("hoverLineGrow", base);
        
        base.init = function(){
            base.options = $.extend({},$.hoverLineGrow.defaultOptions, options);
            
            // Put your initialization code here

            // get instance of element
			$t = base.$el;

            // some default css
            $t.css({
            	textDecoration:"none",
            	position:"relative"
	            /*
            	,display:"inline-block",
            	overflow:"hidden",
            	verticalAlign:"bottom"
	            */
            });

            // create span that should be animated
            $line = $("<span class='line'></span>");
            
            // calculate paddingTop for line
            var distance = $t.height()+base.options.lineDistance;
            if (base.options.lineTop > 0) distance = base.options.lineTop;

            $line.css({
            	position:"absolute",
            	zIndex:1,
            	borderBottom:base.options.lineStyle,
            	left:0,
            	paddingTop:distance
            })
            $t.append($line);

            // reference for later use
            base.$line = $line;

            // if parent or parent.parent has activeClass, run over state
            if (base.isActive()) base.over(false, true);

            // on hover
            $t.hover(
            	function(){ 
            		base.over(true)
            	},
            	function(){
            		base.out()
            	}
            )
        };

        // check if link is active
        base.isActive = function(){
            if (base.$el.hasClass(base.options.activeClass) || base.$el.parent().hasClass(base.options.activeClass))
                return true
            else
                return false;
        }
        
        // over state
        base.over = function(animate, force){

            // no anim if active
            if (!force){
                if (base.isActive()) return false;
            }

            // enable animate=false to override duration to 0
            var duration = base.options.durationOver;
            if (animate == false) duration = 0; 

            // anim
        	switch(base.options.variant)
        	{
        		case "left-to-right":

        			base.$line.css("marginLeft", 0);
        			base.$line.stop().animate(
        				{
	        				width: "100%"
        				},
        				duration,
        				base.options.easeOver
        			)
        			break;
        	}
        };

        base.out = function(animate, force){

            // no anim if active
            if (!force){
                if (base.isActive()) return false;
            }

            // enable animate=false to override duration to 0
            var duration = base.options.durationOut;
            if (animate == false) duration = 0; 

            // anim
        	switch(base.options.variant)
        	{
        		case "left-to-right":
        			base.$line.stop().animate(
        				{
	        				width: 0,
	        				marginLeft: base.$el.width()
        				},
        				duration,
        				base.options.easeOut
        			)
        			break;
        	}
        }
        
        // Run initializer
        base.init();
    };
    
    $.hoverLineGrow.defaultOptions = {
        variant: "left-to-right",
        durationOver: 200,
        easeOver: "linear",
        durationOut: 300,
        easeOut: "linear",
        lineStyle: "1px solid red",
        lineDistance: 3,
        lineTop:0,
        activeClass: "active" // if parent element has this class, it's active and we don't want trigger hover
    };
    
    $.fn.hoverLineGrow = function(options){
        return this.each(function(){
            (new $.hoverLineGrow(this, options));
        });
    };
    
})(jQuery);