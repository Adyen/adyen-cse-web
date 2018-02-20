( function () {

    /**
     * Detect the type of card based on the card number supplied by the shopper.
     * 
     * The Card Type detection addOn can be used by providing a callback or a HTML placeholder element.
     * 
     * -----------------------------------------------------
     * Adding card type detection with a callback
     * -----------------------------------------------------
     * var myEncrypedForm = adyen.encrypt.createEncryptedForm( ... );
     * 
     * myEncrypedForm.addCardTypeDetection( function( type, friendlyName) {
     *    // called on every keypress, change event also when the type actually didn't change.
     * });
     * 
     * -----------------------------------------------------
     * Adding card type detection with a placeholder element
     * -----------------------------------------------------
     * var myEncrypedForm = adyen.encrypt.createEncryptedForm( ... );
     * 
     * Assuming you have <span id="cardtype"></span> in your page
     * at a location that suits your page design.
     * 
     * myEncrypedForm.addCardTypeDetection( document.getElementById('cardtype') );
     * 
     * In this case the #cardtype element will be changed to the
     * following HTML structure on updates:
     * <span id="cardType" class="cse-cardtype-visa">
     *     <span class="cse-cardtype-label">VISA</span>
     * </span>
     * 
     * Note that:
     * - A cse-cardtype-XYZ will be set based on the detected card type 
     * - A span with the friendly name will be added.
     * 
     * You can both the classname as the friendly name, or decide to hide
     * either of them.
     *    
     * An example CSS file (adyen.cardtype.css) can be used as reference to show
     * icons for the selected payment method, or how to hide the friendly name.
     */
    
    var adyen = window.adyen = window.adyen || {}, cardTypes = ( function () {

        /* adyen-hpp.cc.js */
    var Cards=new makeArray(33);Cards[0]=new CardType("mc","51,52,53,54,55,22,23,24,25,26,27","16");var MasterCard=Cards[0];Cards[1]=new CardType("visadankort","4571","16");var VisaDankort=Cards[1];Cards[2]=new CardType("visa","4","13,16");var VisaCard=Cards[2];Cards[3]=new CardType("amex","34,37","15");var AmExCard=Cards[3];Cards[4]=new CardType("vias","9","16");var AdyenCard=Cards[4];Cards[5]=new CardType("diners","36","14");var DinersClubCard=Cards[5];Cards[6]=new CardType("maestrouk","6759","16,18,19");var MaestroUKCard=Cards[6];Cards[7]=new CardType("solo","6767","16,18,19");var SoloCard=Cards[7];Cards[8]=new CardType("laser","6304,6706,677117,677120","16,17,18,19");var LaserCard=Cards[8];Cards[9]=new CardType("discover","6011,644,645,646,647,648,649,65","16");var DiscoverCard=Cards[9];Cards[10]=new CardType("jcb","3528,3529,353,354,355,356,357,358","16,19");var JCBCard=Cards[10];Cards[11]=new CardType("bcmc","479658,606005,6703","16,17,18,19");var Bcmc=Cards[11];Cards[12]=new CardType("bijcard","5100081","16");var BijCard=Cards[12];Cards[13]=new CardType("dankort","5019","16");var Dankort=Cards[13];Cards[14]=new CardType("hipercard","606282","16");var Hipercard=Cards[14];Cards[15]=new CardType("maestro","50,56,57,58,6","16,17,18,19");var MaestroCard=Cards[15];Cards[16]=new CardType("elo","401178,401179,438935,451416,457632,457393,431274,438935,457631,457632,506699,50670,50671,50672,50673,50674,50675,50676,506770,506771,506772,506773,506774,506775,506776,506777,506778,504175,627780,636297,636368,651652,651653,651654,651655,651656,651657,651658,651659,65166,65167,509,650031,650032,650033,650035,650036,650037,650038,650039,65004,650050,65005165500,65501,650485,650486,650487,650488,650489,65049,65050,65051,65052,650530,650531,650532,650533,650534,650535,650536,650537,650538,650541,650542,650543,650544,650545,650546,650547,650548,650549,65055,65056,65057,65058,650590,650591,650592,650593,650594,650595,650596,650597,650598,65070,650710,650711,650712,650713,650714,650715,650716,650717,650718,650720,650721,650722,650723,650724,650725,650726,650727,655021,655022,655023,655024,655025,655026,655027,655028,655029,65503,65504,655050,655051,655052,655053,655054,655055,655056,655057,655058,650901,650902,650903,650904,650905,650906,650907,650908,650909,65091,65092,65093,65094,65095,65096,650970,650971,650972,650973,650974,650975,650976,650977,650978,650405,650406,650407,650408,650409,65041,65042,65043","16");var Elo=Cards[16];Cards[17]=new CardType("uatp","1","15");var Uatp=Cards[17];Cards[18]=new CardType("cup","62","14,15,16,17,18,19");var Cup=Cards[18];Cards[19]=new CardType("cartebancaire","4,5,6","16");var CarteBancaire=Cards[19];Cards[20]=new CardType("visaalphabankbonus","450903","16");var VisAlphaBankBonus=Cards[20];Cards[21]=new CardType("mcalphabankbonus","510099","16");var McAlphaBankBonus=Cards[21];Cards[22]=new CardType("hiper","637095,637599,637609,637612","16");var Hiper=Cards[22];Cards[23]=new CardType("oasis","982616","16");var Oasis=Cards[23];Cards[24]=new CardType("karenmillen","98261465","16");var Karenmillen=Cards[24];Cards[25]=new CardType("warehouse","982633","16");var Warehouse=Cards[25];Cards[26]=new CardType("mir","220","16,17,18,19");var Mir=Cards[26];Cards[27]=new CardType("codensa","590712","16");var Codensa=Cards[27];Cards[28]=new CardType("naranja","377798,377799,402917,402918,527571,527572,589562","16,17,18,19");var Naranja=Cards[28];Cards[29]=new CardType("cabal","589657,600691,603522,6042,6043,636908","16,17,18,19");var Cabal=Cards[29];Cards[30]=new CardType("shopping","2799,589407,603488","16,17,18,19");var Shopping=Cards[30];Cards[31]=new CardType("argencard","501105","16,17,18,19");var Argencard=Cards[31];var LuhnCheckSum=Cards[32]=new CardType();function CheckCardNumber(cardNumber,expYear,expMon,cardType){var tmpyear;if(cardNumber.length==0){alert("Please enter a Card Number.");return false}if(expYear.length==0){alert("Please enter the Expiration Year.");return false}if(expYear>96){tmpyear="19"+expYear}else{if(expYear<21){tmpyear="20"+expYear}else{alert("The Expiration Year is not valid.");return false}}tmpmonth=expMon;if(!(new CardType()).isExpiryDate(tmpyear,tmpmonth)){alert("This card has already expired.");return false}card=cardType;var retval=eval(card+'.checkCardNumber("'+cardNumber+'", '+tmpyear+", "+tmpmonth+");");cardname="";if(retval){return true}else{for(var n=0;n<Cards.size;n++){if(Cards[n].checkCardNumber(cardNumber,tmpyear,tmpmonth)){cardname=Cards[n].getCardType();break}}if(cardname.length>0){alert("This looks like a "+cardname+" number, not a "+card+" number.")}else{alert("This card number is not valid.")}}}function CardType(){var f;var a=CardType.arguments;var d=CardType.arguments.length;this.objname="object CardType";var c=(d>0)?a[0]:"CardObject";var e=(d>1)?a[1]:"0,1,2,3,4,5,6,7,8,9";var b=(d>2)?a[2]:"13,14,15,16,19";this.setCardNumber=setCardNumber;this.setCardType=setCardType;this.setLen=setLen;this.setRules=setRules;this.setExpiryDate=setExpiryDate;this.setCardType(c);this.setLen(b);this.setRules(e);if(d>4){this.setExpiryDate(a[3],a[4])}this.checkCardNumber=checkCardNumber;this.getExpiryDate=getExpiryDate;this.getCardType=getCardType;this.isCardNumber=isCardNumber;this.isExpiryDate=isExpiryDate;this.luhnCheck=luhnCheck;return this}function checkCardNumber(){var a=checkCardNumber.arguments;var e=checkCardNumber.arguments.length;var c=(e>0)?a[0]:this.cardnumber;var b=(e>1)?a[1]:this.year;var d=(e>2)?a[2]:this.month;this.setCardNumber(c);this.setExpiryDate(b,d);if(!this.isCardNumber()){return false}if(!this.isExpiryDate()){return false}return true}function getCardType(){return this.cardtype}function getExpiryDate(){return this.month+"/"+this.year}function isCardNumber(){var b=isCardNumber.arguments;var d=isCardNumber.arguments.length;var c=(d>0)?b[0]:this.cardnumber;if(!this.luhnCheck()){return false}for(var f=0;f<this.len.size;f++){if(c.toString().length==this.len[f]){for(var a=0;a<this.rules.size;a++){var e=c.substring(0,this.rules[a].toString().length);if(e==this.rules[a]){return true}}return false}}return false}function isExpiryDate(){var a=isExpiryDate.arguments;var b=isExpiryDate.arguments.length;year=b>0?a[0]:this.year;month=b>1?a[1]:this.month;if(!isNum(year+"")){return false}if(!isNum(month+"")){return false}today=new Date();expiry=new Date(year,month);if(today.getTime()>expiry.getTime()){return false}else{return true}}function isNum(a){a=a.toString();if(a.length==0){return false}for(var b=0;b<a.length;b++){if(a.substring(b,b+1)<"0"||a.substring(b,b+1)>"9"){return false}}return true}function luhnCheck(){var a=luhnCheck.arguments;var g=luhnCheck.arguments.length;var c=g>0?a[0]:this.cardnumber;if(!isNum(c)){return false}var b=c.length;var d=b&1;var e=0;for(var f=0;f<b;f++){var h=parseInt(c.charAt(f));if(!((f&1)^d)){h*=2;if(h>9){h-=9}}e+=h}if(e%10==0){return true}else{return false}}function makeArray(a){this.size=a;return this}function setCardNumber(a){this.cardnumber=a;return this}function setCardType(a){this.cardtype=a;return this}function setExpiryDate(a,b){this.year=a;this.month=b;return this}function setLen(a){if(a.length==0||a==null){a="13,14,15,16,19"}var c=a;n=1;while(c.indexOf(",")!=-1){c=c.substring(c.indexOf(",")+1,c.length);n++}this.len=new makeArray(n);n=0;while(a.indexOf(",")!=-1){var b=a.substring(0,a.indexOf(","));this.len[n]=b;a=a.substring(a.indexOf(",")+1,a.length);n++}this.len[n]=a;return this}function setRules(c){if(c.length==0||c==null){c="0,1,2,3,4,5,6,7,8,9"}var b=c;n=1;while(b.indexOf(",")!=-1){b=b.substring(b.indexOf(",")+1,b.length);n++}this.rules=new makeArray(n);n=0;while(c.indexOf(",")!=-1){var a=c.substring(0,c.indexOf(","));this.rules[n]=a;c=c.substring(c.indexOf(",")+1,c.length);n++}this.rules[n]=c;return this}function contains(b,d){var c=b.length;while(c--){if(b[c]===d){return true}}return false}function getBaseCard(e,c){for(var d=0;d<(Cards.size-1);d++){for(var h=0;h<Cards[d].len.size;h++){if(e.toString().length<=Cards[d].len[h]){for(var a=0;a<Cards[d].rules.size;a++){var b=Cards[d].rules[a].toString().length;if(b>e.toString().length){b=e.toString().length}var g=e.substring(0,b);var f=Cards[d].rules[a].toString().substring(0,b);if(g===f){if(contains(c,Cards[d].cardtype)){return Cards[d]}if(contains(c,MasterCard.cardtype)){if(Cards[d].cardtype===MaestroCard.cardtype){return MasterCard}}}}}}}return null}function getBaseCardByType(b){for(var a=0;a<(Cards.size-1);a++){if(Cards[a].cardtype==b){return Cards[a]}}return null};

        var availableTypes = [];
        
        adyen.cardTypes = Cards;

        for ( var i = Cards.size; i-- > 0; ) {
            if (Cards[i] && Cards[i].cardtype) {
                availableTypes.push( Cards[ i ].cardtype );
            }
        }

        var determineCache = {};
        
        Cards.determine = function ( variant ) {
            
            if (!determineCache.hasOwnProperty(variant)) {
            
                var currentCardType = null, currentMatchSize = 0;
                
                for ( var i = Cards.size; i-- > 0; ) {
                    var card = Cards[i];
                    
                    if (!contains(availableTypes, card.cardtype)) {
                        continue;
                    }
                    
                    for (var c = 0; c < card.rules.size; c++) {
                        var len = Math.min(variant.length, card.rules[c].length);
                        
                        if (len <= 1 || variant.length < card.rules[c].length) {
                            // Minimum length included because of collissions on single number cardtypes
                            continue;
                        }
                        
                        if (variant.substring(0, len) === card.rules[c].substring(0, len)) {
                            if (len > currentMatchSize) {
                                currentCardType = card;
                                currentMatchSize = len;
                            }
                        }
                    }
                    
                    card.setCardNumber(null);
                }
                
                if (currentCardType === null) {
                    currentCardType = getBaseCard( variant, availableTypes );
                }
                
                determineCache[variant] = currentCardType;
            }
            return determineCache[variant];
        };

        return Cards;
    }() ), nameForType = {
        "mc" : "MasterCard",
        "visadankort" : "Visa Dankort",
        "visa" : "VISA",
        "amex" : "American Express",
        "vias" : "Adyen Card",
        "diners" : "Diners Club",
        "maestrouk" : "Maestro UK",
        "solo" : "Solo",
        "laser" : "Laser",
        "discover" : "Discover",
        "jcb" : "JCB",
        "bcmc" : "Bancontact/Mister Cash",
        "bijcard" : "de Bijenkorf Card",
        "dankort" : "Dankort",
        "hipercard" : "HiperCard",
        "maestro" : "Maestro",
        "elo" : "ELO",
        "uatp" : "UATP",
        "cup" : "China Union Pay",
        "cartebancaire" : "Carte Bancaire",
        "visaalphabankbonus" : "Alpha Bank Visa Bonus",
        "mcalphabankbonus" : "Alpha Bank Mastercard Bonus",
        "karenmillen" : "Karen Millen GiftCard",
        "oasis" : "Oasis GiftCard",
        "warehouse" : "Warehouse GiftCard",
        "argencard" : "Argen Card",
        "codensa" : "Codensa",
        "cabal" : "Cabal Card",
        "mir" : "MIR",
        "naranja" : "Naranja Card",
        "shopping" : "Shopping Card"
    };

    adyen.CardTypeDetection = {
        version : '0_1_21',
        getHandler : function ( cardTypeElement ) {
            return function ( ev ) {

                if ( ev.cardTypeDetermined ) {
                    return;
                }

                ev.cardTypeDetermined = true;

                var type = null, node = ev.target || ev.srcElement, val = ( node || {} ).value || '';

                val = val.replace( /\D/g, '' );

                if ( val.length > 2 ) {
                    type = cardTypes.determine( val );
                }
                
                var finalType = type && type.cardtype || 'unknown';

                if ( typeof cardTypeElement === "function" ) {
                    cardTypeElement( finalType, nameForType[ finalType ] );
                } else {
                    cardTypeElement.innerHTML = '<span class="cse-cardtype-label">' + ( nameForType[ finalType ] || finalType ) + '</span>';
                    cardTypeElement.className = ( cardTypeElement.className || '' ).replace( /(^|\s)cse-cardtype-\w+/ig, '' ).replace( /^\s+|\s+$/g, '' ) + ' cse-cardtype-' + finalType;
                }

            };
        }
    };

}() );