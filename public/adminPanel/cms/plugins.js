/* https://getaddress.io/js/jquery.getAddress-2.0.1.min.js */
(function(n){"use strict";function t(t){var r,i;this.config={};n.extend(this,u);t&&n.extend(this,t);r={};for(i in this.output_fields)this.output_fields[i]!==undefined&&(r[i]=n(this.output_fields[i]));this.$output_fields=r}var i=[],r,u={api_key:"",output_fields:{line_1:"#line1",line_2:"#line2",line_3:"#line3",post_town:"#town",county:"#county",postcode:"#postcode"},api_endpoint:"https://api.getAddress.io/v2/uk",input:undefined,$input:undefined,input_label:"Enter your Postcode",input_muted_style:"color:#CBCBCB;",input_class:"",input_id:"opc_input",button:undefined,$button:undefined,button_id:"opc_button",button_label:"Find your Address",button_class:"",button_disabled_message:"Fetching Addresses...",$dropdown:undefined,dropdown_id:"opc_dropdown",dropdown_select_message:"Select your Address",dropdown_class:"",$error_message:undefined,error_message_id:"opc_error_message",error_message_postcode_invalid:"Please recheck your postcode, it seems to be incorrect",error_message_postcode_not_found:"Your postcode could not be found. Please type in your address",error_message_default:"We were not able to your address from your Postcode. Please input your address manually",error_message_class:"",lookup_interval:1e3,debug_mode:!1,onLookupSuccess:undefined,onLookupError:undefined,onAddressSelected:undefined};Array.prototype.clean=function(n){for(var t=0;t<this.length;t++)this[t]==n&&(this.splice(t,1),t--);return this};String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});t.prototype.setupPostcodeInput=function(n){this.$context=n;this.setupInputField();this.setupLookupButton()};t.prototype.setupInputField=function(){var t=this;return this.$input=n(this.input).length?n(this.input).first():n("<input />",{type:"text",id:this.input_id,value:this.input_label}).appendTo(this.$context).addClass(this.input_class).val(this.input_label).attr("style",this.input_muted_style).attr("autocomplete","off").submit(function(){return!1}).keypress(function(n){n.which===13&&t.$button.trigger("click")}).focus(function(){t.$input.removeAttr("style").val("")}).blur(function(){t.$input.val()||(t.$input.val(t.input_label),t.$input.attr("style",t.input_muted_style))}),this.$input};t.prototype.setupLookupButton=function(){var t=this;return this.$button=n(this.button).length?n(this.button).first():n("<button />",{html:this.button_label,id:this.button_id,type:"button"}).appendTo(this.$context).addClass(this.button_class).attr("onclick","return false;").submit(function(){return!1}),this.$button.click(function(){var n=t.$input.val();t.disableLookup();t.clearAll();t.lookupPostcode(n)}),this.$button};t.prototype.disableLookup=function(n){n=n||this.button_disabled_message;this.$button.prop("disabled",!0).html(n)};t.prototype.enableLookup=function(){var n=this;n.lookup_interval===0?n.$button.prop("disabled",!1).html(n.button_label):setTimeout(function(){n.$button.prop("disabled",!1).html(n.button_label)},n.lookup_interval)};t.prototype.clearAll=function(){this.setDropDown();this.setErrorMessage();this.setAddressFields()};t.prototype.removeAll=function(){this.$context=null;n.each([this.$input,this.$button,this.$dropdown,this.$error_message],function(n,t){t&&t.remove()})};t.prototype.lookupPostcode=function(t){var i=this;if(!n.getAddress.validatePostcodeFormat(t))return this.enableLookup(),i.setErrorMessage(this.error_message_postcode_invalid);n.getAddress.lookupPostcode(t,i.api_key,function(n){if(i.enableLookup(),i.setDropDown(n.Addresses,t),i.onLookupSuccess)i.onLookupSuccess(n)},function(n){n.status==404?i.setErrorMessage(i.error_message_postcode_not_found):i.setErrorMessage("Unable to connect to server");i.enableLookup();i.onLookupError&&i.onLookupError()})};t.prototype.setDropDown=function(t,i){var r=this,u,e,f;if(this.$dropdown&&this.$dropdown.length&&(this.$dropdown.remove(),delete this.$dropdown),t){for(u=n("<select />",{id:r.dropdown_id}).addClass(r.dropdown_class),n("<option />",{value:"open",text:r.dropdown_select_message}).appendTo(u),e=t.length,f=0;f<e;f+=1){var o=t[f].split(","),s=o.clean(!1),h=s.join(",");n("<option />",{value:f,text:h}).appendTo(u)}return u.appendTo(r.$context).change(function(){var u=n(this).val();u>=0&&(r.setAddressFields(t[u],i),r.onAddressSelected&&r.onAddressSelected.call(this,t[u]))}),r.$dropdown=u,u}};t.prototype.setErrorMessage=function(t){if(this.$error_message&&this.$error_message.length&&(this.$error_message.remove(),delete this.$error_message),t)return this.$error_message=n("<p />",{html:t,id:this.error_message_id}).addClass(this.error_message_class).appendTo(this.$context),this.$error_message};t.prototype.setAddressFields=function(n,t){var r,i;for(r in this.$output_fields)this.$output_fields[r].val("");n&&(i=n.split(","),this.$output_fields.line_1.val(i[0].trim()||""),this.$output_fields.line_2.val(i[1].trim()||""),i[2].trim()&&i[3].trim()?this.$output_fields.line_3.val(i[2].trim()+", "+i[3].trim()):i[2].trim()?this.$output_fields.line_3.val(i[2].trim()||""):i[3].trim()&&this.$output_fields.line_3.val(i[3].trim()||""),i[4].trim()&&i[5].trim()?this.$output_fields.post_town.val(i[4].trim()+", "+i[5].trim()):i[5].trim()?this.$output_fields.post_town.val(i[5].trim()||""):i[4].trim()&&this.$output_fields.post_town.val(i[4].trim()||""),this.$output_fields.county.val(i[6].trim()||""),t&&(t=t.toUpperCase().trim()),this.$output_fields.postcode.val(t||""))};n.getAddress={defaults:function(){return u},setup:function(n){r=new t(n);i.push(r)},validatePostcodeFormat:function(n){return!!n.match(/^[a-zA-Z0-9]{1,4}\s?\d[a-zA-Z]{2}$/)},lookupPostcode:function(t,i,r,f){var o=u.api_endpoint,s=[o,t].join("/"),e={url:s,data:{"api-key":i},dataType:"json",timeout:3e5,success:r};f&&(e.error=f);n.ajax(e)},clearAll:function(){for(var t=i.length,n=0;n<t;n+=1)i[n].removeAll()}};n.fn.getAddress=function(u){if(u){var f=new t(u);i.push(f);f.setupPostcodeInput(n(this))}else r.setupPostcodeInput(n(this));return this}})(jQuery);

