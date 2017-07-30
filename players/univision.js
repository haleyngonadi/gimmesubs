



chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "hideimages":
			var imgs = document.querySelectorAll("img");
			if(imgs.length === 0) {
				alert("There are no any imgs in the page.");
			} else {
				for(var i=0; i<imgs.length; i++) {
					imgs[i].style.display = 'none';
				}
			}
		break;
		case "getduration":
			var video = document.querySelectorAll("video");
			var outsideVideo = document.querySelectorAll(".html5-video-player");
			if(video.length === 0) {
				alert("There are no video in the page.");
			} else {
				for(var i=0; i<video.length; i++) {


					for(var m=0; m<outsideVideo.length; m++) {

					var subTag = this.document.createElement("div");


					 var num = parseFloat(video[i].offsetWidth);
					 var val = num - (num * .15);


        	subTag.style.maxWidth =  val+"px";
			subTag.style.fontWeight = '400';


        	chrome.storage.sync.get("currently.captions", function(result) {
        		var keys = result[Object.keys(result)[0]]
			            	subTag.style.color = keys.textColor;
			            	subTag.style.fontFamily = keys.textFont;

			            	if (document.getElementById('passage-text')) {
			            	document.getElementById('passage-text').style.fontSize = keys.textSize+"px";

			            	var getBackground = hexToRgbA(keys.backgroundColor);
			            	document.getElementById('passage-text').style.background =getBackground;
							document.getElementById('passage-text').style.boxShadow = '-20px 0 0 '+ getBackground +', 20px 0 0 '+ getBackground;

						}
			});


        	subTag.style.position = "absolute";
        	subTag.style.bottom = "50px"
        	subTag.style.left = "50%";
        	subTag.style.transform = "translateX(-50%)";
        	subTag.id = "nextractor";

        	

        	subTag.innerHTML = '<p class="subs" id="passage-text"><sup class="verse-start">1</sup><span data-dur="0.154" data-begin="0.775">In the first verse</span> <span data-dur="0.28" data-begin="0.929">those</span> <span data-dur="0.29" data-begin="1.218">days</span> <span data-dur="0.131" data-begin="1.508">a</span> <span data-dur="0.525" data-begin="1.639">decree</span> <span data-dur="0.191" data-begin="2.165">went</span> <span data-dur="0.225" data-begin="2.355">out</span> <span data-dur="0.245" data-begin="2.583">from</span> <span data-dur="0.438" data-begin="2.828">Caesar</span> <span data-dur="0.637" data-begin="3.267">Augustus</span> <span data-dur="0.166" data-begin="4.03">that</span> <span data-dur="0.268" data-begin="4.216">all</span> <span data-dur="0.111" data-begin="4.486">the</span> <span data-dur="0.411" data-begin="4.594">world</span> <span data-dur="0.205" data-begin="5.006">should</span> <span data-dur="0.134" data-begin="5.211">be</span> <span data-dur="0.529" data-begin="5.344">registered</span> <sup class="verse-start">2</sup><span data-dur="0.201" data-begin="6.675">This</span> <span data-dur="0.124" data-begin="6.876">was</span> <span data-dur="0.11" data-begin="7">the</span> <span data-dur="0.321" data-begin="7.11">first</span> <span data-dur="0.762" data-begin="7.431">registration</span> <span data-dur="0.164" data-begin="8.193">when</span> <span data-dur="0.474" data-begin="8.357">Quirinius</span> <span data-dur="0.206" data-begin="8.834">was</span> <span data-dur="0.338" data-begin="9.041">governor</span> <span data-dur="0.082" data-begin="9.379">of</span> <span data-dur="0.477" data-begin="9.46">Syria</span> <sup class="verse-start">3</sup><span data-dur="0.119" data-begin="10.676">And</span> <span data-dur="0.24" data-begin="10.794">all</span> <span data-dur="0.186" data-begin="11.034">went</span> <span data-dur="0.087" data-begin="11.22">to</span> <span data-dur="0.139" data-begin="11.307">be</span> <span data-dur="0.592" data-begin="11.446">registered</span> <span data-dur="0.251" data-begin="12.284">each</span> <span data-dur="0.093" data-begin="12.572">to</span> <span data-dur="0.134" data-begin="12.665">his</span> <span data-dur="0.275" data-begin="12.799">own</span> <span data-dur="0.467" data-begin="13.074">town</span> <sup class="verse-start">4</sup><span data-dur="0.184" data-begin="14.369">And</span> <span data-dur="0.358" data-begin="14.553">Joseph</span> <span data-dur="0.351" data-begin="14.911">also</span> <span data-dur="0.128" data-begin="15.262">went</span> <span data-dur="0.152" data-begin="15.39">up</span> <span data-dur="0.215" data-begin="15.595">from</span> <span data-dur="0.541" data-begin="15.811">Galilee</span> <span data-dur="0.074" data-begin="16.557">from</span> <span data-dur="0.121" data-begin="16.632">the</span> <span data-dur="0.236" data-begin="16.752">town</span> <span data-dur="0.097" data-begin="16.988">of</span> <span data-dur="0.559" data-begin="17.085">Nazareth</span> <span data-dur="0.154" data-begin="17.966">to</span> <span data-dur="0.575" data-begin="18.12">Judea</span> <span data-dur="0.129" data-begin="18.823">to</span> <span data-dur="0.059" data-begin="18.952">the</span> <span data-dur="0.31" data-begin="19.011">city</span> <span data-dur="0.166" data-begin="19.321">of</span> <span data-dur="0.393" data-begin="19.487">David</span> <span data-dur="0.161" data-begin="20.029">which</span> <span data-dur="0.109" data-begin="20.19">is</span> <span data-dur="0.307" data-begin="20.321">called</span> <span data-dur="0.642" data-begin="20.628">Bethlehem</span> <span data-dur="0.317" data-begin="21.76">because</span> <span data-dur="0.116" data-begin="22.077">he</span> <span data-dur="0.104" data-begin="22.193">was</span> <span data-dur="0.166" data-begin="22.297">of</span> <span data-dur="0.059" data-begin="22.463">the</span> <span data-dur="0.412" data-begin="22.522">house</span> <span data-dur="0.155" data-begin="22.935">and</span> <span data-dur="0.384" data-begin="23.09">lineage</span> <span data-dur="0.175" data-begin="23.474">of</span> <span data-dur="0.421" data-begin="23.648">David</span> <sup class="verse-start">5</sup><span data-dur="0.127" data-begin="24.714">to</span> <span data-dur="0.172" data-begin="24.84">be</span> <span data-dur="0.53" data-begin="25.013">registered</span> <span data-dur="0.125" data-begin="25.543">with</span> <span data-dur="0.515" data-begin="25.668">Mary</span> <span data-dur="0.172" data-begin="26.183">his</span> <span data-dur="0.607" data-begin="26.355">betrothed</span> <span data-dur="0.123" data-begin="27.134">who</span> <span data-dur="0.166" data-begin="27.257">was</span> <span data-dur="0.167" data-begin="27.423">with</span> <span data-dur="0.513" data-begin="27.59">child</span> <sup class="verse-start">6</sup><span data-dur="0.161" data-begin="29.448">And</span> <span data-dur="0.362" data-begin="29.609">while</span> <span data-dur="0.159" data-begin="29.97">they</span> <span data-dur="0.166" data-begin="30.129">were</span> <span data-dur="0.436" data-begin="30.295">there</span> <span data-dur="0.159" data-begin="31.072">the</span> <span data-dur="0.431" data-begin="31.231">time</span> <span data-dur="0.277" data-begin="31.662">came</span> <span data-dur="0.161" data-begin="31.939">for</span> <span data-dur="0.093" data-begin="32.1">her</span> <span data-dur="0.107" data-begin="32.193">to</span> <span data-dur="0.233" data-begin="32.299">give</span> <span data-dur="0.352" data-begin="32.522">birth</span> <sup class="verse-start">7</sup><span data-dur="0.133" data-begin="33.972">And</span> <span data-dur="0.213" data-begin="34.105">she</span> <span data-dur="0.277" data-begin="34.318">gave</span> <span data-dur="0.253" data-begin="34.596">birth</span> <span data-dur="0.069" data-begin="34.888">to</span> <span data-dur="0.171" data-begin="34.957">her</span> <span data-dur="0.602" data-begin="35.128">firstborn</span> <span data-dur="0.56" data-begin="35.73">son</span> <span data-dur="0.166" data-begin="36.491">and</span> <span data-dur="0.342" data-begin="36.657">wrapped</span> <span data-dur="0.153" data-begin="36.998">him</span> <span data-dur="0.119" data-begin="37.152">in</span> <span data-dur="0.55" data-begin="37.271">swaddling</span> <span data-dur="0.542" data-begin="37.82">cloths</span> <span data-dur="0.154" data-begin="38.644">and</span> <span data-dur="0.287" data-begin="38.798">laid</span> <span data-dur="0.176" data-begin="39.085">him</span> <span data-dur="0.087" data-begin="39.261">in</span> <span data-dur="0.092" data-begin="39.348">a</span> <span data-dur="0.604" data-begin="39.44">manger</span> <span data-dur="0.277" data-begin="40.182">because</span> <span data-dur="0.131" data-begin="40.46">there</span> <span data-dur="0.151" data-begin="40.591">was</span> <span data-dur="0.213" data-begin="40.742">no</span> <span data-dur="0.312" data-begin="40.975">place</span> <span data-dur="0.121" data-begin="41.287">for</span> <span data-dur="0.158" data-begin="41.408">them</span> <span data-dur="0.116" data-begin="41.566">in</span> <span data-dur="0.111" data-begin="41.683">the</span> <span data-dur="0.406" data-begin="41.794">inn</span></p>';


        	if(document.getElementById("nextractor")){
    //alert("Element exists");
} else {
   outsideVideo[m].appendChild(subTag);
		
		try {
        var args = {
            text_element: document.getElementById('passage-text'),
            audio_element: video[i],
        };


        ReadAlong.init(args);

    }

    catch (err) {
        console.error(err);
    }

    document.body.classList.add('gs-initialized');
}


	


			}	

		}
			}


		break;

		case "geoblocked":
			var h2s = document.querySelectorAll(".geogate");
			if(h2s.length === 0) {
				alert("There are no any imgs in the page.");
			} else {
				for(var i=0; i<h2s.length; i++) {
					



					 var subTag = this.document.createElement("div");
					var subText = this.document.createElement("span");


					 var num = parseFloat(h2s[i].offsetWidth);
					 var val = num - (num * .25);


        	subTag.style.maxWidth =  val+"px";
			subTag.style.fontWeight = '400';
			subTag.style.lineHeight = '1.8em';
			subTag.style.display = 'inline';


        	chrome.storage.sync.get("currently.captions", function(result) {

        		var keys = result[Object.keys(result)[0]]
        		console.log(keys);

			            	subTag.style.color = keys.textColor;
			            	subTag.style.fontFamily = keys.textFont;
			            	subText.style.fontSize = keys.textSize+"px";

			            	var getBackground = hexToRgbA(keys.backgroundColor);
			            	subText.style.background =getBackground;
							subText.style.boxShadow = '-20px 0 0 '+ getBackground +', 20px 0 0 '+ getBackground;





			});


        	subTag.style.position = "absolute";
        	subTag.style.bottom = "20px"
        	subTag.style.left = "50%";
        	subTag.style.transform = "translateX(-50%)";





        			subText.style.background = 'rgb(40, 146, 215)';
				    subText.style.display = 'inline';
				   	subText.style.whiteSpace = 'pre-line';
				   	subText.style.position = 'relative';
				    subText.style.padding = '8px 0';
				  	subText.style.lineHeight = '47px';




        	    subText.innerHTML = chrome.i18n.getMessage("geoBlocked");
			subTag.appendChild(subText);



			h2s[i].appendChild(subTag);


				}
			}
		break;
	}
});

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.8)';
    }
    throw new Error('Bad Hex');
}






