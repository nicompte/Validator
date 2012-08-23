(function() {

  Validator.patterns.nomAlfresco = /^(?:(?!(?:_J\d*_))(?:[^?\\\\/*:|"<>]))*[^\s\.?\\\\/*:|"<>]$/;

  Validator.patterns.nomSousChemiseAffaireEvoluee = /^(A|(?:[B-C][a-z]{1,2})|[D-Z])(\d{1,5})-(A|(?:[B-C][a-z]{1,2})|[D-Z])(\d{1,5})$/;

  Validator.patterns.nomChemiseAffaireEvoluee = /^[A-Z]$/;

  Validator.patterns.nomSousChemiseBC = /^B|C[a-z]{1,2}$/;

  Validator.patterns.nomFichierAffaireEvoluee = /^(A|(?:[B-C][a-z]{1,2})|[D-Z])(\d{1,5})(?:(?:-(\d{1,5}))|(?:_p(\d*)-p(\d*)))?(?:.pdf)?$/;

  Validator.addRule([
    'nomAlfresco', function(value) {
      return Validator.patterns.nomAlfresco.test(value);
    }, function() {
      return "Caract&egrave;res non autoris&eacute;s : \"? : / \\ *\ | \ \" < >, et \" \" ou \".\" en fin de cha&icirc;ne.";
    }
  ]);

  Validator.addRule([
    'nomFichierAffaireEvoluee', function(value) {
      return Validator.patterns.nomFichierAffaireEvoluee.test(value);
    }, function() {
      return "Nommage du type : [pr&eacute;fixe, borne inf&eacute;rieure]-[borne sup&eacute;rieure] ex: A1-10 ou A1.";
    }
  ]);

  Validator.addRule([
    'nomSousChemiseAffaireEvoluee', function(value) {
      return Validator.patterns.nomSousChemiseAffaireEvoluee.test(value);
    }, function() {
      return "Nommage du type : [pr&eacute;fixe, borne inf&eacute;rieure]-[pr&eacute;fixe, borne sup&eacute;rieure] ex: A1-A10.";
    }
  ]);

  Validator.addRule([
    'nomChemiseAffaireEvoluee', function(value) {
      return Validator.patterns.nomChemiseAffaireEvoluee.test(value);
    }, function() {
      return "Un seul caract&egrave;re alphab&eacute;tique majuscule.";
    }
  ]);

  Validator.addRule([
    'nomSousChemiseBC', function(value) {
      return Validator.patterns.nomSousChemiseBC.test(value);
    }, function() {
      return "Un caract&egrave;re alphab&eacute;tique majuscule, puis un ou deux caract&egrave;res minuscules.";
    }
  ]);

}).call(this);
