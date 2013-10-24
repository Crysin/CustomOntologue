describe("Ontologue.Event", function() {
	describe("when instantiating", function() {
		var event;
		it("answers a new event", function() {
			event = new Ontologue.Event();
			expect( event.constructorName() ).toBe( "Event" );
			expect( event.name() ).toBe( event.id() );
			expect( event.when() instanceof Date ).toBe( true );
		});
	});
});