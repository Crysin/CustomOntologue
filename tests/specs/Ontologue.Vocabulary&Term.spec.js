describe("Ontologue.Vocabulary", function() {
	var vocab, priorTerms, terms, term, answer;
	describe("when instantiating", function() {
		it("answers a new vocabulary", function() {
			vocab = new Ontologue.Vocabulary("Fruits");
			expect( vocab.constructorName() ).toBe( "Vocabulary" );
			expect( vocab.name() ).toBe( "Fruits" );
			expect( vocab.id().indexOf("Vocabulary-") ).toBe( 0 );
			expect( vocab.terms() ).toEqual( [] );
		});
	});
	
	describe("when accessing", function() {
		describe("#terms", function() {
			describe("when called as a setter", function() {
				it("overwrites the existing array of terms", function() {
					vocab = new Ontologue.Vocabulary("Fruits");
					priorTerms = vocab._Terms;
					terms = vocab.terms();
					expect( terms ).toEqual( vocab._Terms );
					expect( terms ).not.toBe( vocab._Terms );
				});
				it("makes a shallow copy of the passed in terms", function() {
					vocab = new Ontologue.Vocabulary("Fruits");
					priorTerms = vocab._Terms;
					term = new Ontologue.Term("Orange", vocab);
					terms = [term];
					answer = vocab.terms(terms);
					expect( vocab._Terms ).toEqual( terms );
					expect( vocab._Terms ).not.toBe( terms );
				});
			});
			describe("when called as a getter", function() {
				it("answers a copy of the current array of terms", function() {
					terms = vocab.terms();
					expect( terms ).toEqual( vocab._Terms );
					expect( terms ).not.toBe( vocab._Terms );
				});
			});
		});
		
		describe("#addTerm", function() {
			describe("when the word is a string", function() {
				it("makes a new Term and adds it to the vocabulary", function() {
					vocab = new Ontologue.Vocabulary("Fruits");
					answer = vocab.addTerm("Cherry");
					terms = vocab.terms();
					term = terms[0];
					expect( terms.length ).toBe( 1 );
					expect( term.name() ).toBe( "Cherry" );
					expect( term.vocabulary() ).toBe( vocab );
				});
				it("answers the receiver", function() {
					expect( answer ).toBe( vocab );
				});
			});
			describe("when the word is a term", function() {
				it("adds it to the vocabulary", function() {
					term = new Ontologue.Term("Orange", vocab);
					answer = vocab.addTerm(term);
					terms = vocab.terms();
					expect( terms.length ).toBe( 2 );
					expect( terms[1].name() ).toBe( "Orange" );
					expect( terms[1].vocabulary() ).toBe( vocab );
				});
				it("answers the receiver", function() {
					expect( answer ).toBe( vocab );
				});
			});
		});
	});
});
