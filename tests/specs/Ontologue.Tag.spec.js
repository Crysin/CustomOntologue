describe("Ontologue.Tag", function() {
	var tag, term, image, answer;
	
	describe("when instantiating", function() {
		it("answers a new tag", function() {
			term = new Ontologue.Term("delicious");
			image = new Ontologue.Image("Mona Lisa");
			tag = new Ontologue.Tag(term, image);
			
			expect( tag.constructorName() ).toBe( "Tag" );
			expect( tag.name() ).toBe( "delicious" );
			expect( tag.name() ).not.toBe( tag.id() );
			expect( tag.term() ).toBe( term );
			expect( tag.target() ).toBe( image );
		});
	});
	
	describe("#name", function() {
		describe("when called as a setter", function() {
			it("has no effect", function() {
				answer = tag.name("yucky");
				expect( tag.name() ).toBe( "delicious" );
			});
			it("answers the receiver", function() {
				expect( answer ).toBe( tag );
			});
		});
		describe("when called as a getter", function() {
			it("answers the receiver's name", function() {
				expect( tag.name() ).toBe( "delicious" );
			});
		});
	});
});

// 
// // ### Tag
// //
// // Instances represent a tag attached to a target resource.  
// 
// this.newSubTypeFrom("Tag", "Resource", function () {
// 	this.addMethod(function init(term, target) {
// 		init.ParentInit.call(this);
// 		this.term(term);
// 		this.target(target);
// 	});
// 	
// 	this.addAccessors("term target");
// 	
// 	this.addMethod(function name() { return this.term().name(); });
// });		
