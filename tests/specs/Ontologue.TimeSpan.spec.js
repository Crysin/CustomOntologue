describe("Ontologue.TimeSpan", function() {
	var TimeSpan = Ontologue.TimeSpan;
	
	describe("when initializing", function() {
		var timeSpan, startTimeString, startDateTime;
		startTimeString = "2012-12-12 1:23:45 pm";
		startDateTime = new Date(startTimeString);
		
		it("answers a new time span", function() {
			timeSpan = new TimeSpan();
			expect( timeSpan.constructorName() ).toBe( "TimeSpan" );
		});
		
		it("can be made with a start time string", function() {
			timeSpan = new TimeSpan(startTimeString);
			expect( timeSpan.start() ).toEqual( startDateTime );
			expect( timeSpan.end() ).toEqual( startDateTime );
			expect( timeSpan.duration() ).toBe( 0 );
		});
		
		it("can be made with a start date time", function() {
			timeSpan = new TimeSpan(startDateTime);
			expect( timeSpan.start() ).toEqual( startDateTime );
			expect( timeSpan.end() ).toEqual( startDateTime );
			expect( timeSpan.duration() ).toBe( 0 );
			expect( timeSpan.isEmpty() ).toBe( true );
		});
		
		it("can be made with a start and duration", function() {
			timeSpan = new TimeSpan(startDateTime, 10);
			expect( timeSpan.start() ).toEqual( startDateTime );
			expect( timeSpan.end() ).toEqual( new Date("2012-12-12 1:23:55 pm") );
			expect( timeSpan.duration() ).toBe( 10 );
			expect( timeSpan.isEmpty() ).toBe( false );
		});
		
		it("can be made with a start and end time", function() {
			timeSpan = new TimeSpan("2012-12-12", "2012-12-13");
			expect( timeSpan.start() ).toEqual( new Date("2012-12-12") );
			expect( timeSpan.end() ).toEqual( new Date("2012-12-13") );
			expect( timeSpan.duration() ).toBe( 86400 );
		});
		
		it("can be made from a spec with start", function() {
			timeSpan = new TimeSpan({start : "2012-12-12"});
			expect( timeSpan.start() ).toEqual( new Date("2012-12-12") );
			expect( timeSpan.end() ).toEqual( new Date("2012-12-12") );
			expect( timeSpan.duration() ).toBe( 0 );
			
			
		});
		it("can be made from a spec with start and duration", function() {
			timeSpan = new TimeSpan({start : "2012-12-12", duration : 86400});
			expect( timeSpan.start() ).toEqual( new Date("2012-12-12") );
			expect( timeSpan.end() ).toEqual( new Date("2012-12-13") );
			expect( timeSpan.duration() ).toBe( 86400 );	
		});
		it("can be made from a spec with start and end", function() {
			timeSpan = new TimeSpan({start : "2012-12-12", end : "2012-12-13"});
			expect( timeSpan.start() ).toEqual( new Date("2012-12-12") );
			expect( timeSpan.end() ).toEqual( new Date("2012-12-13") );
			expect( timeSpan.duration() ).toBe( 86400 );	
		});
	});
});


// this.newSubTypeFrom("TimeSpan", "Resource", function () {
// 	function SetEnds(timespan, startValue, endValue) {
// 		var start, end, seconds;
// 		
// 		start = (typeof startValue === STRING) ? new Date(startValue) : startValue;
// 		if (typeof endDateTimeOrDuration === NUMBER) {
// 			seconds = endValue;
// 			end = new Date(start + seconds * 1000);
// 		} else {
// 			end = (typeof endValue === STRING) ? new Date(endValue) : endValue;
// 			seconds = (end - start) / 1000;
// 		}
// 		timespan._Start = start;      // Date
// 		timespan._Duration = seconds; // seconds  
// 		timespan._End = end;          // Date
// 		return timespan;
// 	}
// 	
// 	this.addMethod(function init(start, end_, duration_) {
// 		var end = end_ || duration_ || 0;
// 		init.ParentInit.call(this);
// 		return SetEnds(this, start, end_);
// 	});
// 
// 	this.addMethod(function start(dateTimeOrString_) { 
// 		if (!arguments.length) { return this._Start; }
// 		return SetEnds(this, dateTimeOrString_, this._End);
// 	});
// 
// 	this.addMethod(function end(dateTimeOrString_) { 
// 		if (!arguments.length) { return this._End; }
// 		return SetEnds(this, this._Start, dateTimeOrString_);
// 	});
// 
// 	this.addMethod(function duration(seconds_) { 
// 		if (!arguments.length) { return this._Duration; }
// 		return SetEnds(this, this._Start, seconds_);
// 	});
// 
// 	this.addMethod(function isEmpty() { 
// 		return this._Duration <= 0;
// 	});
// });