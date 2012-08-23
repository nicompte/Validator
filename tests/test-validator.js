var should = typeof chai !== 'undefined' ? chai.should() : require("chai").should(),
	Validator = typeof Validator !== 'undefined' ? Validator : require('../validator.js').Validator;

describe('Rules', function() {
	describe('required', function() {
		it('should fail for null', function() {
			Validator.rules.required(null).should.be.false;
		});
		it('should fail for undefined', function() {
			Validator.rules.required(undefined).should.be.false;
		});
		it('should fail for ""', function() {
			Validator.rules.required("").should.be.false;
		});
		it('should fail for " "', function() {
			Validator.rules.required(" ").should.be.false;
		});
		it('should fail for "	"', function() {
			Validator.rules.required(" 	 ").should.be.false;
		});
		it('should succeed for 0', function() {
			Validator.rules.required(0).should.be.true;
		});
		it('should succeed for "a"', function() {
			Validator.rules.required("a").should.be.true;
		});
		it('should succeed for {}', function() {
			Validator.rules.required({}).should.be.true;
		});
		it('should succeed for []', function() {
			Validator.rules.required([]).should.be.true;
		});
	});
	describe('maxLength', function() {
		it('should fail for "1234"', function() {
			Validator.rules.maxLength("1234", 3).should.be.false;
		});
		it('should fail for "    "', function() {
			Validator.rules.maxLength("    ", 3).should.be.false;
		});
		it('should succeed for "123"', function() {
			Validator.rules.maxLength("123", 3).should.be.true;
		});
		/*
		it('null (maxLength = 3) -> false', function() {
			Validator.rules.maxLength(null, 3).should.be.false;
		});
		*/
	});
	describe('minLength', function() {
		it('should fail for "12"', function() {
			Validator.rules.minLength("12", 3).should.be.false;
		});
		it('should fail for "  "', function() {
			Validator.rules.minLength("  ", 3).should.be.false;
		});
		it('should succeed for "123"', function() {
			Validator.rules.minLength("123", 3).should.be.true;
		});
		/*
		it('null (minLength = 3) -> false', function() {
			Validator.rules.minLength(null, 3).should.be.false;
		});
		*/
	});
	describe('rangeLength', function() {
		it('[3, 5] should fail for "12"', function() {
			Validator.rules.rangeLength("12", [3, 5]).should.be.false;
		});
		it('[3, 5] should fail for "123456"', function() {
			Validator.rules.rangeLength("123456", [3, 5]).should.be.false;
		});
		it('[3, 5] should succeed for "12345"', function() {
			Validator.rules.rangeLength("12345", [3, 5]).should.be.true;
		});
		it('[3, 5] should succeed for "123"', function() {
			Validator.rules.rangeLength("123", [3, 5]).should.be.true;
		});
		it('[3, 5] should succeed for "1234"', function() {
			Validator.rules.rangeLength("1234", [3, 5]).should.be.true;
		});
		/*
		it('null (rangeLength = [3, 5]) -> false', function() {
			Validator.rules.rangeLength(null, [3, 5]).should.be.false;
		});
		*/
	});
	describe('digits', function() {
		it('should fail for "e12"', function() {
			Validator.rules.digits("e12").should.be.false;
		});
		it('should fail for " 12"', function() {
			Validator.rules.digits(" 12").should.be.false;
		});
		it('should succeed for "12"', function() {
			Validator.rules.digits("12").should.be.true;
		});
		it('should succeed for 12', function() {
			Validator.rules.digits(12).should.be.true;
		});
		it('should fail for null', function() {
			Validator.rules.digits(null).should.be.false;
		});
	});
	describe('in', function() {
		it('["A"] should fail for "a"', function() {
			Validator.rules["in"]("a", ["A"]).should.be.false;
		});
		it('[] should fail for "a"', function() {
			Validator.rules["in"]("a", []).should.be.false;
		});
		it('[1, "b"] should fail for "1"', function() {
			Validator.rules["in"]("1", [1, "b"]).should.be.false;
		});
		it('["a", "b"] should succeed for "a"', function() {
			Validator.rules["in"]("a", ["a", "b"]).should.be.true;
		});
		it('[1 : "b"] should succeed for 1', function() {
			Validator.rules["in"](1, [1, "b"]).should.be.true;
		});
		/*
		it('"a" (in, null) -> false', function() {
			Validator.rules.in("a", null).should.be.false;
		});
		*/
	});
	describe('notIn', function() {
		it('["A"] should succeed for "a"', function() {
			Validator.rules.notIn("a", ["A"]).should.be.true;
		});
		it('[] should succeed for "a"', function() {
			Validator.rules.notIn("a", []).should.be.true;
		});
		it('[1, "b"] should succeed for "1"', function() {
			Validator.rules.notIn("1", [1, "b"]).should.be.true;
		});
		it('["a", "b"] should fail for "a"', function() {
			Validator.rules.notIn("a", ["a", "b"]).should.be.false;
		});
		it('[1, "b"] should fail for 1', function() {
			Validator.rules.notIn(1, [1, "b"]).should.be.false;
		});
		/*
		it('"a" (notIn, null) -> true', function() {
			Validator.rules.notIn("a", null).should.be.true;
		});
		*/
	});
	describe('number', function() {
		it('should fail for "a"', function() {
			Validator.rules.number("a").should.be.false;
		});
		it('should fail for "1"', function() {
			Validator.rules.number("1").should.be.false;
		});
		it('should succeed for 1', function() {
			Validator.rules.number(1).should.be.true;
		});
		it('should fail for null', function() {
			Validator.rules.number(null).should.be.false;
		});
	});
	describe('min', function() {
		it('1 should fail for "a"', function() {
			Validator.rules.min("a", 1).should.be.false;
		});
		it('1 should fail for 0', function() {
			Validator.rules.min(0, 1).should.be.false;
		});
		it('1 should succeed for 1', function() {
			Validator.rules.min(1, 1).should.be.true;
		});
		it('1 should succeed for 2', function() {
			Validator.rules.min(2, 1).should.be.true;
		});
		it('1should fail for null', function() {
			Validator.rules.min(null, 1).should.be.false;
		});
	});
	describe('max', function() {
		it('1 should fail for "a"', function() {
			Validator.rules.max("a", 1).should.be.false;
		});
		it('1 should succeed for 0', function() {
			Validator.rules.max(0, 1).should.be.true;
		});
		it('1 should succeed for 1', function() {
			Validator.rules.max(1, 1).should.be.true;
		});
		it('1 should fail for 2', function() {
			Validator.rules.max(2, 1).should.be.false;
		});
		it('1 should fail for null', function() {
			Validator.rules.max(null, 1).should.be.false;
		});
	});
	describe('smallerThan', function() {
		it('1 should fail for "a"', function() {
			Validator.rules.smallerThan("a", 1).should.be.false;
		});
		it('1 should succeed for 0', function() {
			Validator.rules.smallerThan(0, 1).should.be.true;
		});
		it('1 should fail for 1', function() {
			Validator.rules.smallerThan(1, 1).should.be.false;
		});
		it('1 should fail for 2', function() {
			Validator.rules.smallerThan(2, 1).should.be.false;
		});
		it('1 should fail for null', function() {
			Validator.rules.smallerThan(null, 1).should.be.false;
		});
	});
	describe('biggerThan', function() {
		it('1 should fail for "a"', function() {
			Validator.rules.biggerThan("a", 1).should.be.false;
		});
		it('1 should fail for 0', function() {
			Validator.rules.biggerThan(0, 1).should.be.false;
		});
		it('1 should fail for 1', function() {
			Validator.rules.biggerThan(1, 1).should.be.false;
		});
		it('1 should succeed for 2', function() {
			Validator.rules.biggerThan(2, 1).should.be.true;
		});
		it('1 should fail for null', function() {
			Validator.rules.biggerThan(null, 1).should.be.false;
		});
	});
	describe('range', function() {
		it('[3, 5] should fail for "a"', function() {
			Validator.rules.range("a", [3, 5]).should.be.false;
		});
		it('[3, 5] should fail for 0', function() {
			Validator.rules.range(0, [3, 5]).should.be.false;
		});
		it('[3, 5] should succeed for 3', function() {
			Validator.rules.range(3, [3, 5]).should.be.true;
		});
		it('[3, 5] should succeed for 5', function() {
			Validator.rules.range(5, [3, 5]).should.be.true;
		});
		it('[3, 5] should fail for null', function() {
			Validator.rules.range(null, [3, 5]).should.be.false;
		});
	});
	describe('is', function() {
		it('1 should fail for "a"', function() {
			Validator.rules.is("a", 1).should.be.false;
		});
		it('1 should fail for "1"', function() {
			Validator.rules.is("1", 1).should.be.false;
		});
		it('1 should succeed for 1', function() {
			Validator.rules.is(1, 1).should.be.true;
		});
		it('1 should fail for null', function() {
			Validator.rules.is(null, 1).should.be.false;
		});
	});
	describe('isnt', function() {
		it('1 should succeed for "a"', function() {
			Validator.rules.isnt("a", 1).should.be.true;
		});
		it('1 should succeed for "1"', function() {
			Validator.rules.isnt("1", 1).should.be.true;
		});
		it('1 should fail for 1', function() {
			Validator.rules.isnt(1, 1).should.be.false;
		});
		it('1 should succeed for null', function() {
			Validator.rules.isnt(null, 1).should.be.true;
		});
	});
	describe('pattern', function() {
		it('/^[a-z]$/ should fail for "A"', function() {
			Validator.rules.pattern("A", /^[a-z]$/).should.be.false;
		});
		it('/^[a-z]$/ should fail for "1"', function() {
			Validator.rules.pattern("1", /^[a-z]$/).should.be.false;
		});
		it('/^[a-z]$/ should succeed for "a"', function() {
			Validator.rules.pattern("a", /^[a-z]$/).should.be.true;
		});
		it('/^[a-z]$/ should fail for null', function() {
			Validator.rules.pattern(null, /^[a-z]$/).should.be.false;
		});
	});
});

