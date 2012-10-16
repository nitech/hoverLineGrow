hoverLineGrow - gives you fancy underlines
==========================================

A what now?
--------------------------------------

Jørgen is a bright designer working at [Good Morning](http://www.good-morning.no). He wanted some fancy hover
effects on links on a certain page, so I decided to make and release a small and extensible jQuery plugin that
lets you do just that. 

I am no seasoned jQuery plugin developer, but I've tried to make it work well, basing it on [Chris Coyier's 
jQuery Plugin Template](http://css-tricks.com/snippets/jquery/jquery-plugin-template/).

Usage
--------------------------------------

Check out index.html. It should give you a decent example. Also, Robert Bue made a jsFiddle example page where 
you can play with the script: http://jsfiddle.net/nitech/wph34/

```javascript
// apply hoverLineGrow to all a-tags
$("a").hoverLineGrow({

	// I've only implemented left-to-right animation. But check the source. It's easy to implement more.
	variant: "left-to-right",

	// default easing is linear, but if you include jQuery easing library or similar, apply whatever easing here.
	easeOver: "easeOutQuad",

	// Duration for the onMouseOver animation. There is also an durationOut property. 
	durationOver: 100,

	// the easing for the onMouseOut animation.
	easeOut: "easeOutQuad",

	// how to style the underline. 1px solid makes the line the same color as the link. 
	style: "1px solid",

	// I'm adding a border-bottom to a inline-element, so you don't actually need to position the line statically
	// like I've done in this example, you can just control the padding from the text to the line. 
	/* padding: 1, */

	// In this example, I position the line 17 px from the top of the text.
	top: 17
});
```

Comments, questions, suggestions?
----------------------------------------

Contact simon@good-morning.no for any comments, questions or suggestions. 