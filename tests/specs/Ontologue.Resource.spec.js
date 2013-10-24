describe("Ontologue.Resource", function() {
	describe("when instantiating", function() {
		var resource;
		it("answers a new resource", function() {
			resource = new Ontologue.Resource("xyz");
			expect( resource.constructorName() ).toBe( "Resource" );
			expect( resource.name() ).toBe( "xyz" );
			expect( resource.name() ).not.toBe( resource.id() );
			expect( resource.creationEvent() instanceof Ontologue.Event ).toBe( true );
			expect( resource.creationEvent().when() instanceof Date ).toBe( true );
		});
	});
});