describe('Validate method', function() {
	var pleaseValidateMe;
	describe('performs simple validation', function() {
		it('failed validation returns a message', function() {
			pleaseValidateMe = {
				name: "var",
				value: "",
				rules:{
					required: true
				}
			}
			should.exist(Validator.validate(pleaseValidateMe));
		});
		it('successful validation does not return a message', function() {
			pleaseValidateMe = {
				name: "var",
				value: "a",
				rules:{
					required: true
				}
			}
			Validator.validate(pleaseValidateMe).should.be.empty;
		});
	});
	describe('several validations on same attribute', function() {
		it('validation stops after first failed test', function() {
			pleaseValidateMe = {
				name: "var",
				value: "",
				rules:{
					required: true,
					minLength: 3
				}
			}
			var result = Validator.validate(pleaseValidateMe);
			should.exist(result);
			result.should.have.property('var').equal(Validator.messages.required());
		});
		it('validation continues after first test successful', function() {
			pleaseValidateMe = {
				name: "var",
				value: "a",
				rules:{
					required: true,
					minLength: 3
				}
			}
			var result = Validator.validate(pleaseValidateMe);
			should.exist(result);
			result.should.have.property('var').equal(Validator.messages.minLength(3));
		});
	});
	describe('validates two attributes', function() {
		it('failed validation on two attributes returns two messages', function() {
			pleaseValidateMe = [
				{
					name: "var",
					value: "",
					rules:{
						required: true
					}
				},
				{
					name: "var2",
					value: "",
					rules:{
						required: true
					}
				}
			]
			var result = Validator.validate(pleaseValidateMe);
			should.exist(result);
			result.should.have.property('var').equal(Validator.messages.required());
			result.should.have.property('var2').equal(Validator.messages.required());
		});
	});
	describe('complex validation', function() {
		it('complex validation', function() {
			pleaseValidateMe = [
				{
					name: "var",
					value: "",
					rules:{
						required: true
					}
				},
				{
					name: "var2",
					value: "a",
					rules:{
						required: true,
						minLength: 5
					}
				},
				{
					name: "var3",
					value: 3,
					rules:{
						required: true,
						range: [1, 2]
					}
				},
				{
					name: "var4",
					value: "123",
					rules:{
						pattern: /[a-z]*/
					}
				},
				{
					name: "var5",
					value: 1,
					rules:{
						required: true,
						is: "1"
					}
				}
			]
			var result = Validator.validate(pleaseValidateMe);
			should.exist(result);
		});
	});
	describe('override messages', function() {
		it('if a validation message is defined, the default one is not returned', function() {
			pleaseValidateMe = {
				name: "var",
				value: "",
				rules: {
					required: true
				},
				messages: {
					required: "var"
				}
			}
			var result = Validator.validate(pleaseValidateMe);
			should.exist(result);
			result.should.have.property('var').equal("var");
		});
	});
	describe('override default validation', function() {
		it('override default validation', function() {
			pleaseValidateMe = {
				name: "var",
				value: 0,
				rules: {
					required: function(){
						return this != 0;
					}
				},
				messages: {
					required: "not 0"
				}
			}
			var result = Validator.validate(pleaseValidateMe);
			should.exist(result);
			result.should.have.property('var').equal("not 0");
		});
	});
});