/** File generated by Grunt -- do not modify
 *  JQUERY-FORM-VALIDATOR
 *
 *  @version 2.3.03
 *  @website http://formvalidator.net/
 *  @author Victor Jonsson, http://victorjonsson.se
 *  @license MIT
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){!function(a,b){"use strict";function c(b){b&&"custom"===b.errorMessagePosition&&"function"==typeof b.errorMessageCustom&&(a.formUtils.warn("Use of deprecated function errorMessageCustom, use config.submitErrorMessageCallback instead"),b.submitErrorMessageCallback=function(a,c){b.errorMessageCustom(a,b.language.errorTitle,c,b)})}function d(b){if(b.errorMessagePosition&&"object"==typeof b.errorMessagePosition){a.formUtils.warn("Deprecated use of config parameter errorMessagePosition, use config.submitErrorMessageCallback instead");var c=b.errorMessagePosition;b.errorMessagePosition="top",b.submitErrorMessageCallback=function(){return c}}}function e(b){var c=b.find("[data-validation-if-checked]");c.length&&a.formUtils.warn('Detected use of attribute "data-validation-if-checked" which is deprecated. Use "data-validation-depends-on" provided by module "logic"'),c.on("beforeValidation",function(){var c=a(this),d=c.valAttr("if-checked"),e=a('input[name="'+d+'"]',b),f=e.is(":checked"),g=(a.formUtils.getValue(e)||"").toString(),h=c.valAttr("if-checked-value");(!f||h&&h!==g)&&c.valAttr("skipped",!0)})}a.fn.validateForm=function(b,c){return a.formUtils.warn("Use of deprecated function $.validateForm, use $.isValid instead"),this.isValid(b,c,!0)},a(window).on("validatorsLoaded formValidationSetup",function(b,f,g){f||(f=a("form")),c(g),d(g),e(f)})}(a),function(a){"use strict";var b={resolveErrorMessage:function(a,b,c,d,e){var f=d.validationErrorMsgAttribute+"-"+c.replace("validate_",""),g=a.attr(f);return g||(g=a.attr(d.validationErrorMsgAttribute),g||(g="function"!=typeof b.errorMessageKey?e[b.errorMessageKey]:e[b.errorMessageKey(d)],g||(g=b.errorMessage))),g},getParentContainer:function(b){if(b.valAttr("error-msg-container"))return a(b.valAttr("error-msg-container"));var c=b.parent();if(!c.hasClass("form-group")&&!c.closest("form").hasClass("form-horizontal")){var d=c.closest(".form-group");if(d.length)return d.eq(0)}return c},applyInputErrorStyling:function(a,b){a.addClass(b.errorElementClass).removeClass("valid"),this.getParentContainer(a).addClass(b.inputParentClassOnError).removeClass(b.inputParentClassOnSuccess),""!==b.borderColorOnError&&a.css("border-color",b.borderColorOnError)},applyInputSuccessStyling:function(a,b){a.addClass("valid"),this.getParentContainer(a).addClass(b.inputParentClassOnSuccess)},removeInputStylingAndMessage:function(a,c){a.removeClass("valid").removeClass(c.errorElementClass).css("border-color","");var d=b.getParentContainer(a);if(d.removeClass(c.inputParentClassOnError).removeClass(c.inputParentClassOnSuccess),"function"==typeof c.inlineErrorMessageCallback){var e=c.inlineErrorMessageCallback(a,c);e&&e.html("")}else d.find("."+c.errorMessageClass).remove()},removeAllMessagesAndStyling:function(c,d){if("function"==typeof d.submitErrorMessageCallback){var e=d.submitErrorMessageCallback(c,d);e&&e.html("")}else c.find("."+d.errorMessageClass+".alert").remove();c.find("."+d.errorElementClass+",.valid").each(function(){b.removeInputStylingAndMessage(a(this),d)})},setInlineMessage:function(b,c,d){this.applyInputErrorStyling(b,d);var e,f=document.getElementById(b.attr("name")+"_err_msg"),g=!1,h=function(d){a.formUtils.$win.trigger("validationErrorDisplay",[b,d]),d.html(c)},i=function(){var f=!1;g.find("."+d.errorMessageClass).each(function(){return this.inputReferer===b[0]?(f=a(this),!1):void 0}),f?c?h(f):f.remove():""!==c&&(e=a('<div class="'+d.errorMessageClass+' alert"></div>'),h(e),e[0].inputReferer=b[0],g.prepend(e))};if(f)a.formUtils.warn("Using deprecated element reference "+f.id),g=a(f),i();else if("function"==typeof d.inlineErrorMessageCallback){if(g=d.inlineErrorMessageCallback(b,d),!g)return;i()}else{var j=this.getParentContainer(b);e=j.find("."+d.errorMessageClass+".help-block"),0===e.length&&(e=a("<span></span>").addClass("help-block").addClass(d.errorMessageClass),e.appendTo(j)),h(e)}},setMessageInTopOfForm:function(b,c,d,e){var f='<div class="{errorMessageClass} alert alert-danger"><strong>{errorTitle}</strong><ul>{fields}</ul></div>',g=!1;if("function"!=typeof d.submitErrorMessageCallback||(g=d.submitErrorMessageCallback(b,c,d))){var h={errorTitle:e.errorTitle,fields:"",errorMessageClass:d.errorMessageClass};a.each(c,function(a,b){h.fields+="<li>"+b+"</li>"}),a.each(h,function(a,b){f=f.replace("{"+a+"}",b)}),g?g.html(f):b.children().eq(0).before(a(f))}}};a.formUtils=a.extend(a.formUtils||{},{dialogs:b})}(a),function(a,b,c){"use strict";var d=0;a.fn.validateOnBlur=function(b,c){var d=this,e=this.find("*[data-validation]");return e.each(function(){var e=a(this);if(e.is("[type=radio]")){var f=d.find('[type=radio][name="'+e.attr("name")+'"]');f.bind("blur.validation",function(){e.validateInputOnBlur(b,c,!0,"blur")}),c.validateCheckboxRadioOnClick&&f.bind("click.validation",function(){e.validateInputOnBlur(b,c,!0,"click")})}}),e.bind("blur.validation",function(){a(this).validateInputOnBlur(b,c,!0,"blur")}),c.validateCheckboxRadioOnClick&&this.find("input[type=checkbox][data-validation],input[type=radio][data-validation]").bind("click.validation",function(){a(this).validateInputOnBlur(b,c,!0,"click")}),this},a.fn.validateOnEvent=function(b,c){var d="FORM"===this[0].nodeName?this.find("*[data-validation-event]"):this;return d.each(function(){var d=a(this),e=d.valAttr("event");e&&d.unbind(e+".validation").bind(e+".validation",function(d){9!==(d||{}).keyCode&&a(this).validateInputOnBlur(b,c,!0,e)})}),this},a.fn.showHelpOnFocus=function(b){return b||(b="data-validation-help"),this.find(".has-help-txt").valAttr("has-keyup-event",!1).removeClass("has-help-txt"),this.find("textarea,input").each(function(){var c=a(this),e="jquery_form_help_"+ ++d,f=c.attr(b);f&&c.addClass("has-help-txt").unbind("focus.help").bind("focus.help",function(){var b=c.parent().find("."+e);0===b.length&&(b=a("<span />").addClass(e).addClass("help").addClass("help-block").text(f).hide(),c.after(b)),b.fadeIn()}).unbind("blur.help").bind("blur.help",function(){a(this).parent().find("."+e).fadeOut("slow")})}),this},a.fn.validate=function(b,c,d){var e=a.extend({},a.formUtils.LANG,d||{});this.each(function(){var d=a(this),f=d.closest("form").get(0).validationConfig||{};d.one("validation",function(a,c){"function"==typeof b&&b(c,this,a)}),d.validateInputOnBlur(e,a.extend({},f,c||{}),!0)})},a.fn.willPostponeValidation=function(){return(this.valAttr("suggestion-nr")||this.valAttr("postpone")||this.hasClass("hasDatepicker"))&&!b.postponedValidation},a.fn.validateInputOnBlur=function(c,d,e,f){if(a.formUtils.eventType=f,this.willPostponeValidation()){var g=this,h=this.valAttr("postpone")||200;return b.postponedValidation=function(){g.validateInputOnBlur(c,d,e,f),b.postponedValidation=!1},setTimeout(function(){b.postponedValidation&&b.postponedValidation()},h),this}c=a.extend({},a.formUtils.LANG,c||{}),a.formUtils.dialogs.removeInputStylingAndMessage(this,d);var i=this,j=i.closest("form"),k=a.formUtils.validateInput(i,c,d,j,f);return e&&i.unbind("keyup.validation"),k.shouldChangeDisplay&&(k.isValid?a.formUtils.dialogs.applyInputSuccessStyling(i,d):a.formUtils.dialogs.setInlineMessage(i,k.errorMsg,d)),!k.isValid&&e&&i.bind("keyup.validation",function(b){9!==b.keyCode&&a(this).validateInputOnBlur(c,d,!1,"keyup")}),this},a.fn.valAttr=function(a,b){return b===c?this.attr("data-validation-"+a):b===!1||null===b?this.removeAttr("data-validation-"+a):(a=a.length>0?"-"+a:"",this.attr("data-validation"+a,b))},a.fn.isValid=function(b,c,d){if(a.formUtils.isLoadingModules){var e=this;return setTimeout(function(){e.isValid(b,c,d)},200),null}c=a.extend({},a.formUtils.defaultConfig(),c||{}),b=a.extend({},a.formUtils.LANG,b||{}),d=d!==!1,a.formUtils.errorDisplayPreventedWhenHalted&&(delete a.formUtils.errorDisplayPreventedWhenHalted,d=!1),a.formUtils.isValidatingEntireForm=!0,a.formUtils.haltValidation=!1;var f=function(b,e){a.inArray(b,h)<0&&h.push(b),i.push(e),e.attr("current-error",b),d&&a.formUtils.dialogs.applyInputErrorStyling(e,c)},g=[],h=[],i=[],j=this,k=function(b,d){return"submit"===d||"button"===d||"reset"===d?!0:a.inArray(b,c.ignore||[])>-1};if(d&&a.formUtils.dialogs.removeAllMessagesAndStyling(j,c),j.find("input,textarea,select").filter(':not([type="submit"],[type="button"])').each(function(){var d=a(this),e=d.attr("type"),h="radio"===e||"checkbox"===e,i=d.attr("name");if(!k(i,e)&&(!h||a.inArray(i,g)<0)){h&&g.push(i);var l=a.formUtils.validateInput(d,b,c,j,"submit");l.shouldChangeDisplay&&(l.isValid?l.isValid&&(d.valAttr("current-error",!1),a.formUtils.dialogs.applyInputSuccessStyling(d,c)):f(l.errorMsg,d))}}),"function"==typeof c.onValidate){var l=c.onValidate(j);a.isArray(l)?a.each(l,function(a,b){f(b.message,b.element)}):l&&l.element&&l.message&&f(l.message,l.element)}return a.formUtils.isValidatingEntireForm=!1,!a.formUtils.haltValidation&&i.length>0?(d&&("top"===c.errorMessagePosition?a.formUtils.dialogs.setMessageInTopOfForm(j,h,c,b):a.each(i,function(b,d){a.formUtils.dialogs.setInlineMessage(d,d.attr("current-error"),c)}),c.scrollToTopOnError&&a.formUtils.$win.scrollTop(j.offset().top-20)),!1):(!d&&a.formUtils.haltValidation&&(a.formUtils.errorDisplayPreventedWhenHalted=!0),!a.formUtils.haltValidation)},a.fn.restrictLength=function(b){return new a.formUtils.lengthRestriction(this,b),this},a.fn.addSuggestions=function(b){var c=!1;return this.find("input").each(function(){var d=a(this);c=a.split(d.attr("data-suggestions")),c.length>0&&!d.hasClass("has-suggestions")&&(a.formUtils.suggest(d,c,b),d.addClass("has-suggestions"))}),this}}(a,window),function(a){"use strict";a.formUtils=a.extend(a.formUtils||{},{isLoadingModules:!1,loadedModules:{},loadModules:function(b,c,d){if(a.formUtils.isLoadingModules)return void setTimeout(function(){a.formUtils.loadModules(b,c,d)},10);var e=!1,f=function(b,c){var f=a.split(b),g=f.length,h=function(){g--,0===g&&(a.formUtils.isLoadingModules=!1,d&&e&&"function"==typeof d&&d())};g>0&&(a.formUtils.isLoadingModules=!0);var i="?_="+(new Date).getTime(),j=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];a.each(f,function(b,d){if(d=a.trim(d),0===d.length)h();else{var f=c+d+(".js"===d.slice(-3)?"":".js"),g=document.createElement("SCRIPT");f in a.formUtils.loadedModules?h():(a.formUtils.loadedModules[f]=1,e=!0,g.type="text/javascript",g.onload=h,g.src=f+(".dev.js"===f.slice(-7)?i:""),g.onerror=function(){a.formUtils.warn("Unable to load form validation module "+f)},g.onreadystatechange=function(){"complete"!==this.readyState&&"loaded"!==this.readyState||(h(),this.onload=null,this.onreadystatechange=null)},j.appendChild(g))}})};if(c)f(b,c);else{var g=function(){var c=!1;return a('script[src*="form-validator"]').each(function(){return c=this.src.substr(0,this.src.lastIndexOf("/"))+"/","/"===c&&(c=""),!1}),c!==!1?(f(b,c),!0):!1};g()||a(g)}}})}(a),function(a){"use strict";a.split=function(b,c){if("function"!=typeof c){if(!b)return[];var d=[];return a.each(b.split(c?c:/[,|\-\s]\s*/g),function(b,c){c=a.trim(c),c.length&&d.push(c)}),d}b&&a.each(b.split(/[,|\-\s]\s*/g),function(b,d){return d=a.trim(d),d.length?c(d,b):void 0})},a.validate=function(b){var c=a.extend(a.formUtils.defaultConfig(),{form:"form",validateOnEvent:!1,validateOnBlur:!0,validateCheckboxRadioOnClick:!0,showHelpOnFocus:!0,addSuggestions:!0,modules:"",onModulesLoaded:null,language:!1,onSuccess:!1,onError:!1,onElementValidate:!1});if(b=a.extend(c,b||{}),b.lang&&"en"!==b.lang){var d="lang/"+b.lang+".js";b.modules+=b.modules.length?","+d:d}a(b.form).each(function(c,d){d.validationConfig=b;var e=a(d);e.trigger("formValidationSetup",[e,b]),e.find(".has-help-txt").unbind("focus.validation").unbind("blur.validation"),e.removeClass("has-validation-callback").unbind("submit.validation").unbind("reset.validation").find("input[data-validation],textarea[data-validation]").unbind("blur.validation"),e.bind("submit.validation",function(){var c=a(this);if(a.formUtils.haltValidation)return!1;if(a.formUtils.isLoadingModules)return setTimeout(function(){c.trigger("submit.validation")},200),!1;var d=c.isValid(b.language,b);if(a.formUtils.haltValidation)return!1;if(!d||"function"!=typeof b.onSuccess)return d||"function"!=typeof b.onError?d:(b.onError(c),!1);var e=b.onSuccess(c);return e===!1?!1:void 0}).bind("reset.validation",function(){a.formUtils.dialogs.removeAllMessagesAndStyling(e,b)}).addClass("has-validation-callback"),b.showHelpOnFocus&&e.showHelpOnFocus(),b.addSuggestions&&e.addSuggestions(),b.validateOnBlur&&(e.validateOnBlur(b.language,b),e.bind("html5ValidationAttrsFound",function(){e.validateOnBlur(b.language,b)})),b.validateOnEvent&&e.validateOnEvent(b.language,b)}),""!==b.modules&&a.formUtils.loadModules(b.modules,!1,function(){"function"==typeof b.onModulesLoaded&&b.onModulesLoaded();var c="string"==typeof b.form?a(b.form):b.form;a.formUtils.$win.trigger("validatorsLoaded",[c,b])})}}(a),function(a,b){"use strict";var c=a(b);a.formUtils=a.extend(a.formUtils||{},{$win:c,defaultConfig:function(){return{ignore:[],errorElementClass:"error",borderColorOnError:"#b94a48",errorMessageClass:"form-error",validationRuleAttribute:"data-validation",validationErrorMsgAttribute:"data-validation-error-msg",errorMessagePosition:"inline",errorMessageTemplate:{container:'<div class="{errorMessageClass} alert alert-danger">{messages}</div>',messages:"<strong>{errorTitle}</strong><ul>{fields}</ul>",field:"<li>{msg}</li>"},scrollToTopOnError:!0,dateFormat:"yyyy-mm-dd",addValidClassOnAll:!1,decimalSeparator:".",inputParentClassOnError:"has-error",inputParentClassOnSuccess:"has-success",validateHiddenInputs:!1,inlineErrorMessageCallback:!1,submitErrorMessageCallback:!1}},validators:{},_events:{load:[],valid:[],invalid:[]},haltValidation:!1,isValidatingEntireForm:!1,addValidator:function(a){var b=0===a.name.indexOf("validate_")?a.name:"validate_"+a.name;void 0===a.validateOnKeyUp&&(a.validateOnKeyUp=!0),this.validators[b]=a},warn:function(a){"console"in b?"function"==typeof b.console.warn?b.console.warn(a):"function"==typeof b.console.log&&b.console.log(a):alert(a)},getValue:function(a,b){var c=b?b.find(a):a;if(c.length>0){var d=c.eq(0).attr("type");return"radio"===d||"checkbox"===d?c.filter(":checked").val():c.val()}return!1},validateInput:function(b,c,d,e,f){d=d||a.formUtils.defaultConfig(),c=c||a.formUtils.LANG;var g=this.getValue(b);b.valAttr("skipped",!1).one("beforeValidation",function(){(b.attr("disabled")||!b.is(":visible")&&!d.validateHiddenInputs)&&b.valAttr("skipped",1)}).trigger("beforeValidation",[g,d,c]);var h="true"===b.valAttr("optional"),i=!g&&h,j=b.attr(d.validationRuleAttribute),k=!0,l="",m={isValid:!0,shouldChangeDisplay:!0,errorMsg:""};if(!j||i||b.valAttr("skipped"))return m.shouldChangeDisplay=d.addValidClassOnAll,m;var n=b.valAttr("ignore");return n&&a.each(n.split(""),function(a,b){g=g.replace(new RegExp("\\"+b),"")}),a.split(j,function(h){0!==h.indexOf("validate_")&&(h="validate_"+h);var i=a.formUtils.validators[h];if(!i)throw new Error('Using undefined validator "'+h+'". Maybe you have forgotten to load the module that "'+h+'" belongs to?');return"validate_checkbox_group"===h&&(b=e.find('[name="'+b.attr("name")+'"]:eq(0)')),("keyup"!==f||i.validateOnKeyUp)&&(k=i.validatorFunction(g,b,d,c,e)),k?void 0:(l=a.formUtils.dialogs.resolveErrorMessage(b,i,h,d,c),!1)}," "),k===!1?(b.trigger("validation",!1),m.errorMsg=l,m.isValid=!1,m.shouldChangeDisplay=!0):null===k?m.shouldChangeDisplay=!1:(b.trigger("validation",!0),m.shouldChangeDisplay=!0),"function"==typeof d.onElementValidate&&null!==l&&d.onElementValidate(m.isValid,b,e,l),b.trigger("afterValidation",[m,f]),m},parseDate:function(b,c,d){var e,f,g,h,i=c.replace(/[a-zA-Z]/gi,"").substring(0,1),j="^",k=c.split(i||null);if(a.each(k,function(a,b){j+=(a>0?"\\"+i:"")+"(\\d{"+b.length+"})"}),j+="$",d){var l=[];a.each(b.split(i),function(a,b){1===b.length&&(b="0"+b),l.push(b)}),b=l.join(i)}if(e=b.match(new RegExp(j)),null===e)return!1;var m=function(b,c,d){for(var e=0;e<c.length;e++)if(c[e].substring(0,1)===b)return a.formUtils.parseDateInt(d[e+1]);return-1};return g=m("m",k,e),f=m("d",k,e),h=m("y",k,e),2===g&&f>28&&(h%4!==0||h%100===0&&h%400!==0)||2===g&&f>29&&(h%4===0||h%100!==0&&h%400===0)||g>12||0===g?!1:this.isShortMonth(g)&&f>30||!this.isShortMonth(g)&&f>31||0===f?!1:[h,g,f]},parseDateInt:function(a){return 0===a.indexOf("0")&&(a=a.replace("0","")),parseInt(a,10)},isShortMonth:function(a){return a%2===0&&7>a||a%2!==0&&a>7},lengthRestriction:function(b,c){var d=parseInt(c.text(),10),e=0,f=function(){var a=b.val().length;if(a>d){var f=b.scrollTop();b.val(b.val().substring(0,d)),b.scrollTop(f)}e=d-a,0>e&&(e=0),c.text(e)};a(b).bind("keydown keyup keypress focus blur",f).bind("cut paste",function(){setTimeout(f,100)}),a(document).bind("ready",f)},numericRangeCheck:function(b,c){var d=a.split(c),e=parseInt(c.substr(3),10);return 1===d.length&&-1===c.indexOf("min")&&-1===c.indexOf("max")&&(d=[c,c]),2===d.length&&(b<parseInt(d[0],10)||b>parseInt(d[1],10))?["out",d[0],d[1]]:0===c.indexOf("min")&&e>b?["min",e]:0===c.indexOf("max")&&b>e?["max",e]:["ok"]},_numSuggestionElements:0,_selectedSuggestion:null,_previousTypedVal:null,suggest:function(b,d,e){var f={css:{maxHeight:"150px",background:"#FFF",lineHeight:"150%",textDecoration:"underline",overflowX:"hidden",overflowY:"auto",border:"#CCC solid 1px",borderTop:"none",cursor:"pointer"},activeSuggestionCSS:{background:"#E9E9E9"}},g=function(a,b){var c=b.offset();a.css({width:b.outerWidth(),left:c.left+"px",top:c.top+b.outerHeight()+"px"})};e&&a.extend(f,e),f.css.position="absolute",f.css["z-index"]=9999,b.attr("autocomplete","off"),0===this._numSuggestionElements&&c.bind("resize",function(){a(".jquery-form-suggestions").each(function(){var b=a(this),c=b.attr("data-suggest-container");g(b,a(".suggestions-"+c).eq(0))})}),this._numSuggestionElements++;var h=function(b){var c=b.valAttr("suggestion-nr");a.formUtils._selectedSuggestion=null,a.formUtils._previousTypedVal=null,a(".jquery-form-suggestion-"+c).fadeOut("fast")};return b.data("suggestions",d).valAttr("suggestion-nr",this._numSuggestionElements).unbind("focus.suggest").bind("focus.suggest",function(){a(this).trigger("keyup"),a.formUtils._selectedSuggestion=null}).unbind("keyup.suggest").bind("keyup.suggest",function(){var c=a(this),d=[],e=a.trim(c.val()).toLocaleLowerCase();if(e!==a.formUtils._previousTypedVal){a.formUtils._previousTypedVal=e;var i=!1,j=c.valAttr("suggestion-nr"),k=a(".jquery-form-suggestion-"+j);if(k.scrollTop(0),""!==e){var l=e.length>2;a.each(c.data("suggestions"),function(a,b){var c=b.toLocaleLowerCase();return c===e?(d.push("<strong>"+b+"</strong>"),i=!0,!1):void((0===c.indexOf(e)||l&&c.indexOf(e)>-1)&&d.push(b.replace(new RegExp(e,"gi"),"<strong>$&</strong>")))})}i||0===d.length&&k.length>0?k.hide():d.length>0&&0===k.length?(k=a("<div></div>").css(f.css).appendTo("body"),b.addClass("suggestions-"+j),k.attr("data-suggest-container",j).addClass("jquery-form-suggestions").addClass("jquery-form-suggestion-"+j)):d.length>0&&!k.is(":visible")&&k.show(),d.length>0&&e.length!==d[0].length&&(g(k,c),k.html(""),a.each(d,function(b,d){a("<div></div>").append(d).css({overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"5px"}).addClass("form-suggest-element").appendTo(k).click(function(){c.focus(),c.val(a(this).text()),c.trigger("change"),h(c)})}))}}).unbind("keydown.validation").bind("keydown.validation",function(b){var c,d,e=b.keyCode?b.keyCode:b.which,g=a(this);if(13===e&&null!==a.formUtils._selectedSuggestion){if(c=g.valAttr("suggestion-nr"),d=a(".jquery-form-suggestion-"+c),d.length>0){var i=d.find("div").eq(a.formUtils._selectedSuggestion).text();g.val(i),g.trigger("change"),h(g),b.preventDefault()}}else{c=g.valAttr("suggestion-nr"),d=a(".jquery-form-suggestion-"+c);var j=d.children();if(j.length>0&&a.inArray(e,[38,40])>-1){38===e?(null===a.formUtils._selectedSuggestion?a.formUtils._selectedSuggestion=j.length-1:a.formUtils._selectedSuggestion--,a.formUtils._selectedSuggestion<0&&(a.formUtils._selectedSuggestion=j.length-1)):40===e&&(null===a.formUtils._selectedSuggestion?a.formUtils._selectedSuggestion=0:a.formUtils._selectedSuggestion++,a.formUtils._selectedSuggestion>j.length-1&&(a.formUtils._selectedSuggestion=0));var k=d.innerHeight(),l=d.scrollTop(),m=d.children().eq(0).outerHeight(),n=m*a.formUtils._selectedSuggestion;return(l>n||n>l+k)&&d.scrollTop(n),j.removeClass("active-suggestion").css("background","none").eq(a.formUtils._selectedSuggestion).addClass("active-suggestion").css(f.activeSuggestionCSS),b.preventDefault(),!1}}}).unbind("blur.suggest").bind("blur.suggest",function(){h(a(this))}),b},LANG:{errorTitle:"Form submission failed!",requiredField:"This is a required field",requiredFields:"You have not answered all required fields",badTime:"You have not given a correct time",badEmail:"You have not given a correct e-mail address",badTelephone:"You have not given a correct phone number",badSecurityAnswer:"You have not given a correct answer to the security question",badDate:"You have not given a correct date",lengthBadStart:"The input value must be between ",lengthBadEnd:" characters",lengthTooLongStart:"The input value is longer than ",lengthTooShortStart:"The input value is shorter than ",notConfirmed:"Input values could not be confirmed",badDomain:"Incorrect domain value",badUrl:"The input value is not a correct URL",badCustomVal:"The input value is incorrect",andSpaces:" and spaces ",badInt:"The input value was not a correct number",badSecurityNumber:"Your social security number was incorrect",badUKVatAnswer:"Incorrect UK VAT Number",badUKNin:"Incorrect UK NIN",badUKUtr:"Incorrect UK UTR Number",badStrength:"The password isn't strong enough",badNumberOfSelectedOptionsStart:"You have to choose at least ",badNumberOfSelectedOptionsEnd:" answers",badAlphaNumeric:"The input value can only contain alphanumeric characters ",badAlphaNumericExtra:" and ",wrongFileSize:"The file you are trying to upload is too large (max %s)",wrongFileType:"Only files of type %s is allowed",groupCheckedRangeStart:"Please choose between ",groupCheckedTooFewStart:"Please choose at least ",groupCheckedTooManyStart:"Please choose a maximum of ",groupCheckedEnd:" item(s)",badCreditCard:"The credit card number is not correct",badCVV:"The CVV number was not correct",wrongFileDim:"Incorrect image dimensions,",imageTooTall:"the image can not be taller than",imageTooWide:"the image can not be wider than",imageTooSmall:"the image was too small",min:"min",max:"max",imageRatioNotAccepted:"Image ratio is not be accepted",badBrazilTelephoneAnswer:"The phone number entered is invalid",badBrazilCEPAnswer:"The CEP entered is invalid",badBrazilCPFAnswer:"The CPF entered is invalid",badPlPesel:"The PESEL entered is invalid",badPlNip:"The NIP entered is invalid",badPlRegon:"The REGON entered is invalid",badreCaptcha:"Please confirm that you are not a bot"}})}(a,window),function(a){a.formUtils.addValidator({name:"email",validatorFunction:function(b){var c=b.toLowerCase().split("@"),d=c[0],e=c[1];if(d&&e){if(0===d.indexOf('"')){var f=d.length;if(d=d.replace(/\"/g,""),d.length!==f-2)return!1}return a.formUtils.validators.validate_domain.validatorFunction(c[1])&&0!==d.indexOf(".")&&"."!==d.substring(d.length-1,d.length)&&-1===d.indexOf("..")&&!/[^\w\+\.\-\#\-\_\~\!\$\&\'\(\)\*\+\,\;\=\:]/.test(d)}return!1},errorMessage:"",errorMessageKey:"badEmail"}),a.formUtils.addValidator({name:"domain",validatorFunction:function(a){return a.length>0&&a.length<=253&&!/[^a-zA-Z0-9]/.test(a.slice(-2))&&!/[^a-zA-Z0-9]/.test(a.substr(0,1))&&!/[^a-zA-Z0-9\.\-]/.test(a)&&1===a.split("..").length&&a.split(".").length>1},errorMessage:"",errorMessageKey:"badDomain"}),a.formUtils.addValidator({name:"required",validatorFunction:function(b,c,d,e,f){switch(c.attr("type")){case"checkbox":return c.is(":checked");case"radio":return f.find('input[name="'+c.attr("name")+'"]').filter(":checked").length>0;default:return""!==a.trim(b)}},errorMessage:"",errorMessageKey:function(a){return"top"===a.errorMessagePosition||"function"==typeof a.errorMessagePosition?"requiredFields":"requiredField"}}),a.formUtils.addValidator({name:"length",validatorFunction:function(b,c,d,e){var f=c.valAttr("length"),g=c.attr("type");if(void 0===f)return alert('Please add attribute "data-validation-length" to '+c[0].nodeName+" named "+c.attr("name")),!0;var h,i="file"===g&&void 0!==c.get(0).files?c.get(0).files.length:b.length,j=a.formUtils.numericRangeCheck(i,f);switch(j[0]){case"out":this.errorMessage=e.lengthBadStart+f+e.lengthBadEnd,h=!1;break;case"min":this.errorMessage=e.lengthTooShortStart+j[1]+e.lengthBadEnd,h=!1;break;case"max":this.errorMessage=e.lengthTooLongStart+j[1]+e.lengthBadEnd,h=!1;break;default:h=!0}return h},errorMessage:"",errorMessageKey:""}),a.formUtils.addValidator({name:"url",validatorFunction:function(b){var c=/^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;if(c.test(b)){var d=b.split("://")[1],e=d.indexOf("/");return e>-1&&(d=d.substr(0,e)),a.formUtils.validators.validate_domain.validatorFunction(d)}return!1},errorMessage:"",errorMessageKey:"badUrl"}),a.formUtils.addValidator({name:"number",validatorFunction:function(a,b,c){if(""!==a){var d,e,f=b.valAttr("allowing")||"",g=b.valAttr("decimal-separator")||c.decimalSeparator,h=!1,i=b.valAttr("step")||"",j=!1,k=b.attr("data-sanitize")||"",l=k.match(/(^|[\s])numberFormat([\s]|$)/i);if(l){if(!window.numeral)throw new ReferenceError("The data-sanitize value numberFormat cannot be used without the numeral library. Please see Data Validation in http://www.formvalidator.net for more information.");a.length&&(a=String(numeral().unformat(a)))}if(-1===f.indexOf("number")&&(f+=",number"),-1===f.indexOf("negative")&&0===a.indexOf("-"))return!1;if(f.indexOf("range")>-1&&(d=parseFloat(f.substring(f.indexOf("[")+1,f.indexOf(";"))),e=parseFloat(f.substring(f.indexOf(";")+1,f.indexOf("]"))),h=!0),""!==i&&(j=!0),","===g){if(a.indexOf(".")>-1)return!1;a=a.replace(",",".")}if(""===a.replace(/[0-9-]/g,"")&&(!h||a>=d&&e>=a)&&(!j||a%i===0))return!0;if(f.indexOf("float")>-1&&null!==a.match(new RegExp("^([0-9-]+)\\.([0-9]+)$"))&&(!h||a>=d&&e>=a)&&(!j||a%i===0))return!0}return!1},errorMessage:"",errorMessageKey:"badInt"}),a.formUtils.addValidator({name:"alphanumeric",validatorFunction:function(b,c,d,e){var f="^([a-zA-Z0-9",g="]+)$",h=c.valAttr("allowing"),i="";if(h){i=f+h+g;var j=h.replace(/\\/g,"");j.indexOf(" ")>-1&&(j=j.replace(" ",""),j+=e.andSpaces||a.formUtils.LANG.andSpaces),this.errorMessage=e.badAlphaNumeric+e.badAlphaNumericExtra+j}else i=f+g,this.errorMessage=e.badAlphaNumeric;return new RegExp(i).test(b)},errorMessage:"",errorMessageKey:""}),a.formUtils.addValidator({name:"custom",validatorFunction:function(a,b){var c=new RegExp(b.valAttr("regexp"));return c.test(a)},errorMessage:"",errorMessageKey:"badCustomVal"}),a.formUtils.addValidator({name:"date",validatorFunction:function(b,c,d){var e=c.valAttr("format")||d.dateFormat||"yyyy-mm-dd",f="false"===c.valAttr("require-leading-zero");return a.formUtils.parseDate(b,e,f)!==!1},errorMessage:"",errorMessageKey:"badDate"}),a.formUtils.addValidator({name:"checkbox_group",validatorFunction:function(b,c,d,e,f){var g=!0,h=c.attr("name"),i=a('input[type=checkbox][name^="'+h+'"]',f),j=i.filter(":checked").length,k=c.valAttr("qty");if(void 0===k){var l=c.get(0).nodeName;alert('Attribute "data-validation-qty" is missing from '+l+" named "+c.attr("name"))}var m=a.formUtils.numericRangeCheck(j,k);switch(m[0]){case"out":this.errorMessage=e.groupCheckedRangeStart+k+e.groupCheckedEnd,g=!1;break;case"min":this.errorMessage=e.groupCheckedTooFewStart+m[1]+e.groupCheckedEnd,g=!1;break;case"max":this.errorMessage=e.groupCheckedTooManyStart+m[1]+e.groupCheckedEnd,g=!1;break;default:g=!0}if(!g){var n=function(){i.unbind("click",n),i.filter("*[data-validation]").validateInputOnBlur(e,d,!1,"blur")};i.bind("click",n)}return g}})}(a)});

/* Chosen v1.5.1 | (c) 2011-2016 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
(function(){var a,AbstractChosen,Chosen,SelectParser,b,c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};SelectParser=function(){function SelectParser(){this.options_index=0,this.parsed=[]}return SelectParser.prototype.add_node=function(a){return"OPTGROUP"===a.nodeName.toUpperCase()?this.add_group(a):this.add_option(a)},SelectParser.prototype.add_group=function(a){var b,c,d,e,f,g;for(b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:this.escapeExpression(a.label),title:a.title?a.title:void 0,children:0,disabled:a.disabled,classes:a.className}),f=a.childNodes,g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(this.add_option(c,b,a.disabled));return g},SelectParser.prototype.add_option=function(a,b,c){return"OPTION"===a.nodeName.toUpperCase()?(""!==a.text?(null!=b&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,title:a.title?a.title:void 0,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b,group_label:null!=b?this.parsed[b].label:null,classes:a.className,style:a.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},SelectParser.prototype.escapeExpression=function(a){var b,c;return null==a||a===!1?"":/[\&\<\>\"\'\`]/.test(a)?(b={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/&(?!\w+;)|[\<\>\"\'\`]/g,a.replace(c,function(a){return b[a]||"&amp;"})):a},SelectParser}(),SelectParser.select_to_array=function(a){var b,c,d,e,f;for(c=new SelectParser,f=a.childNodes,d=0,e=f.length;e>d;d++)b=f[d],c.add_node(b);return c.parsed},AbstractChosen=function(){function AbstractChosen(a,b){this.form_field=a,this.options=null!=b?b:{},AbstractChosen.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers(),this.on_ready())}return AbstractChosen.prototype.set_default_values=function(){var a=this;return this.click_test_action=function(b){return a.test_active_click(b)},this.activate_action=function(b){return a.activate_field(b)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.group_search=null!=this.options.group_search?this.options.group_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null!=this.options.single_backstroke_delete?this.options.single_backstroke_delete:!0,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null!=this.options.display_selected_options?this.options.display_selected_options:!0,this.display_disabled_options=null!=this.options.display_disabled_options?this.options.display_disabled_options:!0,this.include_group_label_in_selected=this.options.include_group_label_in_selected||!1,this.max_shown_results=this.options.max_shown_results||Number.POSITIVE_INFINITY},AbstractChosen.prototype.set_default_text=function(){return this.form_field.getAttribute("data-placeholder")?this.default_text=this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||AbstractChosen.default_multiple_text:this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||AbstractChosen.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||AbstractChosen.default_no_result_text},AbstractChosen.prototype.choice_label=function(a){return this.include_group_label_in_selected&&null!=a.group_label?"<b class='group-name'>"+a.group_label+"</b>"+a.html:a.html},AbstractChosen.prototype.mouse_enter=function(){return this.mouse_on_container=!0},AbstractChosen.prototype.mouse_leave=function(){return this.mouse_on_container=!1},AbstractChosen.prototype.input_focus=function(a){var b=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return b.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},AbstractChosen.prototype.input_blur=function(a){var b=this;return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(){return b.blur_test()},100))},AbstractChosen.prototype.results_option_build=function(a){var b,c,d,e,f,g,h;for(b="",e=0,h=this.results_data,f=0,g=h.length;g>f&&(c=h[f],d="",d=c.group?this.result_add_group(c):this.result_add_option(c),""!==d&&(e++,b+=d),(null!=a?a.first:void 0)&&(c.selected&&this.is_multiple?this.choice_build(c):c.selected&&!this.is_multiple&&this.single_set_selected_text(this.choice_label(c))),!(e>=this.max_shown_results));f++);return b},AbstractChosen.prototype.result_add_option=function(a){var b,c;return a.search_match&&this.include_option_in_results(a)?(b=[],a.disabled||a.selected&&this.is_multiple||b.push("active-result"),!a.disabled||a.selected&&this.is_multiple||b.push("disabled-result"),a.selected&&b.push("result-selected"),null!=a.group_array_index&&b.push("group-option"),""!==a.classes&&b.push(a.classes),c=document.createElement("li"),c.className=b.join(" "),c.style.cssText=a.style,c.setAttribute("data-option-array-index",a.array_index),c.innerHTML=a.search_text,a.title&&(c.title=a.title),this.outerHTML(c)):""},AbstractChosen.prototype.result_add_group=function(a){var b,c;return(a.search_match||a.group_match)&&a.active_options>0?(b=[],b.push("group-result"),a.classes&&b.push(a.classes),c=document.createElement("li"),c.className=b.join(" "),c.innerHTML=a.search_text,a.title&&(c.title=a.title),this.outerHTML(c)):""},AbstractChosen.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.results_build(),this.results_showing?this.winnow_results():void 0},AbstractChosen.prototype.reset_single_select_options=function(){var a,b,c,d,e;for(d=this.results_data,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.selected?e.push(a.selected=!1):e.push(void 0);return e},AbstractChosen.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},AbstractChosen.prototype.results_search=function(a){return this.results_showing?this.winnow_results():this.results_show()},AbstractChosen.prototype.winnow_results=function(){var a,b,c,d,e,f,g,h,i,j,k,l;for(this.no_results_clear(),d=0,f=this.get_search_text(),a=f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),i=new RegExp(a,"i"),c=this.get_search_regex(a),l=this.results_data,j=0,k=l.length;k>j;j++)b=l[j],b.search_match=!1,e=null,this.include_option_in_results(b)&&(b.group&&(b.group_match=!1,b.active_options=0),null!=b.group_array_index&&this.results_data[b.group_array_index]&&(e=this.results_data[b.group_array_index],0===e.active_options&&e.search_match&&(d+=1),e.active_options+=1),b.search_text=b.group?b.label:b.html,(!b.group||this.group_search)&&(b.search_match=this.search_string_match(b.search_text,c),b.search_match&&!b.group&&(d+=1),b.search_match?(f.length&&(g=b.search_text.search(i),h=b.search_text.substr(0,g+f.length)+"</em>"+b.search_text.substr(g+f.length),b.search_text=h.substr(0,g)+"<em>"+h.substr(g)),null!=e&&(e.group_match=!0)):null!=b.group_array_index&&this.results_data[b.group_array_index].search_match&&(b.search_match=!0)));return this.result_clear_highlight(),1>d&&f.length?(this.update_results_content(""),this.no_results(f)):(this.update_results_content(this.results_option_build()),this.winnow_results_set_highlight())},AbstractChosen.prototype.get_search_regex=function(a){var b;return b=this.search_contains?"":"^",new RegExp(b+a,"i")},AbstractChosen.prototype.search_string_match=function(a,b){var c,d,e,f;if(b.test(a))return!0;if(this.enable_split_word_search&&(a.indexOf(" ")>=0||0===a.indexOf("["))&&(d=a.replace(/\[|\]/g,"").split(" "),d.length))for(e=0,f=d.length;f>e;e++)if(c=d[e],b.test(c))return!0},AbstractChosen.prototype.choices_count=function(){var a,b,c,d;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,d=this.form_field.options,b=0,c=d.length;c>b;b++)a=d[b],a.selected&&(this.selected_option_count+=1);return this.selected_option_count},AbstractChosen.prototype.choices_click=function(a){return a.preventDefault(),this.results_showing||this.is_disabled?void 0:this.results_show()},AbstractChosen.prototype.keyup_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),b){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(a.preventDefault(),this.results_showing)return this.result_select(a);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:case 18:break;default:return this.results_search()}},AbstractChosen.prototype.clipboard_event_checker=function(a){var b=this;return setTimeout(function(){return b.results_search()},50)},AbstractChosen.prototype.container_width=function(){return null!=this.options.width?this.options.width:""+this.form_field.offsetWidth+"px"},AbstractChosen.prototype.include_option_in_results=function(a){return this.is_multiple&&!this.display_selected_options&&a.selected?!1:!this.display_disabled_options&&a.disabled?!1:a.empty?!1:!0},AbstractChosen.prototype.search_results_touchstart=function(a){return this.touch_started=!0,this.search_results_mouseover(a)},AbstractChosen.prototype.search_results_touchmove=function(a){return this.touch_started=!1,this.search_results_mouseout(a)},AbstractChosen.prototype.search_results_touchend=function(a){return this.touch_started?this.search_results_mouseup(a):void 0},AbstractChosen.prototype.outerHTML=function(a){var b;return a.outerHTML?a.outerHTML:(b=document.createElement("div"),b.appendChild(a),b.innerHTML)},AbstractChosen.browser_is_supported=function(){return/iP(od|hone)/i.test(window.navigator.userAgent)?!1:/Android/i.test(window.navigator.userAgent)&&/Mobile/i.test(window.navigator.userAgent)?!1:/IEMobile/i.test(window.navigator.userAgent)?!1:/Windows Phone/i.test(window.navigator.userAgent)?!1:/BlackBerry/i.test(window.navigator.userAgent)?!1:/BB10/i.test(window.navigator.userAgent)?!1:"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:!0},AbstractChosen.default_multiple_text="Select Some Options",AbstractChosen.default_single_text="Select an Option",AbstractChosen.default_no_result_text="No results match",AbstractChosen}(),a=jQuery,a.fn.extend({chosen:function(b){return AbstractChosen.browser_is_supported()?this.each(function(c){var d,e;return d=a(this),e=d.data("chosen"),"destroy"===b?void(e instanceof Chosen&&e.destroy()):void(e instanceof Chosen||d.data("chosen",new Chosen(this,b)))}):this}}),Chosen=function(c){function Chosen(){return b=Chosen.__super__.constructor.apply(this,arguments)}return d(Chosen,c),Chosen.prototype.setup=function(){return this.form_field_jq=a(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")},Chosen.prototype.set_up_html=function(){var b,c;return b=["chosen-container"],b.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&b.push(this.form_field.className),this.is_rtl&&b.push("chosen-rtl"),c={"class":b.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(c.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=a("<div />",c),this.is_multiple?this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'):this.container.html('<a class="chosen-single chosen-default"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior()},Chosen.prototype.on_ready=function(){return this.form_field_jq.trigger("chosen:ready",{chosen:this})},Chosen.prototype.register_observers=function(){var a=this;return this.container.bind("touchstart.chosen",function(b){return a.container_mousedown(b),b.preventDefault()}),this.container.bind("touchend.chosen",function(b){return a.container_mouseup(b),b.preventDefault()}),this.container.bind("mousedown.chosen",function(b){a.container_mousedown(b)}),this.container.bind("mouseup.chosen",function(b){a.container_mouseup(b)}),this.container.bind("mouseenter.chosen",function(b){a.mouse_enter(b)}),this.container.bind("mouseleave.chosen",function(b){a.mouse_leave(b)}),this.search_results.bind("mouseup.chosen",function(b){a.search_results_mouseup(b)}),this.search_results.bind("mouseover.chosen",function(b){a.search_results_mouseover(b)}),this.search_results.bind("mouseout.chosen",function(b){a.search_results_mouseout(b)}),this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(b){a.search_results_mousewheel(b)}),this.search_results.bind("touchstart.chosen",function(b){a.search_results_touchstart(b)}),this.search_results.bind("touchmove.chosen",function(b){a.search_results_touchmove(b)}),this.search_results.bind("touchend.chosen",function(b){a.search_results_touchend(b)}),this.form_field_jq.bind("chosen:updated.chosen",function(b){a.results_update_field(b)}),this.form_field_jq.bind("chosen:activate.chosen",function(b){a.activate_field(b)}),this.form_field_jq.bind("chosen:open.chosen",function(b){a.container_mousedown(b)}),this.form_field_jq.bind("chosen:close.chosen",function(b){a.input_blur(b)}),this.search_field.bind("blur.chosen",function(b){a.input_blur(b)}),this.search_field.bind("keyup.chosen",function(b){a.keyup_checker(b)}),this.search_field.bind("keydown.chosen",function(b){a.keydown_checker(b)}),this.search_field.bind("focus.chosen",function(b){a.input_focus(b)}),this.search_field.bind("cut.chosen",function(b){a.clipboard_event_checker(b)}),this.search_field.bind("paste.chosen",function(b){a.clipboard_event_checker(b)}),this.is_multiple?this.search_choices.bind("click.chosen",function(b){a.choices_click(b)}):this.container.bind("click.chosen",function(a){a.preventDefault()})},Chosen.prototype.destroy=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},Chosen.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chosen-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus.chosen",this.activate_action),this.close_field()):(this.container.removeClass("chosen-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus.chosen",this.activate_action))},Chosen.prototype.container_mousedown=function(b){return this.is_disabled||(b&&"mousedown"===b.type&&!this.results_showing&&b.preventDefault(),null!=b&&a(b.target).hasClass("search-choice-close"))?void 0:(this.active_field?this.is_multiple||!b||a(b.target)[0]!==this.selected_item[0]&&!a(b.target).parents("a.chosen-single").length||(b.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),a(this.container[0].ownerDocument).bind("click.chosen",this.click_test_action),this.results_show()),this.activate_field())},Chosen.prototype.container_mouseup=function(a){return"ABBR"!==a.target.nodeName||this.is_disabled?void 0:this.results_reset(a)},Chosen.prototype.search_results_mousewheel=function(a){var b;return a.originalEvent&&(b=a.originalEvent.deltaY||-a.originalEvent.wheelDelta||a.originalEvent.detail),null!=b?(a.preventDefault(),"DOMMouseScroll"===a.type&&(b=40*b),this.search_results.scrollTop(b+this.search_results.scrollTop())):void 0},Chosen.prototype.blur_test=function(a){return!this.active_field&&this.container.hasClass("chosen-container-active")?this.close_field():void 0},Chosen.prototype.close_field=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},Chosen.prototype.activate_field=function(){return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},Chosen.prototype.test_active_click=function(b){var c;return c=a(b.target).closest(".chosen-container"),c.length&&this.container[0]===c[0]?this.active_field=!0:this.close_field()},Chosen.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=SelectParser.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},Chosen.prototype.result_do_highlight=function(a){var b,c,d,e,f;if(a.length){if(this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClass("highlighted"),d=parseInt(this.search_results.css("maxHeight"),10),f=this.search_results.scrollTop(),e=d+f,c=this.result_highlight.position().top+this.search_results.scrollTop(),b=c+this.result_highlight.outerHeight(),b>=e)return this.search_results.scrollTop(b-d>0?b-d:0);if(f>c)return this.search_results.scrollTop(c)}},Chosen.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},Chosen.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.container.addClass("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results(),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this}))},Chosen.prototype.update_results_content=function(a){return this.search_results.html(a)},Chosen.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},Chosen.prototype.set_tab_index=function(a){var b;return this.form_field.tabIndex?(b=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=b):void 0},Chosen.prototype.set_label_behavior=function(){var b=this;return this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=a("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0?this.form_field_label.bind("click.chosen",function(a){return b.is_multiple?b.container_mousedown(a):b.activate_field()}):void 0},Chosen.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},Chosen.prototype.search_results_mouseup=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c.length?(this.result_highlight=c,this.result_select(b),this.search_field.focus()):void 0},Chosen.prototype.search_results_mouseover=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c?this.result_do_highlight(c):void 0},Chosen.prototype.search_results_mouseout=function(b){return a(b.target).hasClass("active-result")?this.result_clear_highlight():void 0},Chosen.prototype.choice_build=function(b){var c,d,e=this;return c=a("<li />",{"class":"search-choice"}).html("<span>"+this.choice_label(b)+"</span>"),b.disabled?c.addClass("search-choice-disabled"):(d=a("<a />",{"class":"search-choice-close","data-option-array-index":b.array_index}),d.bind("click.chosen",function(a){return e.choice_destroy_link_click(a)}),c.append(d)),this.search_container.before(c)},Chosen.prototype.choice_destroy_link_click=function(b){return b.preventDefault(),b.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(a(b.target))},Chosen.prototype.choice_destroy=function(a){return this.result_deselect(a[0].getAttribute("data-option-array-index"))?(this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),a.parents("li").first().remove(),this.search_field_scale()):void 0},Chosen.prototype.results_reset=function(){return this.reset_single_select_options(),this.form_field.options[0].selected=!0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field?this.results_hide():void 0},Chosen.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},Chosen.prototype.result_select=function(a){var b,c;return this.result_highlight?(b=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?b.removeClass("active-result"):this.reset_single_select_options(),b.addClass("result-selected"),c=this.results_data[b[0].getAttribute("data-option-array-index")],c.selected=!0,this.form_field.options[c.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(c):this.single_set_selected_text(this.choice_label(c)),(a.metaKey||a.ctrlKey)&&this.is_multiple||this.results_hide(),this.show_search_field_default(),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[c.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,a.preventDefault(),this.search_field_scale())):void 0},Chosen.prototype.single_set_selected_text=function(a){return null==a&&(a=this.default_text),a===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").html(a)},Chosen.prototype.result_deselect=function(a){var b;return b=this.results_data[a],this.form_field.options[b.options_index].disabled?!1:(b.selected=!1,this.form_field.options[b.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[b.options_index].value}),this.search_field_scale(),!0)},Chosen.prototype.single_deselect_control_build=function(){return this.allow_single_deselect?(this.selected_item.find("abbr").length||this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),this.selected_item.addClass("chosen-single-with-deselect")):void 0},Chosen.prototype.get_search_text=function(){return a("<div/>").text(a.trim(this.search_field.val())).html()},Chosen.prototype.winnow_results_set_highlight=function(){var a,b;return b=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),a=b.length?b.first():this.search_results.find(".active-result").first(),null!=a?this.result_do_highlight(a):void 0},Chosen.prototype.no_results=function(b){var c;return c=a('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>'),c.find("span").first().html(b),this.search_results.append(c),this.form_field_jq.trigger("chosen:no_results",{chosen:this})},Chosen.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},Chosen.prototype.keydown_arrow=function(){var a;return this.results_showing&&this.result_highlight?(a=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(a):void 0:this.results_show()},Chosen.prototype.keyup_arrow=function(){var a;return this.results_showing||this.is_multiple?this.result_highlight?(a=this.result_highlight.prevAll("li.active-result"),a.length?this.result_do_highlight(a.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},Chosen.prototype.keydown_backstroke=function(){var a;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(a=this.search_container.siblings("li.search-choice").last(),a.length&&!a.hasClass("search-choice-disabled")?(this.pending_backstroke=a,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0)},Chosen.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},Chosen.prototype.keydown_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),8!==b&&this.pending_backstroke&&this.clear_backstroke(),b){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(a),this.mouse_on_container=!1;break;case 13:this.results_showing&&a.preventDefault();break;case 32:this.disable_search&&a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:a.preventDefault(),this.keydown_arrow()}},Chosen.prototype.search_field_scale=function(){var b,c,d,e,f,g,h,i,j;if(this.is_multiple){for(d=0,h=0,f="position:absolute; left: -1000px; top: -1000px; display:none;",g=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],i=0,j=g.length;j>i;i++)e=g[i],f+=e+":"+this.search_field.css(e)+";";return b=a("<div />",{style:f}),b.text(this.search_field.val()),a("body").append(b),h=b.width()+25,b.remove(),c=this.container.outerWidth(),h>c-10&&(h=c-10),this.search_field.css({width:h+"px"})}},Chosen}(AbstractChosen)}).call(this);

//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return fd.apply(null,arguments)}function b(a){fd=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ja(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a),c=gd.call(b.parsedDateParts,function(a){return null!=a});a._isValid=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),hd.length>0)for(c in hd)d=hd[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),id===!1&&(id=!0,a.updateOffset(this),id=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function u(b,c){var d=!0;return g(function(){return null!=a.deprecationHandler&&a.deprecationHandler(null,b),d&&(t(b+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),d=!1),c.apply(this,arguments)},c)}function v(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),jd[b]||(t(c),jd[b]=!0)}function w(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function x(a){return"[object Object]"===Object.prototype.toString.call(a)}function y(a){var b,c;for(c in a)b=a[c],w(b)?this[c]=b:this["_"+c]=b;this._config=a,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function z(a,b){var c,d=g({},a);for(c in b)f(b,c)&&(x(a[c])&&x(b[c])?(d[c]={},g(d[c],a[c]),g(d[c],b[c])):null!=b[c]?d[c]=b[c]:delete d[c]);return d}function A(a){null!=a&&this.set(a)}function B(a){return a?a.toLowerCase().replace("_","-"):a}function C(a){for(var b,c,d,e,f=0;f<a.length;){for(e=B(a[f]).split("-"),b=e.length,c=B(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=D(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function D(a){var b=null;if(!nd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=ld._abbr,require("./locale/"+a),E(b)}catch(c){}return nd[a]}function E(a,b){var c;return a&&(c=m(b)?H(a):F(a,b),c&&(ld=c)),ld._abbr}function F(a,b){return null!==b?(b.abbr=a,null!=nd[a]?(v("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"),b=z(nd[a]._config,b)):null!=b.parentLocale&&(null!=nd[b.parentLocale]?b=z(nd[b.parentLocale]._config,b):v("parentLocaleUndefined","specified parentLocale is not defined yet")),nd[a]=new A(b),E(a),nd[a]):(delete nd[a],null)}function G(a,b){if(null!=b){var c;null!=nd[a]&&(b=z(nd[a]._config,b)),c=new A(b),c.parentLocale=nd[a],nd[a]=c,E(a)}else null!=nd[a]&&(null!=nd[a].parentLocale?nd[a]=nd[a].parentLocale:null!=nd[a]&&delete nd[a]);return nd[a]}function H(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return ld;if(!c(a)){if(b=D(a))return b;a=[a]}return C(a)}function I(){return kd(nd)}function J(a,b){var c=a.toLowerCase();od[c]=od[c+"s"]=od[b]=a}function K(a){return"string"==typeof a?od[a]||od[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)f(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(b,c){return function(d){return null!=d?(O(this,b,d),a.updateOffset(this,c),this):N(this,b)}}function N(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function O(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function P(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=K(a),w(this[a]))return this[a](b);return this}function Q(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function R(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(sd[a]=e),b&&(sd[b[0]]=function(){return Q(e.apply(this,arguments),b[1],b[2])}),c&&(sd[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function S(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function T(a){var b,c,d=a.match(pd);for(b=0,c=d.length;c>b;b++)sd[d[b]]?d[b]=sd[d[b]]:d[b]=S(d[b]);return function(b){var e,f="";for(e=0;c>e;e++)f+=d[e]instanceof Function?d[e].call(b,a):d[e];return f}}function U(a,b){return a.isValid()?(b=V(b,a.localeData()),rd[b]=rd[b]||T(b),rd[b](a)):a.localeData().invalidDate()}function V(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(qd.lastIndex=0;d>=0&&qd.test(a);)a=a.replace(qd,c),qd.lastIndex=0,d-=1;return a}function W(a,b,c){Kd[a]=w(b)?b:function(a,d){return a&&c?c:b}}function X(a,b){return f(Kd,a)?Kd[a](b._strict,b._locale):new RegExp(Y(a))}function Y(a){return Z(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function Z(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function $(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)Ld[a[c]]=d}function _(a,b){$(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function aa(a,b,c){null!=b&&f(Ld,a)&&Ld[a](b,c._a,c,a)}function ba(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function ca(a,b){return c(this._months)?this._months[a.month()]:this._months[Vd.test(b)?"format":"standalone"][a.month()]}function da(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Vd.test(b)?"format":"standalone"][a.month()]}function ea(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;12>d;++d)f=h([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=md.call(this._shortMonthsParse,g),-1!==e?e:null):(e=md.call(this._longMonthsParse,g),-1!==e?e:null):"MMM"===b?(e=md.call(this._shortMonthsParse,g),-1!==e?e:(e=md.call(this._longMonthsParse,g),-1!==e?e:null)):(e=md.call(this._longMonthsParse,g),-1!==e?e:(e=md.call(this._shortMonthsParse,g),-1!==e?e:null))}function fa(a,b,c){var d,e,f;if(this._monthsParseExact)return ea.call(this,a,b,c);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function ga(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=r(b);else if(b=a.localeData().monthsParse(b),"number"!=typeof b)return a;return c=Math.min(a.date(),ba(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ha(b){return null!=b?(ga(this,b),a.updateOffset(this,!0),this):N(this,"Month")}function ia(){return ba(this.year(),this.month())}function ja(a){return this._monthsParseExact?(f(this,"_monthsRegex")||la.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ka(a){return this._monthsParseExact?(f(this,"_monthsRegex")||la.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function la(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=Z(d[b]),e[b]=Z(e[b]),f[b]=Z(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}function ma(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[Nd]<0||c[Nd]>11?Nd:c[Od]<1||c[Od]>ba(c[Md],c[Nd])?Od:c[Pd]<0||c[Pd]>24||24===c[Pd]&&(0!==c[Qd]||0!==c[Rd]||0!==c[Sd])?Pd:c[Qd]<0||c[Qd]>59?Qd:c[Rd]<0||c[Rd]>59?Rd:c[Sd]<0||c[Sd]>999?Sd:-1,j(a)._overflowDayOfYear&&(Md>b||b>Od)&&(b=Od),j(a)._overflowWeeks&&-1===b&&(b=Td),j(a)._overflowWeekday&&-1===b&&(b=Ud),j(a).overflow=b),a}function na(a){var b,c,d,e,f,g,h=a._i,i=$d.exec(h)||_d.exec(h);if(i){for(j(a).iso=!0,b=0,c=be.length;c>b;b++)if(be[b][1].exec(i[1])){e=be[b][0],d=be[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=ce.length;c>b;b++)if(ce[b][1].exec(i[3])){f=(i[2]||" ")+ce[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!ae.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),Ca(a)}else a._isValid=!1}function oa(b){var c=de.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(na(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function pa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function qa(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function ra(a){return sa(a)?366:365}function sa(a){return a%4===0&&a%100!==0||a%400===0}function ta(){return sa(this.year())}function ua(a,b,c){var d=7+b-c,e=(7+qa(a,0,d).getUTCDay()-b)%7;return-e+d-1}function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=ra(f)+j):j>ra(a)?(f=a+1,g=j-ra(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(ra(a)-d+e)/7}function ya(a,b,c){return null!=a?a:null!=b?b:c}function za(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function Aa(a){var b,c,d,e,f=[];if(!a._d){for(d=za(a),a._w&&null==a._a[Od]&&null==a._a[Nd]&&Ba(a),a._dayOfYear&&(e=ya(a._a[Md],d[Md]),a._dayOfYear>ra(e)&&(j(a)._overflowDayOfYear=!0),c=qa(e,0,a._dayOfYear),a._a[Nd]=c.getUTCMonth(),a._a[Od]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[Pd]&&0===a._a[Qd]&&0===a._a[Rd]&&0===a._a[Sd]&&(a._nextDay=!0,a._a[Pd]=0),a._d=(a._useUTC?qa:pa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Pd]=24)}}function Ba(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=ya(b.GG,a._a[Md],wa(Ka(),1,4).year),d=ya(b.W,1),e=ya(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=ya(b.gg,a._a[Md],wa(Ka(),f,g).year),d=ya(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>xa(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[Md]=h.year,a._dayOfYear=h.dayOfYear)}function Ca(b){if(b._f===a.ISO_8601)return void na(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=V(b._f,b._locale).match(pd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(X(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),sd[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),aa(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[Pd]<=12&&b._a[Pd]>0&&(j(b).bigHour=void 0),j(b).parsedDateParts=b._a.slice(0),j(b).meridiem=b._meridiem,b._a[Pd]=Da(b._locale,b._a[Pd],b._meridiem),Aa(b),ma(b)}function Da(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function Ea(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],Ca(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Fa(a){if(!a._d){var b=L(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),Aa(a)}}function Ga(a){var b=new o(ma(Ha(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ha(a){var b=a._i,e=a._f;return a._locale=a._locale||H(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(ma(b)):(c(e)?Ea(a):e?Ca(a):d(b)?a._d=b:Ia(a),k(a)||(a._d=null),a))}function Ia(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(f.valueOf()):"string"==typeof f?oa(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),Aa(b)):"object"==typeof f?Fa(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ja(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Ga(f)}function Ka(a,b,c,d){return Ja(a,b,c,d,!1)}function La(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ka();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function Ma(){var a=[].slice.call(arguments,0);return La("isBefore",a)}function Na(){var a=[].slice.call(arguments,0);return La("isAfter",a)}function Oa(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+1e3*h*60*60,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=H(),this._bubble()}function Pa(a){return a instanceof Oa}function Qa(a,b){R(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+Q(~~(a/60),2)+b+Q(~~a%60,2)})}function Ra(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(ie)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Sa(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?b.valueOf():Ka(b).valueOf())-e.valueOf(),e._d.setTime(e._d.valueOf()+f),a.updateOffset(e,!1),e):Ka(b).local()}function Ta(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ua(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=Ra(Hd,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ta(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?jb(this,db(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ta(this):null!=b?this:NaN}function Va(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Wa(a){return this.utcOffset(0,a)}function Xa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ta(this),"m")),this}function Ya(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ra(Gd,this._i)),this}function Za(a){return this.isValid()?(a=a?Ka(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function $a(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function _a(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ha(a),a._a){var b=a._isUTC?h(a._a):Ka(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function ab(){return this.isValid()?!this._isUTC:!1}function bb(){return this.isValid()?this._isUTC:!1}function cb(){return this.isValid()?this._isUTC&&0===this._offset:!1}function db(a,b){var c,d,e,g=a,h=null;return Pa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=je.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[Od])*c,h:r(h[Pd])*c,m:r(h[Qd])*c,s:r(h[Rd])*c,ms:r(h[Sd])*c}):(h=ke.exec(a))?(c="-"===h[1]?-1:1,g={y:eb(h[2],c),M:eb(h[3],c),w:eb(h[4],c),d:eb(h[5],c),h:eb(h[6],c),m:eb(h[7],c),s:eb(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=gb(Ka(g.from),Ka(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Oa(g),Pa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function eb(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function fb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function gb(a,b){var c;return a.isValid()&&b.isValid()?(b=Sa(b,a),a.isBefore(b)?c=fb(a,b):(c=fb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function hb(a){return 0>a?-1*Math.round(-1*a):Math.round(a)}function ib(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(v(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=db(c,d),jb(this,e,a),this}}function jb(b,c,d,e){var f=c._milliseconds,g=hb(c._days),h=hb(c._months);b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&O(b,"Date",N(b,"Date")+g*d),h&&ga(b,N(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function kb(a,b){var c=a||Ka(),d=Sa(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(w(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ka(c)))}function lb(){return new o(this)}function mb(a,b){var c=p(a)?a:Ka(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf()):!1}function nb(a,b){var c=p(a)?a:Ka(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf()):!1}function ob(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function pb(a,b){var c,d=p(a)?a:Ka(a);return this.isValid()&&d.isValid()?(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf())):!1}function qb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function rb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function sb(a,b,c){var d,e,f,g;return this.isValid()?(d=Sa(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=tb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function tb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function ub(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function vb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?w(Date.prototype.toISOString)?this.toDate().toISOString():U(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):U(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function wb(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=U(this,b);return this.localeData().postformat(c)}function xb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ka(a).isValid())?db({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function yb(a){return this.from(Ka(),a)}function zb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ka(a).isValid())?db({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function Ab(a){return this.to(Ka(),a)}function Bb(a){var b;return void 0===a?this._locale._abbr:(b=H(a),null!=b&&(this._locale=b),this)}function Cb(){return this._locale}function Db(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function Eb(a){return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function Fb(){return this._d.valueOf()-6e4*(this._offset||0)}function Gb(){return Math.floor(this.valueOf()/1e3)}function Hb(){return this._offset?new Date(this.valueOf()):this._d}function Ib(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Jb(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Kb(){return this.isValid()?this.toISOString():null}function Lb(){return k(this)}function Mb(){return g({},j(this))}function Nb(){return j(this).overflow}function Ob(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Pb(a,b){R(0,[a,a.length],0,b)}function Qb(a){return Ub.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Rb(a){return Ub.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Sb(){return xa(this.year(),1,4)}function Tb(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ub(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Vb.call(this,a,b,c,d,e))}function Vb(a,b,c,d,e){var f=va(a,b,c,d,e),g=qa(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Wb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Xb(a){return wa(a,this._week.dow,this._week.doy).week}function Yb(){return this._week.dow}function Zb(){return this._week.doy}function $b(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function _b(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function ac(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function bc(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function cc(a){return this._weekdaysShort[a.day()]}function dc(a){return this._weekdaysMin[a.day()]}function ec(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;7>d;++d)f=h([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=md.call(this._weekdaysParse,g),-1!==e?e:null):"ddd"===b?(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:null):(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null):"dddd"===b?(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null))):"ddd"===b?(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null))):(e=md.call(this._minWeekdaysParse,g),-1!==e?e:(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:null)))}function fc(a,b,c){var d,e,f;if(this._weekdaysParseExact)return ec.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=h([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function gc(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=ac(a,this.localeData()),this.add(a-b,"d")):b}function hc(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function ic(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function jc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex}function kc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex}function lc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex}function mc(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],i=[],j=[],k=[];for(b=0;7>b;b++)c=h([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),i.push(e),j.push(f),k.push(d),k.push(e),k.push(f);for(g.sort(a),i.sort(a),j.sort(a),k.sort(a),b=0;7>b;b++)i[b]=Z(i[b]),j[b]=Z(j[b]),k[b]=Z(k[b]);this._weekdaysRegex=new RegExp("^("+k.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}function nc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function oc(){return this.hours()%12||12}function pc(){return this.hours()||24}function qc(a,b){R(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function rc(a,b){return b._meridiemParse}function sc(a){return"p"===(a+"").toLowerCase().charAt(0)}function tc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function uc(a,b){b[Sd]=r(1e3*("0."+a))}function vc(){return this._isUTC?"UTC":""}function wc(){return this._isUTC?"Coordinated Universal Time":""}function xc(a){return Ka(1e3*a)}function yc(){return Ka.apply(null,arguments).parseZone()}function zc(a,b,c){var d=this._calendar[a];return w(d)?d.call(b,c):d}function Ac(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function Bc(){return this._invalidDate}function Cc(a){return this._ordinal.replace("%d",a)}function Dc(a){return a}function Ec(a,b,c,d){var e=this._relativeTime[c];return w(e)?e(a,b,c,d):e.replace(/%d/i,a)}function Fc(a,b){var c=this._relativeTime[a>0?"future":"past"];return w(c)?c(b):c.replace(/%s/i,b)}function Gc(a,b,c,d){var e=H(),f=h().set(d,b);return e[c](f,a)}function Hc(a,b,c){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return Gc(a,b,c,"month");var d,e=[];for(d=0;12>d;d++)e[d]=Gc(a,d,c,"month");return e}function Ic(a,b,c,d){"boolean"==typeof a?("number"==typeof b&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,"number"==typeof b&&(c=b,b=void 0),b=b||"");var e=H(),f=a?e._week.dow:0;if(null!=c)return Gc(b,(c+f)%7,d,"day");var g,h=[];for(g=0;7>g;g++)h[g]=Gc(b,(g+f)%7,d,"day");return h}function Jc(a,b){return Hc(a,b,"months")}function Kc(a,b){return Hc(a,b,"monthsShort")}function Lc(a,b,c){return Ic(a,b,c,"weekdays")}function Mc(a,b,c){return Ic(a,b,c,"weekdaysShort")}function Nc(a,b,c){return Ic(a,b,c,"weekdaysMin")}function Oc(){var a=this._data;return this._milliseconds=Le(this._milliseconds),this._days=Le(this._days),this._months=Le(this._months),a.milliseconds=Le(a.milliseconds),a.seconds=Le(a.seconds),a.minutes=Le(a.minutes),a.hours=Le(a.hours),a.months=Le(a.months),a.years=Le(a.years),this}function Pc(a,b,c,d){var e=db(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Qc(a,b){return Pc(this,a,b,1)}function Rc(a,b){return Pc(this,a,b,-1)}function Sc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Tc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Sc(Vc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Uc(g)),h+=e,g-=Sc(Vc(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Uc(a){return 4800*a/146097}function Vc(a){return 146097*a/4800}function Wc(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Uc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Vc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Xc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Yc(a){return function(){return this.as(a)}}function Zc(a){
return a=K(a),this[a+"s"]()}function $c(a){return function(){return this._data[a]}}function _c(){return q(this.days()/7)}function ad(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function bd(a,b,c){var d=db(a).abs(),e=_e(d.as("s")),f=_e(d.as("m")),g=_e(d.as("h")),h=_e(d.as("d")),i=_e(d.as("M")),j=_e(d.as("y")),k=e<af.s&&["s",e]||1>=f&&["m"]||f<af.m&&["mm",f]||1>=g&&["h"]||g<af.h&&["hh",g]||1>=h&&["d"]||h<af.d&&["dd",h]||1>=i&&["M"]||i<af.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,ad.apply(null,k)}function cd(a,b){return void 0===af[a]?!1:void 0===b?af[a]:(af[a]=b,!0)}function dd(a){var b=this.localeData(),c=bd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function ed(){var a,b,c,d=bf(this._milliseconds)/1e3,e=bf(this._days),f=bf(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var fd,gd;gd=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;c>d;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var hd=a.momentProperties=[],id=!1,jd={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var kd;kd=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)f(a,b)&&c.push(b);return c};var ld,md,nd={},od={},pd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,qd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,rd={},sd={},td=/\d/,ud=/\d\d/,vd=/\d{3}/,wd=/\d{4}/,xd=/[+-]?\d{6}/,yd=/\d\d?/,zd=/\d\d\d\d?/,Ad=/\d\d\d\d\d\d?/,Bd=/\d{1,3}/,Cd=/\d{1,4}/,Dd=/[+-]?\d{1,6}/,Ed=/\d+/,Fd=/[+-]?\d+/,Gd=/Z|[+-]\d\d:?\d\d/gi,Hd=/Z|[+-]\d\d(?::?\d\d)?/gi,Id=/[+-]?\d+(\.\d{1,3})?/,Jd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Kd={},Ld={},Md=0,Nd=1,Od=2,Pd=3,Qd=4,Rd=5,Sd=6,Td=7,Ud=8;md=Array.prototype.indexOf?Array.prototype.indexOf:function(a){var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1},R("M",["MM",2],"Mo",function(){return this.month()+1}),R("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),R("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),W("M",yd),W("MM",yd,ud),W("MMM",function(a,b){return b.monthsShortRegex(a)}),W("MMMM",function(a,b){return b.monthsRegex(a)}),$(["M","MM"],function(a,b){b[Nd]=r(a)-1}),$(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[Nd]=e:j(c).invalidMonth=a});var Vd=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Wd="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Xd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Yd=Jd,Zd=Jd,$d=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,_d=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,ae=/Z|[+-]\d\d(?::?\d\d)?/,be=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],ce=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],de=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=u("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),R("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),R(0,["YY",2],0,function(){return this.year()%100}),R(0,["YYYY",4],0,"year"),R(0,["YYYYY",5],0,"year"),R(0,["YYYYYY",6,!0],0,"year"),J("year","y"),W("Y",Fd),W("YY",yd,ud),W("YYYY",Cd,wd),W("YYYYY",Dd,xd),W("YYYYYY",Dd,xd),$(["YYYYY","YYYYYY"],Md),$("YYYY",function(b,c){c[Md]=2===b.length?a.parseTwoDigitYear(b):r(b)}),$("YY",function(b,c){c[Md]=a.parseTwoDigitYear(b)}),$("Y",function(a,b){b[Md]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var ee=M("FullYear",!0);a.ISO_8601=function(){};var fe=u("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ka.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),ge=u("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ka.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),he=function(){return Date.now?Date.now():+new Date};Qa("Z",":"),Qa("ZZ",""),W("Z",Hd),W("ZZ",Hd),$(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ra(Hd,a)});var ie=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var je=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,ke=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;db.fn=Oa.prototype;var le=ib(1,"add"),me=ib(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var ne=u("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});R(0,["gg",2],0,function(){return this.weekYear()%100}),R(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Pb("gggg","weekYear"),Pb("ggggg","weekYear"),Pb("GGGG","isoWeekYear"),Pb("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),W("G",Fd),W("g",Fd),W("GG",yd,ud),W("gg",yd,ud),W("GGGG",Cd,wd),W("gggg",Cd,wd),W("GGGGG",Dd,xd),W("ggggg",Dd,xd),_(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),_(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),R("Q",0,"Qo","quarter"),J("quarter","Q"),W("Q",td),$("Q",function(a,b){b[Nd]=3*(r(a)-1)}),R("w",["ww",2],"wo","week"),R("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),W("w",yd),W("ww",yd,ud),W("W",yd),W("WW",yd,ud),_(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var oe={dow:0,doy:6};R("D",["DD",2],"Do","date"),J("date","D"),W("D",yd),W("DD",yd,ud),W("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),$(["D","DD"],Od),$("Do",function(a,b){b[Od]=r(a.match(yd)[0],10)});var pe=M("Date",!0);R("d",0,"do","day"),R("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),R("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),R("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),R("e",0,0,"weekday"),R("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),W("d",yd),W("e",yd),W("E",yd),W("dd",function(a,b){return b.weekdaysMinRegex(a)}),W("ddd",function(a,b){return b.weekdaysShortRegex(a)}),W("dddd",function(a,b){return b.weekdaysRegex(a)}),_(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),_(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var qe="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),re="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),se="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),te=Jd,ue=Jd,ve=Jd;R("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),W("DDD",Bd),W("DDDD",vd),$(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),R("H",["HH",2],0,"hour"),R("h",["hh",2],0,oc),R("k",["kk",2],0,pc),R("hmm",0,0,function(){return""+oc.apply(this)+Q(this.minutes(),2)}),R("hmmss",0,0,function(){return""+oc.apply(this)+Q(this.minutes(),2)+Q(this.seconds(),2)}),R("Hmm",0,0,function(){return""+this.hours()+Q(this.minutes(),2)}),R("Hmmss",0,0,function(){return""+this.hours()+Q(this.minutes(),2)+Q(this.seconds(),2)}),qc("a",!0),qc("A",!1),J("hour","h"),W("a",rc),W("A",rc),W("H",yd),W("h",yd),W("HH",yd,ud),W("hh",yd,ud),W("hmm",zd),W("hmmss",Ad),W("Hmm",zd),W("Hmmss",Ad),$(["H","HH"],Pd),$(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),$(["h","hh"],function(a,b,c){b[Pd]=r(a),j(c).bigHour=!0}),$("hmm",function(a,b,c){var d=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d)),j(c).bigHour=!0}),$("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d,2)),b[Rd]=r(a.substr(e)),j(c).bigHour=!0}),$("Hmm",function(a,b,c){var d=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d))}),$("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d,2)),b[Rd]=r(a.substr(e))});var we=/[ap]\.?m?\.?/i,xe=M("Hours",!0);R("m",["mm",2],0,"minute"),J("minute","m"),W("m",yd),W("mm",yd,ud),$(["m","mm"],Qd);var ye=M("Minutes",!1);R("s",["ss",2],0,"second"),J("second","s"),W("s",yd),W("ss",yd,ud),$(["s","ss"],Rd);var ze=M("Seconds",!1);R("S",0,0,function(){return~~(this.millisecond()/100)}),R(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),R(0,["SSS",3],0,"millisecond"),R(0,["SSSS",4],0,function(){return 10*this.millisecond()}),R(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),R(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),R(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),R(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),R(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),W("S",Bd,td),W("SS",Bd,ud),W("SSS",Bd,vd);var Ae;for(Ae="SSSS";Ae.length<=9;Ae+="S")W(Ae,Ed);for(Ae="S";Ae.length<=9;Ae+="S")$(Ae,uc);var Be=M("Milliseconds",!1);R("z",0,0,"zoneAbbr"),R("zz",0,0,"zoneName");var Ce=o.prototype;Ce.add=le,Ce.calendar=kb,Ce.clone=lb,Ce.diff=sb,Ce.endOf=Eb,Ce.format=wb,Ce.from=xb,Ce.fromNow=yb,Ce.to=zb,Ce.toNow=Ab,Ce.get=P,Ce.invalidAt=Nb,Ce.isAfter=mb,Ce.isBefore=nb,Ce.isBetween=ob,Ce.isSame=pb,Ce.isSameOrAfter=qb,Ce.isSameOrBefore=rb,Ce.isValid=Lb,Ce.lang=ne,Ce.locale=Bb,Ce.localeData=Cb,Ce.max=ge,Ce.min=fe,Ce.parsingFlags=Mb,Ce.set=P,Ce.startOf=Db,Ce.subtract=me,Ce.toArray=Ib,Ce.toObject=Jb,Ce.toDate=Hb,Ce.toISOString=vb,Ce.toJSON=Kb,Ce.toString=ub,Ce.unix=Gb,Ce.valueOf=Fb,Ce.creationData=Ob,Ce.year=ee,Ce.isLeapYear=ta,Ce.weekYear=Qb,Ce.isoWeekYear=Rb,Ce.quarter=Ce.quarters=Wb,Ce.month=ha,Ce.daysInMonth=ia,Ce.week=Ce.weeks=$b,Ce.isoWeek=Ce.isoWeeks=_b,Ce.weeksInYear=Tb,Ce.isoWeeksInYear=Sb,Ce.date=pe,Ce.day=Ce.days=gc,Ce.weekday=hc,Ce.isoWeekday=ic,Ce.dayOfYear=nc,Ce.hour=Ce.hours=xe,Ce.minute=Ce.minutes=ye,Ce.second=Ce.seconds=ze,Ce.millisecond=Ce.milliseconds=Be,Ce.utcOffset=Ua,Ce.utc=Wa,Ce.local=Xa,Ce.parseZone=Ya,Ce.hasAlignedHourOffset=Za,Ce.isDST=$a,Ce.isDSTShifted=_a,Ce.isLocal=ab,Ce.isUtcOffset=bb,Ce.isUtc=cb,Ce.isUTC=cb,Ce.zoneAbbr=vc,Ce.zoneName=wc,Ce.dates=u("dates accessor is deprecated. Use date instead.",pe),Ce.months=u("months accessor is deprecated. Use month instead",ha),Ce.years=u("years accessor is deprecated. Use year instead",ee),Ce.zone=u("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Va);var De=Ce,Ee={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Fe={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ge="Invalid date",He="%d",Ie=/\d{1,2}/,Je={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ke=A.prototype;Ke._calendar=Ee,Ke.calendar=zc,Ke._longDateFormat=Fe,Ke.longDateFormat=Ac,Ke._invalidDate=Ge,Ke.invalidDate=Bc,Ke._ordinal=He,Ke.ordinal=Cc,Ke._ordinalParse=Ie,Ke.preparse=Dc,Ke.postformat=Dc,Ke._relativeTime=Je,Ke.relativeTime=Ec,Ke.pastFuture=Fc,Ke.set=y,Ke.months=ca,Ke._months=Wd,Ke.monthsShort=da,Ke._monthsShort=Xd,Ke.monthsParse=fa,Ke._monthsRegex=Zd,Ke.monthsRegex=ka,Ke._monthsShortRegex=Yd,Ke.monthsShortRegex=ja,Ke.week=Xb,Ke._week=oe,Ke.firstDayOfYear=Zb,Ke.firstDayOfWeek=Yb,Ke.weekdays=bc,Ke._weekdays=qe,Ke.weekdaysMin=dc,Ke._weekdaysMin=se,Ke.weekdaysShort=cc,Ke._weekdaysShort=re,Ke.weekdaysParse=fc,Ke._weekdaysRegex=te,Ke.weekdaysRegex=jc,Ke._weekdaysShortRegex=ue,Ke.weekdaysShortRegex=kc,Ke._weekdaysMinRegex=ve,Ke.weekdaysMinRegex=lc,Ke.isPM=sc,Ke._meridiemParse=we,Ke.meridiem=tc,E("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=u("moment.lang is deprecated. Use moment.locale instead.",E),a.langData=u("moment.langData is deprecated. Use moment.localeData instead.",H);var Le=Math.abs,Me=Yc("ms"),Ne=Yc("s"),Oe=Yc("m"),Pe=Yc("h"),Qe=Yc("d"),Re=Yc("w"),Se=Yc("M"),Te=Yc("y"),Ue=$c("milliseconds"),Ve=$c("seconds"),We=$c("minutes"),Xe=$c("hours"),Ye=$c("days"),Ze=$c("months"),$e=$c("years"),_e=Math.round,af={s:45,m:45,h:22,d:26,M:11},bf=Math.abs,cf=Oa.prototype;cf.abs=Oc,cf.add=Qc,cf.subtract=Rc,cf.as=Wc,cf.asMilliseconds=Me,cf.asSeconds=Ne,cf.asMinutes=Oe,cf.asHours=Pe,cf.asDays=Qe,cf.asWeeks=Re,cf.asMonths=Se,cf.asYears=Te,cf.valueOf=Xc,cf._bubble=Tc,cf.get=Zc,cf.milliseconds=Ue,cf.seconds=Ve,cf.minutes=We,cf.hours=Xe,cf.days=Ye,cf.weeks=_c,cf.months=Ze,cf.years=$e,cf.humanize=dd,cf.toISOString=ed,cf.toString=ed,cf.toJSON=ed,cf.locale=Bb,cf.localeData=Cb,cf.toIsoString=u("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",ed),cf.lang=ne,R("X",0,0,"unix"),R("x",0,0,"valueOf"),W("x",Fd),W("X",Id),$("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),$("x",function(a,b,c){c._d=new Date(r(a))}),a.version="2.13.0",b(Ka),a.fn=De,a.min=Ma,a.max=Na,a.now=he,a.utc=h,a.unix=xc,a.months=Jc,a.isDate=d,a.locale=E,a.invalid=l,a.duration=db,a.isMoment=p,a.weekdays=Lc,a.parseZone=yc,a.localeData=H,a.isDuration=Pa,a.monthsShort=Kc,a.weekdaysMin=Nc,a.defineLocale=F,a.updateLocale=G,a.locales=I,a.weekdaysShort=Mc,a.normalizeUnits=K,a.relativeTimeThreshold=cd,a.prototype=De;var df=a;return df});

/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('name')){
          var videoName = 'fitvid' + $.fn.fitVids._count;
          $this.attr('name', videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
  
  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;
  
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

  (function (root, factory)
  {
      'use strict';

      var moment;
      if (typeof exports === 'object') {
          // CommonJS module
          // Load moment.js as an optional dependency
          try { moment = require('moment'); } catch (e) {}
          module.exports = factory(moment);
      } else if (typeof define === 'function' && define.amd) {
          // AMD. Register as an anonymous module.
          define(function (req)
          {
              // Load moment.js as an optional dependency
              var id = 'moment';
              try { moment = req(id); } catch (e) {}
              return factory(moment);
          });
      } else {
          root.Pikaday = factory(root.moment);
      }
  }(this, function (moment)
  {
      'use strict';

      /**
       * feature detection and helper functions
       */
      var hasMoment = typeof moment === 'function',

      hasEventListeners = !!window.addEventListener,

      document = window.document,

      sto = window.setTimeout,

      addEvent = function(el, e, callback, capture)
      {
          if (hasEventListeners) {
              el.addEventListener(e, callback, !!capture);
          } else {
              el.attachEvent('on' + e, callback);
          }
      },

      removeEvent = function(el, e, callback, capture)
      {
          if (hasEventListeners) {
              el.removeEventListener(e, callback, !!capture);
          } else {
              el.detachEvent('on' + e, callback);
          }
      },

      fireEvent = function(el, eventName, data)
      {
          var ev;

          if (document.createEvent) {
              ev = document.createEvent('HTMLEvents');
              ev.initEvent(eventName, true, false);
              ev = extend(ev, data);
              el.dispatchEvent(ev);
          } else if (document.createEventObject) {
              ev = document.createEventObject();
              ev = extend(ev, data);
              el.fireEvent('on' + eventName, ev);
          }
      },

      trim = function(str)
      {
          return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
      },

      hasClass = function(el, cn)
      {
          return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
      },

      addClass = function(el, cn)
      {
          if (!hasClass(el, cn)) {
              el.className = (el.className === '') ? cn : el.className + ' ' + cn;
          }
      },

      removeClass = function(el, cn)
      {
          el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
      },

      isArray = function(obj)
      {
          return (/Array/).test(Object.prototype.toString.call(obj));
      },

      isDate = function(obj)
      {
          return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
      },

      isWeekend = function(date)
      {
          var day = date.getDay();
          return day === 0 || day === 6;
      },

      isLeapYear = function(year)
      {
          // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      },

      getDaysInMonth = function(year, month)
      {
          return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      },

      setToStartOfDay = function(date)
      {
          if (isDate(date)) date.setHours(0,0,0,0);
      },

      compareDates = function(a,b)
      {
          // weak date comparison (use setToStartOfDay(date) to ensure correct result)
          return a.getTime() === b.getTime();
      },

      extend = function(to, from, overwrite)
      {
          var prop, hasProp;
          for (prop in from) {
              hasProp = to[prop] !== undefined;
              if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                  if (isDate(from[prop])) {
                      if (overwrite) {
                          to[prop] = new Date(from[prop].getTime());
                      }
                  }
                  else if (isArray(from[prop])) {
                      if (overwrite) {
                          to[prop] = from[prop].slice(0);
                      }
                  } else {
                      to[prop] = extend({}, from[prop], overwrite);
                  }
              } else if (overwrite || !hasProp) {
                  to[prop] = from[prop];
              }
          }
          return to;
      },

      adjustCalendar = function(calendar) {
          if (calendar.month < 0) {
              calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
              calendar.month += 12;
          }
          if (calendar.month > 11) {
              calendar.year += Math.floor(Math.abs(calendar.month)/12);
              calendar.month -= 12;
          }
          return calendar;
      },

      /**
       * defaults and localisation
       */
      defaults = {

          // bind the picker to a form field
          field: null,

          // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
          bound: undefined,

          // position of the datepicker, relative to the field (default to bottom & left)
          // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
          position: 'bottom left',

          // automatically fit in the viewport even if it means repositioning from the position option
          reposition: true,

          // the default output format for `.toString()` and `field` value
          format: 'YYYY-MM-DD',

          // the initial date to view when first opened
          defaultDate: null,

          // make the `defaultDate` the initial selected value
          setDefaultDate: false,

          // first day of week (0: Sunday, 1: Monday etc)
          firstDay: 0,

          // the default flag for moment's strict date parsing
          formatStrict: false,

          // the minimum/earliest date that can be selected
          minDate: null,
          // the maximum/latest date that can be selected
          maxDate: null,

          // number of years either side, or array of upper/lower range
          yearRange: 10,

          // show week numbers at head of row
          showWeekNumber: false,

          // used internally (don't config outside)
          minYear: 0,
          maxYear: 9999,
          minMonth: undefined,
          maxMonth: undefined,

          startRange: null,
          endRange: null,

          isRTL: false,

          // Additional text to append to the year in the calendar title
          yearSuffix: '',

          // Render the month after year in the calendar title
          showMonthAfterYear: false,

          // Render days of the calendar grid that fall in the next or previous month
          showDaysInNextAndPreviousMonths: false,

          // how many months are visible
          numberOfMonths: 1,

          // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
          // only used for the first display or when a selected date is not visible
          mainCalendar: 'left',

          // Specify a DOM element to render the calendar in
          container: undefined,

          // internationalization
          i18n: {
              previousMonth : 'Previous Month',
              nextMonth     : 'Next Month',
              months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
              weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
              weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
          },

          // Theme Classname
          theme: null,

          // callback function
          onSelect: null,
          onOpen: null,
          onClose: null,
          onDraw: null
      },


      /**
       * templating functions to abstract HTML rendering
       */
      renderDayName = function(opts, day, abbr)
      {
          day += opts.firstDay;
          while (day >= 7) {
              day -= 7;
          }
          return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
      },

      renderDay = function(opts)
      {
          var arr = [];
          var ariaSelected = 'false';
          if (opts.isEmpty) {
              if (opts.showDaysInNextAndPreviousMonths) {
                  arr.push('is-outside-current-month');
              } else {
                  return '<td class="is-empty"></td>';
              }
          }
          if (opts.isDisabled) {
              arr.push('is-disabled');
          }
          if (opts.isToday) {
              arr.push('is-today');
          }
          if (opts.isSelected) {
              arr.push('is-selected');
              ariaSelected = 'true';
          }
          if (opts.isInRange) {
              arr.push('is-inrange');
          }
          if (opts.isStartRange) {
              arr.push('is-startrange');
          }
          if (opts.isEndRange) {
              arr.push('is-endrange');
          }
          return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
                   '<button class="pika-button pika-day" type="button" ' +
                      'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
                          opts.day +
                   '</button>' +
                 '</td>';
      },

      renderWeek = function (d, m, y) {
          // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
          var onejan = new Date(y, 0, 1),
              weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);
          return '<td class="pika-week">' + weekNum + '</td>';
      },

      renderRow = function(days, isRTL)
      {
          return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
      },

      renderBody = function(rows)
      {
          return '<tbody>' + rows.join('') + '</tbody>';
      },

      renderHead = function(opts)
      {
          var i, arr = [];
          if (opts.showWeekNumber) {
              arr.push('<th></th>');
          }
          for (i = 0; i < 7; i++) {
              arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
          }
          return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
      },

      renderTitle = function(instance, c, year, month, refYear, randId)
      {
          var i, j, arr,
              opts = instance._o,
              isMinYear = year === opts.minYear,
              isMaxYear = year === opts.maxYear,
              html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
              monthHtml,
              yearHtml,
              prev = true,
              next = true;

          for (arr = [], i = 0; i < 12; i++) {
              arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                  (i === month ? ' selected="selected"': '') +
                  ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled="disabled"' : '') + '>' +
                  opts.i18n.months[i] + '</option>');
          }

          monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

          if (isArray(opts.yearRange)) {
              i = opts.yearRange[0];
              j = opts.yearRange[1] + 1;
          } else {
              i = year - opts.yearRange;
              j = 1 + year + opts.yearRange;
          }

          for (arr = []; i < j && i <= opts.maxYear; i++) {
              if (i >= opts.minYear) {
                  arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"': '') + '>' + (i) + '</option>');
              }
          }
          yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

          if (opts.showMonthAfterYear) {
              html += yearHtml + monthHtml;
          } else {
              html += monthHtml + yearHtml;
          }

          if (isMinYear && (month === 0 || opts.minMonth >= month)) {
              prev = false;
          }

          if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
              next = false;
          }

          if (c === 0) {
              html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
          }
          if (c === (instance._o.numberOfMonths - 1) ) {
              html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
          }

          return html += '</div>';
      },

      renderTable = function(opts, data, randId)
      {
          return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
      },


      /**
       * Pikaday constructor
       */
      Pikaday = function(options)
      {
          var self = this,
              opts = self.config(options);

          self._onMouseDown = function(e)
          {
              if (!self._v) {
                  return;
              }
              e = e || window.event;
              var target = e.target || e.srcElement;
              if (!target) {
                  return;
              }

              if (!hasClass(target, 'is-disabled')) {
                  if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                      self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                      if (opts.bound) {
                          sto(function() {
                              self.hide();
                              if (opts.field) {
                                  opts.field.blur();
                              }
                          }, 100);
                      }
                  }
                  else if (hasClass(target, 'pika-prev')) {
                      self.prevMonth();
                  }
                  else if (hasClass(target, 'pika-next')) {
                      self.nextMonth();
                  }
              }
              if (!hasClass(target, 'pika-select')) {
                  // if this is touch event prevent mouse events emulation
                  if (e.preventDefault) {
                      e.preventDefault();
                  } else {
                      e.returnValue = false;
                      return false;
                  }
              } else {
                  self._c = true;
              }
          };

          self._onChange = function(e)
          {
              e = e || window.event;
              var target = e.target || e.srcElement;
              if (!target) {
                  return;
              }
              if (hasClass(target, 'pika-select-month')) {
                  self.gotoMonth(target.value);
              }
              else if (hasClass(target, 'pika-select-year')) {
                  self.gotoYear(target.value);
              }
          };

          self._onKeyChange = function(e)
          {
              e = e || window.event;

              if (self.isVisible()) {

                  switch(e.keyCode){
                      case 13:
                      case 27:
                          opts.field.blur();
                          break;
                      case 37:
                          e.preventDefault();
                          self.adjustDate('subtract', 1);
                          break;
                      case 38:
                          self.adjustDate('subtract', 7);
                          break;
                      case 39:
                          self.adjustDate('add', 1);
                          break;
                      case 40:
                          self.adjustDate('add', 7);
                          break;
                  }
              }
          };

          self._onInputChange = function(e)
          {
              var date;

              if (e.firedBy === self) {
                  return;
              }
              if (hasMoment) {
                  date = moment(opts.field.value, opts.format, opts.formatStrict);
                  date = (date && date.isValid()) ? date.toDate() : null;
              }
              else {
                  date = new Date(Date.parse(opts.field.value));
              }
              if (isDate(date)) {
                self.setDate(date);
              }
              if (!self._v) {
                  self.show();
              }
          };

          self._onInputFocus = function()
          {
              self.show();
          };

          self._onInputClick = function()
          {
              self.show();
          };

          self._onInputBlur = function()
          {
              // IE allows pika div to gain focus; catch blur the input field
              var pEl = document.activeElement;
              do {
                  if (hasClass(pEl, 'pika-single')) {
                      return;
                  }
              }
              while ((pEl = pEl.parentNode));

              if (!self._c) {
                  self._b = sto(function() {
                      self.hide();
                  }, 50);
              }
              self._c = false;
          };

          self._onClick = function(e)
          {
              e = e || window.event;
              var target = e.target || e.srcElement,
                  pEl = target;
              if (!target) {
                  return;
              }
              if (!hasEventListeners && hasClass(target, 'pika-select')) {
                  if (!target.onchange) {
                      target.setAttribute('onchange', 'return;');
                      addEvent(target, 'change', self._onChange);
                  }
              }
              do {
                  if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                      return;
                  }
              }
              while ((pEl = pEl.parentNode));
              if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                  self.hide();
              }
          };

          self.el = document.createElement('div');
          self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

          addEvent(self.el, 'mousedown', self._onMouseDown, true);
          addEvent(self.el, 'touchend', self._onMouseDown, true);
          addEvent(self.el, 'change', self._onChange);
          addEvent(document, 'keydown', self._onKeyChange);

          if (opts.field) {
              if (opts.container) {
                  opts.container.appendChild(self.el);
              } else if (opts.bound) {
                  document.body.appendChild(self.el);
              } else {
                  opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
              }
              addEvent(opts.field, 'change', self._onInputChange);

              if (!opts.defaultDate) {
                  if (hasMoment && opts.field.value) {
                      opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                  } else {
                      opts.defaultDate = new Date(Date.parse(opts.field.value));
                  }
                  opts.setDefaultDate = true;
              }
          }

          var defDate = opts.defaultDate;

          if (isDate(defDate)) {
              if (opts.setDefaultDate) {
                  self.setDate(defDate, true);
              } else {
                  self.gotoDate(defDate);
              }
          } else {
              self.gotoDate(new Date());
          }

          if (opts.bound) {
              this.hide();
              self.el.className += ' is-bound';
              addEvent(opts.trigger, 'click', self._onInputClick);
              addEvent(opts.trigger, 'focus', self._onInputFocus);
              addEvent(opts.trigger, 'blur', self._onInputBlur);
          } else {
              this.show();
          }
      };


      /**
       * public Pikaday API
       */
      Pikaday.prototype = {


          /**
           * configure functionality
           */
          config: function(options)
          {
              if (!this._o) {
                  this._o = extend({}, defaults, true);
              }

              var opts = extend(this._o, options, true);

              opts.isRTL = !!opts.isRTL;

              opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

              opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;

              opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

              opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

              opts.disableWeekends = !!opts.disableWeekends;

              opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;

              var nom = parseInt(opts.numberOfMonths, 10) || 1;
              opts.numberOfMonths = nom > 4 ? 4 : nom;

              if (!isDate(opts.minDate)) {
                  opts.minDate = false;
              }
              if (!isDate(opts.maxDate)) {
                  opts.maxDate = false;
              }
              if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                  opts.maxDate = opts.minDate = false;
              }
              if (opts.minDate) {
                  this.setMinDate(opts.minDate);
              }
              if (opts.maxDate) {
                  this.setMaxDate(opts.maxDate);
              }

              if (isArray(opts.yearRange)) {
                  var fallback = new Date().getFullYear() - 10;
                  opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                  opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
              } else {
                  opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                  if (opts.yearRange > 100) {
                      opts.yearRange = 100;
                  }
              }

              return opts;
          },

          /**
           * return a formatted string of the current selection (using Moment.js if available)
           */
          toString: function(format)
          {
              return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
          },

          /**
           * return a Moment.js object of the current selection (if available)
           */
          getMoment: function()
          {
              return hasMoment ? moment(this._d) : null;
          },

          /**
           * set the current selection from a Moment.js object (if available)
           */
          setMoment: function(date, preventOnSelect)
          {
              if (hasMoment && moment.isMoment(date)) {
                  this.setDate(date.toDate(), preventOnSelect);
              }
          },

          /**
           * return a Date object of the current selection with fallback for the current date
           */
          getDate: function()
          {
              return isDate(this._d) ? new Date(this._d.getTime()) : new Date();
          },

          /**
           * set the current selection
           */
          setDate: function(date, preventOnSelect)
          {
              if (!date) {
                  this._d = null;

                  if (this._o.field) {
                      this._o.field.value = '';
                      fireEvent(this._o.field, 'change', { firedBy: this });
                  }

                  return this.draw();
              }
              if (typeof date === 'string') {
                  date = new Date(Date.parse(date));
              }
              if (!isDate(date)) {
                  return;
              }

              var min = this._o.minDate,
                  max = this._o.maxDate;

              if (isDate(min) && date < min) {
                  date = min;
              } else if (isDate(max) && date > max) {
                  date = max;
              }

              this._d = new Date(date.getTime());
              setToStartOfDay(this._d);
              this.gotoDate(this._d);

              if (this._o.field) {
                  this._o.field.value = this.toString();
                  fireEvent(this._o.field, 'change', { firedBy: this });
              }
              if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                  this._o.onSelect.call(this, this.getDate());
              }
          },

          /**
           * change view to a specific date
           */
          gotoDate: function(date)
          {
              var newCalendar = true;

              if (!isDate(date)) {
                  return;
              }

              if (this.calendars) {
                  var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                      lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
                      visibleDate = date.getTime();
                  // get the end of the month
                  lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
                  lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
                  newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
              }

              if (newCalendar) {
                  this.calendars = [{
                      month: date.getMonth(),
                      year: date.getFullYear()
                  }];
                  if (this._o.mainCalendar === 'right') {
                      this.calendars[0].month += 1 - this._o.numberOfMonths;
                  }
              }

              this.adjustCalendars();
          },

          adjustDate: function(sign, days) {

              var day = this.getDate();
              var difference = parseInt(days)*24*60*60*1000;

              var newDay;

              if (sign === 'add') {
                  newDay = new Date(day.valueOf() + difference);
              } else if (sign === 'subtract') {
                  newDay = new Date(day.valueOf() - difference);
              }

              if (hasMoment) {
                  if (sign === 'add') {
                      newDay = moment(day).add(days, "days").toDate();
                  } else if (sign === 'subtract') {
                      newDay = moment(day).subtract(days, "days").toDate();
                  }
              }

              this.setDate(newDay);
          },

          adjustCalendars: function() {
              this.calendars[0] = adjustCalendar(this.calendars[0]);
              for (var c = 1; c < this._o.numberOfMonths; c++) {
                  this.calendars[c] = adjustCalendar({
                      month: this.calendars[0].month + c,
                      year: this.calendars[0].year
                  });
              }
              this.draw();
          },

          gotoToday: function()
          {
              this.gotoDate(new Date());
          },

          /**
           * change view to a specific month (zero-index, e.g. 0: January)
           */
          gotoMonth: function(month)
          {
              if (!isNaN(month)) {
                  this.calendars[0].month = parseInt(month, 10);
                  this.adjustCalendars();
              }
          },

          nextMonth: function()
          {
              this.calendars[0].month++;
              this.adjustCalendars();
          },

          prevMonth: function()
          {
              this.calendars[0].month--;
              this.adjustCalendars();
          },

          /**
           * change view to a specific full year (e.g. "2012")
           */
          gotoYear: function(year)
          {
              if (!isNaN(year)) {
                  this.calendars[0].year = parseInt(year, 10);
                  this.adjustCalendars();
              }
          },

          /**
           * change the minDate
           */
          setMinDate: function(value)
          {
              if(value instanceof Date) {
                  setToStartOfDay(value);
                  this._o.minDate = value;
                  this._o.minYear  = value.getFullYear();
                  this._o.minMonth = value.getMonth();
              } else {
                  this._o.minDate = defaults.minDate;
                  this._o.minYear  = defaults.minYear;
                  this._o.minMonth = defaults.minMonth;
                  this._o.startRange = defaults.startRange;
              }

              this.draw();
          },

          /**
           * change the maxDate
           */
          setMaxDate: function(value)
          {
              if(value instanceof Date) {
                  setToStartOfDay(value);
                  this._o.maxDate = value;
                  this._o.maxYear = value.getFullYear();
                  this._o.maxMonth = value.getMonth();
              } else {
                  this._o.maxDate = defaults.maxDate;
                  this._o.maxYear = defaults.maxYear;
                  this._o.maxMonth = defaults.maxMonth;
                  this._o.endRange = defaults.endRange;
              }

              this.draw();
          },

          setStartRange: function(value)
          {
              this._o.startRange = value;
          },

          setEndRange: function(value)
          {
              this._o.endRange = value;
          },

          /**
           * refresh the HTML
           */
          draw: function(force)
          {
              if (!this._v && !force) {
                  return;
              }
              var opts = this._o,
                  minYear = opts.minYear,
                  maxYear = opts.maxYear,
                  minMonth = opts.minMonth,
                  maxMonth = opts.maxMonth,
                  html = '',
                  randId;

              if (this._y <= minYear) {
                  this._y = minYear;
                  if (!isNaN(minMonth) && this._m < minMonth) {
                      this._m = minMonth;
                  }
              }
              if (this._y >= maxYear) {
                  this._y = maxYear;
                  if (!isNaN(maxMonth) && this._m > maxMonth) {
                      this._m = maxMonth;
                  }
              }

              randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

              for (var c = 0; c < opts.numberOfMonths; c++) {
                  html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
              }

              this.el.innerHTML = html;

              if (opts.bound) {
                  if(opts.field.type !== 'hidden') {
                      sto(function() {
                          opts.trigger.focus();
                      }, 1);
                  }
              }

              if (typeof this._o.onDraw === 'function') {
                  this._o.onDraw(this);
              }
            // let the screen reader user know to use arrow keys
            //this._o.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
          },

          adjustPosition: function()
          {
              var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

              if (this._o.container) return;

              this.el.style.position = 'absolute';

              field = this._o.trigger;
              pEl = field;
              width = this.el.offsetWidth;
              height = this.el.offsetHeight;
              viewportWidth = window.innerWidth || document.documentElement.clientWidth;
              viewportHeight = window.innerHeight || document.documentElement.clientHeight;
              scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

              if (typeof field.getBoundingClientRect === 'function') {
                  clientRect = field.getBoundingClientRect();
                  left = clientRect.left + window.pageXOffset;
                  top = clientRect.bottom + window.pageYOffset;
              } else {
                  left = pEl.offsetLeft;
                  top  = pEl.offsetTop + pEl.offsetHeight;
                  while((pEl = pEl.offsetParent)) {
                      left += pEl.offsetLeft;
                      top  += pEl.offsetTop;
                  }
              }

              // default position is bottom & left
              if ((this._o.reposition && left + width > viewportWidth) ||
                  (
                      this._o.position.indexOf('right') > -1 &&
                      left - width + field.offsetWidth > 0
                  )
              ) {
                  left = left - width + field.offsetWidth;
              }
              if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
                  (
                      this._o.position.indexOf('top') > -1 &&
                      top - height - field.offsetHeight > 0
                  )
              ) {
                  top = top - height - field.offsetHeight;
              }

              this.el.style.left = left + 'px';
              this.el.style.top = top + 'px';
          },

          /**
           * render HTML for a particular month
           */
          render: function(year, month, randId)
          {
              var opts   = this._o,
                  now    = new Date(),
                  days   = getDaysInMonth(year, month),
                  before = new Date(year, month, 1).getDay(),
                  data   = [],
                  row    = [];
              setToStartOfDay(now);
              if (opts.firstDay > 0) {
                  before -= opts.firstDay;
                  if (before < 0) {
                      before += 7;
                  }
              }
              var previousMonth = month === 0 ? 11 : month - 1,
                  nextMonth = month === 11 ? 0 : month + 1,
                  yearOfPreviousMonth = month === 0 ? year - 1 : year,
                  yearOfNextMonth = month === 11 ? year + 1 : year,
                  daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
              var cells = days + before,
                  after = cells;
              while(after > 7) {
                  after -= 7;
              }
              cells += 7 - after;
              for (var i = 0, r = 0; i < cells; i++)
              {
                  var day = new Date(year, month, 1 + (i - before)),
                      isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                      isToday = compareDates(day, now),
                      isEmpty = i < before || i >= (days + before),
                      dayNumber = 1 + (i - before),
                      monthNumber = month,
                      yearNumber = year,
                      isStartRange = opts.startRange && compareDates(opts.startRange, day),
                      isEndRange = opts.endRange && compareDates(opts.endRange, day),
                      isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                      isDisabled = (opts.minDate && day < opts.minDate) ||
                                   (opts.maxDate && day > opts.maxDate) ||
                                   (opts.disableWeekends && isWeekend(day)) ||
                                   (opts.disableDayFn && opts.disableDayFn(day));

                  if (isEmpty) {
                      if (i < before) {
                          dayNumber = daysInPreviousMonth + dayNumber;
                          monthNumber = previousMonth;
                          yearNumber = yearOfPreviousMonth;
                      } else {
                          dayNumber = dayNumber - days;
                          monthNumber = nextMonth;
                          yearNumber = yearOfNextMonth;
                      }
                  }

                  var dayConfig = {
                          day: dayNumber,
                          month: monthNumber,
                          year: yearNumber,
                          isSelected: isSelected,
                          isToday: isToday,
                          isDisabled: isDisabled,
                          isEmpty: isEmpty,
                          isStartRange: isStartRange,
                          isEndRange: isEndRange,
                          isInRange: isInRange,
                          showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
                      };

                  row.push(renderDay(dayConfig));

                  if (++r === 7) {
                      if (opts.showWeekNumber) {
                          row.unshift(renderWeek(i - before, month, year));
                      }
                      data.push(renderRow(row, opts.isRTL));
                      row = [];
                      r = 0;
                  }
              }
              return renderTable(opts, data, randId);
          },

          isVisible: function()
          {
              return this._v;
          },

          show: function()
          {
              if (!this.isVisible()) {
                  removeClass(this.el, 'is-hidden');
                  this._v = true;
                  this.draw();
                  if (this._o.bound) {
                      addEvent(document, 'click', this._onClick);
                      this.adjustPosition();
                  }
                  if (typeof this._o.onOpen === 'function') {
                      this._o.onOpen.call(this);
                  }
              }
          },

          hide: function()
          {
              var v = this._v;
              if (v !== false) {
                  if (this._o.bound) {
                      removeEvent(document, 'click', this._onClick);
                  }
                  this.el.style.position = 'static'; // reset
                  this.el.style.left = 'auto';
                  this.el.style.top = 'auto';
                  addClass(this.el, 'is-hidden');
                  this._v = false;
                  if (v !== undefined && typeof this._o.onClose === 'function') {
                      this._o.onClose.call(this);
                  }
              }
          },

          /**
           * GAME OVER
           */
          destroy: function()
          {
              this.hide();
              removeEvent(this.el, 'mousedown', this._onMouseDown, true);
              removeEvent(this.el, 'touchend', this._onMouseDown, true);
              removeEvent(this.el, 'change', this._onChange);
              if (this._o.field) {
                  removeEvent(this._o.field, 'change', this._onInputChange);
                  if (this._o.bound) {
                      removeEvent(this._o.trigger, 'click', this._onInputClick);
                      removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                      removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                  }
              }
              if (this.el.parentNode) {
                  this.el.parentNode.removeChild(this.el);
              }
          }

      };

      return Pikaday;

  }));
