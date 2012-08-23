(function() {
  "use strict";

  var Validator, root,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty;

  Validator = (function() {

    function Validator() {}

    Validator.validate = function(elements) {
      var doNotTest, element, errors, param, result, rule, _i, _len, _ref, _ref1, _ref2;
      if (Object.prototype.toString.apply(elements) !== '[object Array]') {
        elements = [elements];
      }
      errors = {};
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        doNotTest = false;
        _ref = element.rules;
        for (rule in _ref) {
          param = _ref[rule];
          if (rule === 'if') {
            doNotTest = !element.rules[rule];
          }
          if (!doNotTest && rule === 'iAmNoSimpleRule' && !(errors[element.name] != null)) {
            result = param();
            if (result != null) {
              errors[element.name] = result;
            }
          } else if (!doNotTest && rule !== 'if' && !(errors[element.name] != null) && !(typeof param === 'function' ? param.call(element.value) : this.rules[rule].call(null, element.value, param))) {
            errors[element.name] = (_ref1 = (_ref2 = element.messages) != null ? _ref2[rule] : void 0) != null ? _ref1 : (typeof param !== 'function' ? this.messages[rule].call(null, param) : this.messages[rule].call(null, null));
          }
        }
      }
      return errors;
    };

    Validator.patterns = {
      digits: /^\d+$/,
      number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
      dateFR: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
      url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    };

    Validator.helpers = {
      dateToDateFR: function(date) {
        return Validator.helpers.formatDateFR("" + (date.getDate()) + "/" + (parseInt(date.getMonth() + 1, 10)) + "/" + (date.getFullYear()));
      },
      formatDateFR: function(date) {
        var aaaa, adata, gg, mm;
        adata = date.split('/');
        gg = parseInt(adata[0], 10) < 10 ? '' + '0' + adata[0] : adata[0];
        mm = parseInt(adata[1], 10) < 10 ? '' + '0' + adata[1] : adata[1];
        aaaa = adata[2];
        return gg + '/' + mm + '/' + aaaa;
      },
      dateFRToDate: function(dateFR) {
        var aaaa, adata, gg, mm, _ref;
        adata = dateFR.split('/');
        _ref = [parseInt(adata[0], 10), parseInt(adata[1], 10), parseInt(adata[2], 10)], gg = _ref[0], mm = _ref[1], aaaa = _ref[2];
        return new Date(aaaa, mm - 1, gg);
      }
    };

    Validator.rules = {
      required: function(value) {
        if (typeof value === 'string') {
          return value !== '' && !/^\s*$/.test(value);
        }
        return value != null;
      },
      maxLength: function(value, param) {
        return value.length <= param;
      },
      minLength: function(value, param) {
        return value.length >= param;
      },
      rangeLength: function(value, param) {
        var _ref;
        return (param[0] <= (_ref = value.length) && _ref <= param[1]);
      },
      pattern: function(value, param) {
        return param.test(value);
      },
      digits: function(value) {
        return Validator.patterns.digits.test(value);
      },
      "in": function(value, param) {
        return __indexOf.call(param, value) >= 0;
      },
      notIn: function(value, param) {
        return __indexOf.call(param, value) < 0;
      },
      number: function(value) {
        return Validator.patterns.number.test(value);
      },
      dateFR: function(value) {
        var aaaa, adata, gg, mm, xdata, _ref;
        if (Validator.patterns.dateFR.test(value)) {
          adata = value.split('/');
          _ref = [parseInt(adata[0], 10), parseInt(adata[1], 10), parseInt(adata[2], 10)], gg = _ref[0], mm = _ref[1], aaaa = _ref[2];
          xdata = new Date(aaaa, mm - 1, gg);
          return (xdata.getFullYear() === aaaa) && (xdata.getMonth() === mm - 1) && (xdata.getDate() === gg);
        } else {
          return false;
        }
      },
      min: function(value, param) {
        return parseInt(value, 10) >= parseInt(param, 10);
      },
      max: function(value, param) {
        return parseInt(value, 10) <= parseInt(param, 10);
      },
      biggerThan: function(value, param) {
        return parseInt(value, 10) > parseInt(param, 10);
      },
      smallerThan: function(value, param) {
        return parseInt(value, 10) < parseInt(param, 10);
      },
      range: function(value, param) {
        return (param[0] <= value && value <= param[1]);
      },
      email: function(value) {
        return Validator.patterns.email.test(value);
      },
      url: function(value) {
        return Validator.patterns.url.test(value);
      },
      is: function(value, param) {
        return value === param;
      },
      isnt: function(value, param) {
        return value !== param;
      },
      minDateFR: function(value, param) {
        return Validator.helpers.dateFRToDate(value) >= Validator.helpers.dateFRToDate(param);
      },
      maxDateFR: function(value, param) {
        return Validator.helpers.dateFRToDate(value) <= Validator.helpers.dateFRToDate(param);
      },
      has: function(value, param) {
        return hasOwnProperty.call(value, param);
      },
      isNumber: function(value) {
        return toString.call(value) === '[object Number]';
      },
      isFunction: function(value) {
        return toString.call(value) === '[object Function]';
      },
      isString: function(value) {
        return toString.call(value) === '[object String]';
      },
      isBoolean: function(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
      },
      isDate: function(value) {
        return toString.call(value) === '[object Date]';
      },
      isArray: function(value) {
        return toString.call(value) === '[object Array]';
      },
      isRegExp: function(value) {
        return toString.call(value) === '[object RegExp]';
      },
      isEmpty: function(value) {
        var key;
        if (Validator.rules.isArray(value) || Validator.rules.isString(value)) {
          return value.length === 0;
        }
        for (key in value) {
          if (!__hasProp.call(value, key)) continue;
          return false;
        }
        return true;
      },
      isNotEmpty: function(value) {
        return !Validator.rules.isEmpty(value);
      },
      isElement: function(value) {
        return value && value.nodeType === 1;
      },
      isArguments: function(value) {
        return value && value.callee;
      },
      isUndefined: function(value) {
        return value === void 0;
      },
      isNull: function(value) {
        return value === null;
      },
      isNan: function(value) {
        return value !== value;
      }
    };

    Validator.messages = {
      required: function() {
        return "Veuillez renseigner ce champ.";
      },
      maxLength: function(param) {
        return "Veuillez saisir au maximum " + param + " caract&egrave;res.";
      },
      minLength: function(param) {
        return "Veuillez saisir au minimum " + param + " caract&egrave;res.";
      },
      rangeLength: function(param) {
        return "Veuillez saisir entre " + param[0] + " et " + param[1] + " caract&egrave;res.";
      },
      number: function() {
        return "Veuillez saisir un nombre.";
      },
      digits: function() {
        return "Veuillez saisir un nombre entier.";
      },
      min: function(param) {
        return "Veuillez saisir un nombre sup&eacute;rieur ou &eacute;gal &agrave; " + param + ".";
      },
      max: function(param) {
        return "Veuillez saisir un nombre inf&eacute;rieur ou &eacute;gal &agrave; " + param + ".";
      },
      range: function(param) {
        return "Veuillez saisir un nombre entre " + param[0] + " et " + param[1] + ".";
      },
      email: function() {
        return "Veuillez saisir un email valide.";
      },
      url: function() {
        return "Veuillez saisir une url valide.";
      },
      dateFR: function() {
        return "Veuillez saisir une date valide.";
      },
      "in": function(param) {
        var p;
        return "Veuillez saisir une valeur parmi" + ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = param.length; _i < _len; _i++) {
            p = param[_i];
            _results.push(' ' + p);
          }
          return _results;
        })()) + ".";
      },
      notIn: function(param) {
        var p;
        return "Veuillez saisir une valeur non pr&eacute;sente parmi" + ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = param.length; _i < _len; _i++) {
            p = param[_i];
            _results.push(' ' + p);
          }
          return _results;
        })()) + ".";
      },
      biggerThan: function() {
        return "Veuillez saisir un nombre sup&eacute;rieur ou &eacute;gal &agrave; " + param;
      },
      smallerThan: function() {
        return "Veuillez saisir un nombre inf&eacute;rieur &agrave; " + param;
      },
      is: function(param) {
        return "Veuillez saisir une valeur &eacute;gale &agrave; " + param;
      },
      isnt: function(param) {
        return "Veuillez saisir une valeur diff&eacute;rente de " + param;
      },
      minDateFR: function(param) {
        return "Veuillez saisir une date sup&eacute;rieure ou &eacute;gale au " + (Validator.helpers.formatDateFR(param)) + ".";
      },
      minDateFRtoday: function() {
        return "Veuillez saisir une date sup&eacute;rieure ou &eacute;gale &agrave; la date du jour.";
      },
      maxDateFR: function(param) {
        return "Veuillez saisir une date inf&eacute;rieure ou &eacute;gale au " + (Validator.helpers.formatDateFR(param)) + ".";
      }
    };

    Validator.addRule = function(rule) {
      this.rules[rule[0]] = rule[1];
      return this.messages[rule[0]] = rule[2];
    };

    return Validator;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Validator = Validator;

}).call(this);
