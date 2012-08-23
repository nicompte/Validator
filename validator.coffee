# Outil de validtion d'un objet javascript.
#
# Même principe que jquery.validate
"use strict"

class Validator

  #### Méthode validate
  # Valide l'objet envoyé en paramètre.
  # Cet objet est soit un tableau, soit un seul objet, ayant la forme suivante :
  #
  #     {
  #       name: nom de l'élément à valider (obligatoire)
  #       value: valeur de l'objet à valider (obligatoire)
  #       rules: règles à vérifier (obligatoire)
  #       messages: messages associés aux rules (facultatif)
  #     }
  #
  # si une règle renvoie la valeur false, alors la fonction renvoie le message qui lui est associé (définie par le Validator, ou le message envoyé en paramètre)
  # une règle, est soit :
  #
  #
  #  * règle déjà définie, comme required, avec un paramètre pouvant être utile pour la validation (par exemple pour la règle min).
  #  * une règle existante surdéfinie, avec la fonction en paramètre. Le contexte de cette fonction est la propriété value. Attention, le contexte est un objet, et non une valeur primitive. Une conversion peut être nécessaire.
  #  * une règle if : si le paramètre est false, aucun test ne sera fait après celle-ci.
  #  * une règle pleaseValidateMe, qui renvoie le résultat de la fonction.
  #
  #
  @validate: (elements) ->
    elements = [elements] if Object.prototype.toString.apply(elements) isnt '[object Array]'
    errors = {}
    for element in elements
      doNotTest = false
      for rule, param of element.rules # tester for rule, param of element.rules
        if rule is 'if' then doNotTest = not element.rules[rule]
        if not doNotTest and rule is 'iAmNoSimpleRule' and not errors[element.name]?
          result = param()
          if result? then errors[element.name] = result
        else if not doNotTest and rule isnt 'if' and not errors[element.name]? and not (if typeof param is 'function' then param.call(element.value) else @rules[rule].call(null, element.value, param))
          errors[element.name] = element.messages?[rule] ? (if typeof param isnt 'function' then @messages[rule].call(null, param) else @messages[rule].call(null, null))
    errors

  #### Patterns
  @patterns:
    digits: /^\d+$/
    number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/
    dateFR: /^\d{1,2}\/\d{1,2}\/\d{4}$/
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

  #### Helpers, nécessaires pour des conversions ou autre
  @helpers:
    dateToDateFR: (date) ->
      Validator.helpers.formatDateFR "#{date.getDate()}/#{parseInt(date.getMonth()+1, 10)}/#{date.getFullYear()}"
    formatDateFR: (date) ->
      adata = date.split('/')
      gg = if parseInt(adata[0],10) < 10 then '' + '0' + adata[0] else adata[0]
      mm = if parseInt(adata[1],10) < 10 then '' + '0' + adata[1] else adata[1]
      aaaa = adata[2]
      gg + '/' + mm + '/' + aaaa
    dateFRToDate: (dateFR) ->
      adata = dateFR.split('/')
      [gg, mm, aaaa] = [parseInt(adata[0],10), parseInt(adata[1],10), parseInt(adata[2],10)]
      new Date(aaaa, mm-1, gg)

  #### Règles
  @rules:
    # Requis
    required: (value) ->
      return value isnt '' and not /^\s*$/.test(value) if typeof value is 'string'
      value?
    # Taille maximale
    maxLength: (value, param) ->
      value.length <= param

    # Taille minimale
    minLength: (value, param) ->
      value.length >= param

    # Tailel de a à b
    rangeLength: (value, param) ->
      param[0] <= value.length <= param[1]

    # Validant le pattern en paramètre
    pattern: (value, param) ->
      param.test(value)

    # Une liste de chiffres
    digits: (value) ->
      Validator.patterns.digits.test(value)

    # Présent parmi les valeurs en paramètre
    in: (value, param) ->
      value in param

    # Non présent parmi les valeurs en paramètre
    notIn: (value, param) ->
      value not in param

    # Est un nombre
    number: (value) ->
      Validator.patterns.number.test(value)

    # Est une date au format français (20/12/2005)
    dateFR: (value) ->
      if Validator.patterns.dateFR.test(value)
        adata = value.split('/')
        [gg, mm, aaaa] = [parseInt(adata[0],10), parseInt(adata[1],10), parseInt(adata[2],10)]
        xdata = new Date(aaaa, mm-1, gg)
        ( xdata.getFullYear() is aaaa ) and ( xdata.getMonth() is mm - 1 ) and ( xdata.getDate() is gg )
      else false

    # Est inférieur ou égal à
    min: (value, param) ->
      parseInt(value, 10) >= parseInt(param, 10)

    # Est supérieur ou égal à
    max: (value, param) ->
      parseInt(value, 10) <= parseInt(param, 10)

    # Est strictement supérieur à
    biggerThan: (value, param) ->
      parseInt(value, 10) > parseInt(param, 10)

    # Est strictement inférieur à
    smallerThan: (value, param) ->
      parseInt(value, 10) < parseInt(param, 10)

    # Est Compris entre a et b (inclus)
    range: (value, param) ->
      param[0] <= value <= param[1]

    # Est un email
    email: (value) ->
      Validator.patterns.email.test(value)

    # Est une url
    url: (value) ->
      Validator.patterns.url.test(value)

    # Est
    is: (value, param) ->
      value is param

    # N'est pas
    isnt: (value, param) ->
      value isnt param

    # Est postérieur ou égal au
    minDateFR: (value, param) ->
      Validator.helpers.dateFRToDate(value) >= Validator.helpers.dateFRToDate(param)

    # Est antérieur ou égal au
    maxDateFR: (value, param) ->
      Validator.helpers.dateFRToDate(value) <= Validator.helpers.dateFRToDate(param)

    # A la propriété envoyé en paramètre
    has: (value, param) ->
      hasOwnProperty.call(value, param)

    # Est un nombre
    isNumber: (value) ->
      toString.call(value) is '[object Number]'

    # Est une fonction
    isFunction: (value) ->
      toString.call(value) is '[object Function]'

    # Est une chaîne de caractères
    isString: (value) ->
      toString.call(value) is '[object String]'

    # Est une booléen
    isBoolean: (value) ->
      value is true or value is false or toString.call(value) is '[object Boolean]'

    # Est une date
    isDate: (value) ->
      toString.call(value) is '[object Date]'

    # Est un tableau
    isArray: (value) ->
      toString.call(value) is '[object Array]'

    # Est une éxpression régulière
    isRegExp: (value) ->
      toString.call(value) is '[object RegExp]'

    # Est vide
    isEmpty: (value) ->
      return value.length is 0 if Validator.rules.isArray(value) or Validator.rules.isString(value)
      return false for own key of value
      true

    # N'est pas vide
    isNotEmpty: (value) ->
      not Validator.rules.isEmpty(value)

    # Est un élément du dom
    isElement: (value) ->
      value and value.nodeType is 1

    # Est une propriété arguments
    isArguments: (value) ->
      value and value.callee

    # N'est pas défini
    isUndefined: (value) ->
      value is undefined

    # Est null
    isNull: (value) ->
      value is null

    # Est NaN
    isNan: (value) ->
      value isnt value

  #### Messages
  @messages:
    required: -> "Veuillez renseigner ce champ."
    maxLength: (param) -> "Veuillez saisir au maximum #{param} caract&egrave;res."
    minLength: (param) -> "Veuillez saisir au minimum #{param} caract&egrave;res."
    rangeLength: (param) -> "Veuillez saisir entre #{param[0]} et #{param[1]} caract&egrave;res."
    number: -> "Veuillez saisir un nombre."
    digits: -> "Veuillez saisir un nombre entier."
    min: (param) -> "Veuillez saisir un nombre sup&eacute;rieur ou &eacute;gal &agrave; #{param}."
    max: (param) -> "Veuillez saisir un nombre inf&eacute;rieur ou &eacute;gal &agrave; #{param}."
    range: (param) -> "Veuillez saisir un nombre entre #{param[0]} et #{param[1]}."
    email: -> "Veuillez saisir un email valide."
    url: -> "Veuillez saisir une url valide."
    dateFR: -> "Veuillez saisir une date valide."
    in: (param) -> "Veuillez saisir une valeur parmi" + ( ' ' + p for p in param ) + "." #Quick'n dirty
    notIn: (param) -> "Veuillez saisir une valeur non pr&eacute;sente parmi" + ( ' ' + p for p in param ) + "." #Quick'n dirty II
    biggerThan: -> "Veuillez saisir un nombre sup&eacute;rieur ou &eacute;gal &agrave; #{param}"
    smallerThan: -> "Veuillez saisir un nombre inf&eacute;rieur &agrave; #{param}"
    is: (param) -> "Veuillez saisir une valeur &eacute;gale &agrave; #{param}"
    isnt: (param) -> "Veuillez saisir une valeur diff&eacute;rente de #{param}"
    minDateFR: (param) -> "Veuillez saisir une date sup&eacute;rieure ou &eacute;gale au #{Validator.helpers.formatDateFR(param)}."
    minDateFRtoday: -> "Veuillez saisir une date sup&eacute;rieure ou &eacute;gale &agrave; la date du jour."
    maxDateFR: (param) -> "Veuillez saisir une date inf&eacute;rieure ou &eacute;gale au #{Validator.helpers.formatDateFR(param)}."

  #### Permet d'ajouter une règle
  @addRule: (rule) ->
    @rules[rule[0]] = rule[1]
    @messages[rule[0]] = rule[2]

# Rend accessible à la variable exports, ou la variable this
root = exports ? this
root.Validator = Validator