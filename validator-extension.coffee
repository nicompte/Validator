# Ajout des règles non génériques nécessaires à la validation dans npp

#### Ajout des patterns

# Nom de fichier (banane.pdf)
Validator.patterns.nomAlfresco = ///^
	(?:
	(?!(?:_J\d*_)) #Suffixe de jonction interdit
	(?:[^?\\\/*:|"<>]) #Caractères interdits
	)*
	[^\s\.?\\\/*:|"<>] #Caractère interdits + caractères interdits en fin de chaîne
	$///

# Nom d'une sous chemise d'une affaire évoluée (A1-A12)
Validator.patterns.nomSousChemiseAffaireEvoluee = ///^
	(A|(?:[B-C][a-z]{1,2})|[D-Z]) #Le préfixe, lettre en majuscule
	(\d{1,5}) #La borne inférieure, de 1 à 99999
	- #Séparateur
	(A|(?:[B-C][a-z]{1,2})|[D-Z]) #Le préfixe, lettre en majuscule
	(\d{1,5}) #La borne supérieure, de 1 à 99999
	$///

# Nom d'une chemise d'une affaire évoluée (E)
Validator.patterns.nomChemiseAffaireEvoluee = /^[A-Z]$/

# Nom d'une sous chemise de type B ou C (Ba)
Validator.patterns.nomSousChemiseBC = /^B|C[a-z]{1,2}$/

# Nom d'un fichier d'une affaire évoluée (A12-25.pdf)
Validator.patterns.nomFichierAffaireEvoluee = ///^
	(A|(?:[B-C][a-z]{1,2})|[D-Z]) #Le préfixe, lettre en majuscule
	(\d{1,5}) #La borne inférieure, de 1 à 99999
	(?:
		(?:-(\d{1,5})) #La borne supérieure, de 1 à 99999
		|
		(?:_p(\d*)-p(\d*)) #Ou les pages du fichier
	)?
	(?:.pdf)? #l'extension
	$///

#### Ajout des règles

# Ces règles correspondent aux patterns créés plus haut.

Validator.addRule([
	'nomAlfresco',
	(value) ->	Validator.patterns.nomAlfresco.test(value),
	-> "Caract&egrave;res non autoris&eacute;s : \"? : / \\ *\ | \ \" < >, et \" \" ou \".\" en fin de cha&icirc;ne."
])

Validator.addRule([
	'nomFichierAffaireEvoluee',
	(value) ->	Validator.patterns.nomFichierAffaireEvoluee.test(value),
	-> "Nommage du type : [pr&eacute;fixe, borne inf&eacute;rieure]-[borne sup&eacute;rieure] ex: A1-10 ou A1."
])

Validator.addRule([
	'nomSousChemiseAffaireEvoluee',
	(value) ->	Validator.patterns.nomSousChemiseAffaireEvoluee.test(value),
	-> "Nommage du type : [pr&eacute;fixe, borne inf&eacute;rieure]-[pr&eacute;fixe, borne sup&eacute;rieure] ex: A1-A10."
])

Validator.addRule([
	'nomChemiseAffaireEvoluee',
	(value) ->	Validator.patterns.nomChemiseAffaireEvoluee.test(value),
	-> "Un seul caract&egrave;re alphab&eacute;tique majuscule."
])

Validator.addRule([
	'nomSousChemiseBC',
	(value) ->	Validator.patterns.nomSousChemiseBC.test(value),
	-> "Un caract&egrave;re alphab&eacute;tique majuscule, puis un ou deux caract&egrave;res minuscules."
])
