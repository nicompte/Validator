# Validator

Javascript object validation, jquery.validate style.

## Setup

Add the source to your html page:
```html
  <script type="text/javascript" src="validator.js"></script>
```

Or require it in node:
```javascript
var Validator = require('validator.js').Validator;
```

## Usage

###Simple validation

This validation simply returns true or false.

```javascript
var Validator = require('validator.js').Validator;
var test = Validator.rules.required("I'm okay"); //true
````

### Object validation

Returns a message.

```javascript
// Object validation
var toBeTested = {
  banana: 123,
  apple: "am I too long?"
}

var test2 = validator.validate([
  {
    name: "banana",
    value: toBeTested.banana,
    rules: {
      required: true
    }
  },{
    name: "apple",
    value: toBeTested.apple,
    rules: {
      maxLength: 8
    },
    messages: {
      maxLength: "Argh..."
    }
  }
]); // test2.apple = "Argh..."

// or
var test2 = validator.validate(toBeTested, [
  {
    name: "banana",
    rules: {
      required: true
    }
  },{
    name: "apple",
    rules: {
      maxLength: 8
    },
    messages: {
      maxLength: "Argh..."
    }
  }
]); // test2.apple = "Argh..."
```