// var PlayerManager;
// (function () {
//     "use strict";


// PlayerManager = function (document) {
//         this.document = document;
//     };


//     		   PlayerManager.prototype.isVideoUnavailable = function () {
//         var divPlayerUnavailable = this.document.getElementsByClassName("geogate-body");


//         return divPlayerUnavailable !== undefined;
//     };

//     PlayerManager.prototype.hideElement = function (element) {
//         if (element) {
//             element.style.display = "none";
//         }
//     };


//         PlayerManager.prototype.showFailureMessage = function () {



// 		var element = document.querySelector(".gehjkyjkhkhogate");
        
//         var submainMessage = this.document.getElementsByClassName("gehjkyjkhkhogate-body");

// if(element){
//     alert("Element exists");
// } else {
//     alert("Element does not exist");
// }

//       //  console.log(chrome.i18n.getMessage("videoUnavailable"));

         

//             var subTag = this.document.createElement("div");
//         	subTag.style.width = "100%";
//         	subTag.style.height = "200px";
//         	subTag.style.background = "aqua";







//         	//videoTag.appendChild(subTag);

//         	//this.videoTag.parentNode.appendChild(subTag);




        
//     };



//     }());



// var YoutubeUnblocker;
// (function () {
//     "use strict";

//     YoutubeUnblocker = function (document, url) {
//         this.pageManager = new PlayerManager(document);
//     };

//     YoutubeUnblocker.prototype.execute = function () {
//         var url = window.location.toString();

//             if (this.pageManager.isVideoUnavailable(document)) {

//                 this.pageManager.showFailureMessage();


                
//             }

            
        
//     };
// }());


// window.addEventListener('load', function (e) {





// //new YoutubeUnblocker(document, window.location.toString()).execute();


// }, false);

