// ## Authorship
// Maurice Rabb
// <m3rabb@colum.edu>
// Columbia College Chicago
// 2013

	
	// ### JS Hint global pragmas

	/* global 
jasmine:false, Top:false
	*/
	/* jshint 
		maxerr:66, bitwise:true, curly:true, eqeqeq:true, forin:true, 
		plusplus:false, noarg:true, nonew:true, latedef:true, regexp:true, 
		noempty:false, lastsemic:true, immed:true, expr:true, 
		browser:true, jquery:true, devel:true, globalstrict:true, 
		smarttabs:true, trailing:false, newcap:false, undef:true, unused:false
	*/
	// validthis:true
	

"use strict";

var Ontologue = Top.newSubModule("Ontologue", function () {
	var STRING = "string",
		NUMBER = "number",
		STOPPED = "stopped",
		WAITING = "waiting",
		PLAYING = "playing";
	
	
	// ### Ontologue Event
	//
	// Instances are used to represent any Ontologue related event.

	this.newType("Event", function () {
		this.addMethod(function init(id_) {
			init.ParentInit.call(this, id_);
			this.when(new Date());
		});
		
		this.addAccessors("who what where when how why");

		this.aliasMethod("instigator", "who");        // Who caused the event
		this.aliasMethod("target", "what");           // The target of the event
		this.aliasMethod("geoLocation", "where");     // The geospacial data about the event
		this.aliasMethod("dateTime", "when");         // The current datetime for the event
		this.aliasMethod("instigatingAction", "how"); // The action taken to cause the event
		this.aliasMethod("comment", "why");           // A ref to causing event
	});

	// _Event_root,
	// 	_UserEvent_root,
	// 	_ResourceEvent_root,
	
	
	// ### Ontologue Resource
	//
	// This is the parent object of all resources

	this.newType("Resource", function () {
		this.addMethod(function init(name_) {
			var event = new Ontologue.Event(
				{target : this, instigatingAction : this.constructor});
			init.ParentInit.call(this);
			this.name(name_ || null);
			this.creationEvent(event);
		});
		
		this.addAccessors("creationEvent lastReadEvent lastWriteEvent");
	});

	// ### Ontologue ResourceSource
	//
	// Instances represent the source of a resource.  
	// For example: 
	// * The source of video shot with a mobile phone, is the mobile phone.
	// * The source of a web video, is the URI.
	// * The source of a sub-segment of media, is the parent media object.
	
	this.newSubTypeFrom("ResourceSource", "Resource", function () {
		// this.addMethod(function init(name_) {
		// 	init.ParentInit.call(this, name_);
		// 	// the URI or parent object
		// });
	});
	
	
	// ### Ontologue Region
	//
	// Instances are used to represent a rectangular region in an image or in a frame of a 
	// video.  Empty regions can be used to represent a point.
	// The source of a region is the image or video (frame) it came from.
	
	this.newSubTypeFrom("Region", "Resource", function () {
		this.addMethod(function init(x, y, width_, height_) {
			init.ParentInit.call(this);
			this.x(x).y(y).width(width_).height(height_);
		});
		
		this.addAccessors("x y width height");
		
		this.addMethod(function isEmpty() { 
			return !((this.width() > 0) && (this.height() > 0));
		});
	});
	
	// ### Ontologue TimeSpan
	//
	// Instances are used to represent a timespan
	// The source of a timespan is the video or audio it came from.
	
	// Having both duration and endDateTime are mutually redundant but easier on the mind.
	
	function AsDate(dateValue) {
		if (dateValue instanceof Date) { return dateValue; }
		switch (typeof dateValue) {
			case "undefined" : return new Date();
			case "string" : return new Date(dateValue);
		}
		return Ontologue.TimeSpan.signalError("TimeSpan constructor passed bad date")
	}
	
	this.newType("TimeSpan", function () {
		function SetEnds(timespan, startValue, endValue) {
			var start, end, seconds;
			
			start = AsDate(startValue);
			if (typeof endValue === NUMBER) {
				seconds = endValue;
				end = new Date(start.getTime() + seconds * 1000);
			} else {
				end = AsDate(endValue);
				seconds = (end.getTime() - start.getTime()) / 1000;
			}
			timespan._Start = start;      // Date
			timespan._Duration = seconds; // seconds  
			timespan._End = end;          // Date
			return timespan;
		}
		
		this.addMethod(function init(start, end_, duration_) {
			var end = end_ || duration_ || 0;
			init.ParentInit.call(this);
			return SetEnds(this, start, end);
		});
	
		this.addMethod(function start(dateTimeOrString_) { 
			if (!arguments.length) { return this._Start; }
			return SetEnds(this, dateTimeOrString_, this._End);
		});
	
		this.addMethod(function end(dateTimeOrString_) { 
			if (!arguments.length) { return this._End; }
			return SetEnds(this, this._Start, dateTimeOrString_);
		});
	
		this.addMethod(function duration(seconds_) { 
			if (!arguments.length) { return this._Duration; }
			return SetEnds(this, this._Start, seconds_);
		});
	
		this.addMethod(function isEmpty() { 
			return this._Duration <= 0;
		});
	});
	
	// ### Ontologue Vocabulary
	//
	// Instances represent a vocabulary of terms.
	
	this.newSubTypeFrom("Vocabulary", "Resource", function () {
		this.addMethod(function init(name_) {
			init.ParentInit.call(this, name_);
			this.terms([]);
		});
		
		this.addMethod(function terms(terms_) { 
			return arguments.length ? 
				(this._Terms = terms_.slice(0), this) : this._Terms.slice(0);
		});
	
		this.addMethod(function addTerm(word) { 
			var term = (typeof word === STRING) ? new Ontologue.Term(word, this): word;
			this._Terms.push(term);
			return this;
		});
	});



	// ### Term
	//
	// Instances represent a common term name from a vocabulary.  
	// Terms are shared and referenced by tags.

	this.newSubTypeFrom("Term", "Resource", function () {
		this.addMethod(function init(name, vocabulary) {
			init.ParentInit.call(this, name);
			this.vocabulary(vocabulary);
		});
		
		this.addAccessors("vocabulary!");
	});



	// ### Tag
	//
	// Instances represent a tag attached to a target resource.  

	this.newSubTypeFrom("Tag", "Resource", function () {
		this.addMethod(function init(term, target) {
			init.ParentInit.call(this);
			this.term(term);
			this.target(target);
		});
		
		this.addAccessors("target");
		
		this.addMethod(function term(term_) { 
			if ( !arguments.length ) { return this._Term; }
			this._Term = term_;
			return this;
		});
		
		this.addMethod(function name() { 
			if (arguments.length) { return this; } // Nop when called as a setter.
			return this.term().name();
		});
	});		



	// ### Image
	//
	// Instances represent an image.

	this.newSubTypeFrom("Image", "Resource", function () {
		this.addMethod(function init(name_) {
			init.ParentInit.call(this, name_);
			this.baseWidth(0);
			this.baseHeight(0);
		});
		
		this.addAccessors("baseWidth baseHeight");
	});



	// ### TimeBasedMediaResource
	//
	// The abstract class of video and audio.

	this.newSubTypeFrom("TimeBasedMediaResource", "Resource", function () {
		this.addMethod(function init(name_) {
			init.ParentInit.call(this, name_);
			this.timeSpan(null);
			this.reset();
		});
		
		this.addAccessors("timeSpan");
		
		this.addMethod(function reset() {
			this._State = STOPPED;
			this._CurrentTimerID = null;
			this._SecondsPlayed = 0;        // seconds thru duration
		});
	});

	// ### Video
	//
	// Instances represent a video.

	this.newSubTypeFrom("Video", "TimeBasedMediaResource", function () {
		this.addMethod(function init(name_) {
			init.ParentInit.call(this, name_);
			this.baseWidth(0);
			this.baseHeight(0);
		});

		this.addAccessors("baseWidth baseHeight");
	});

	// ### Audio
	//
	// Instances represent an audio.

	this.newSubTypeFrom("Audio", "TimeBasedMediaResource", function () {
		this.addMethod(function init(name_) {
			init.ParentInit.call(this, name_);
		});
	});
	
});

