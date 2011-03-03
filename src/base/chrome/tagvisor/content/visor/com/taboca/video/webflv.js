
 
var gWebflvWidth=320;
var gWebflvHeight=240;

var gWebflvSeekMax = gWebflvWidth-74; /* Video seeker width area */
var gWebflvSeekInit = 2;

var gMediaPlayerArray=new Array();

function webflv_mediaplayer_updateControls(referenceElement,timeInfo) {

    var currentPlayer = gMediaPlayerArray[referenceElement];
    
        var videoDuration = currentPlayer.videoDuration;

		var left = gWebflvSeekInit + parseInt((timeInfo/videoDuration)*gWebflvSeekMax);
		
		if(!left) { left = gWebflvSeekInit } ;
	
		currentPlayer.thumbSlider.style.left = left + "px";
       
}


function webflv_mediaplayer_toggle(videoId,itemId,playmode) {

    if(gMediaPlayerArray[itemId]) {
        webflv_mediaplayer_destroyPlayer(itemId);
    } else {
        webflv_mediaplayer_createPlayer(itemId,videoId,playmode);    
    }

}

function webflv_mediaplayer_playpause(itemId) {

    var currentPlayer = gMediaPlayerArray[itemId];
    
    if(currentPlayer.flashObject==null) {
        currentPlayer.flashObject = document.getElementById(currentPlayer.flashid);
    }

    if(currentPlayer.videoLoaded) {
            
           if(currentPlayer.playing==true) {
          
                currentPlayer.flashObject.SetVariable("vp_function_pauseresume","go");
                currentPlayer.playButton.className="videobutton-play";  
                currentPlayer.playing = false;
                
            } else {
            
                currentPlayer.playing = true;
                currentPlayer.playButton.className="videobutton-pause";      
                currentPlayer.flashObject.SetVariable("vp_function_pauseresume","go");
                
            }

     } else {
        currentPlayer.videoLoaded=true;
        currentPlayer.playing = true;
        currentPlayer.playButton.className="videobutton-pause";      

	    currentPlayer.flashObject.SetVariable("form_fileURL", currentPlayer.videoURL);
	    currentPlayer.flashObject.SetVariable("form_bufferTime",5);
	    currentPlayer.flashObject.SetVariable("vp_function_play","go");


     }
         
}


function webflv_mediaplayer_stop(itemId) {

    var currentPlayer = gMediaPlayerArray[itemId];
    if(currentPlayer.flashObject==null) {
        currentPlayer.flashObject = document.getElementById(currentPlayer.flashid);
    }

   if(currentPlayer.playing==true) {
        currentPlayer.flashObject.SetVariable("vp_function_pauseresume","go");
        currentPlayer.playButton.className="videobutton-play";  
        currentPlayer.playing = false;
        currentPlayer.flashObject.SetVariable("form_seekPosition",0);
        currentPlayer.flashObject.SetVariable("vp_function_seek","go");
        
    } else {
        currentPlayer.flashObject.SetVariable("form_seekPosition",0);
        currentPlayer.flashObject.SetVariable("vp_function_seek","go");
    }
    webflv_mediaplayer_updateControls(itemId,0);
}

function webflv_mediaplayer_createPlayer(itemId,videoId,playMode) {
      
        var width = gWebflvWidth;
        var height = gWebflvHeight;   
        
        gWebflvSeekMax = gWebflvWidth-74; /* Video seeker width area */
        gWebflvSeekInit = 2;

 	    var strVideoEmbed = ' <div id="mediaplayer-'+itemId+'" style="text-align:center;" class="videoPlayer"> <object align="middle" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="videoplayerobject-'+itemId+'" width="'+width+'" height="'+height+'"><param value="webflv.swf?autoplay'+playMode+'&fileName='+videoId+'&refId='+itemId+'" name="movie"><param value="high" name="quality"><param value="true" name="swLiveConnect"><param value="#000000" name="bgcolor"> <embed pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowScriptAccess="sameDomain" align="middle" bgcolor="#000000" swLiveConnect="true" quality="high" src="webflv.swf?autoplay='+playMode+'&fileName='+videoId+'&refId='+itemId+'" mayscript="true" id="videoplayerembed-'+itemId+'" width="'+width+'" height="'+height+'"></embed> </object> </div>' ;
	    var el = document.getElementById(itemId);
	 
	    el.style.display="block";
	    el.innerHTML = strVideoEmbed;


        var flashid="videoplayerembed-"+itemId;

	    if(document.all) { 
			    flashid="videoplayerobject-"+itemId;
	    } 
	    
	    /* 
	     * We create the flash video object 
	     */
	     
	    gMediaPlayerArray[itemId] = { 
	    
	        flashid:flashid,
	        itemId:itemId,
	        flashObject:null,
	        expandDiv:el,
	        playing:false,
	        playButton:null,
	        videoDuration:null,
	        videoURL:videoId,
	        thumbSlider:null,
	        videoLoaded:null
	    };
    
        var playerElement = document.createElement("div");
        playerElement.setAttribute("style","position:relative;width:314px;height:24px;display:none");
        
        var playButton = document.createElement("a");
        if(playMode == "true") {
            playButton.setAttribute("class","videobutton-pause");
            gMediaPlayerArray[itemId].videoLoaded=true;
        } else {
            playButton.setAttribute("class","videobutton-play");        
        }
        playButton.setAttribute("href","javascript:");
        playButton.setAttribute("style","position:absolute;top:2px;left:2px;width:22px;height:22px;");
        playButton.setAttribute("onclick","webflv_mediaplayer_playpause('"+itemId+"');return false");   

        playerElement.appendChild(playButton);

        gMediaPlayerArray[itemId].playButton = playButton; 
        
        var rewindInit = document.createElement("a");
        rewindInit.setAttribute("class","videobutton-stop");
        rewindInit.setAttribute("href","javascript:");
        rewindInit.setAttribute("style","position:absolute;top:2px;left:26px;width:22px;height:22px;");     
        rewindInit.setAttribute("onclick","webflv_mediaplayer_stop('"+itemId+"');return false");   
        playerElement.appendChild(rewindInit);

        var sliderElement = document.createElement("div");
        sliderElement.setAttribute("style","position:absolute;border:1px solid gray;top:4px;left:52px;background-color:black;width:267px;height:18px;");
        playerElement.appendChild(sliderElement);
       
        var dragElement = document.createElement("div");
        dragElement.setAttribute("class","videobutton-thumb");
        dragElement.setAttribute("style","position:absolute;width:18px;height:16px;");
        sliderElement.appendChild(dragElement);
  
        gMediaPlayerArray[itemId].thumbSlider = dragElement;
        
        document.getElementById("mediaplayer-"+itemId).appendChild(playerElement);        

        gMediaPlayerArray[itemId].playing = true;
           
        webflv_mediaplayer_kickDuration();   
           
}

function webflv_mediaplayer_kickDuration() {

    for(var key in gMediaPlayerArray) {
    
        var currentPlayer = gMediaPlayerArray[key];
        try { 
            if(currentPlayer.playing) { 
                if(currentPlayer.flashObject==null) {
                    currentPlayer.flashObject = document.getElementById(currentPlayer.flashid);
                }     
                currentPlayer.flashObject.SetVariable("vp_function_checktime","go");
            }
        } catch (i) {
            /* nothing yet */
 
        }
    
    }

    setTimeout("webflv_mediaplayer_kickDuration()",1500);
    
}

function webflv_mediaplayer_destroyPlayer(itemId) {

    var currentPlayer = gMediaPlayerArray[itemId];
    
    currentPlayer.expandDiv.innerHTML="";
	currentPlayer.expandDiv.style.display="none";
	

	gMediaPlayerArray[itemId]=null;

}

function webflv_DoFSCommand(command, args) {

    if(command=="flashready") {
   
        
    }

    if(command=="filename") {
    
        
        
    }
	if(command=="timeevent") {

        var argsArray = args.split("::");
        
        var timeInfo = parseFloat(argsArray[0]);
        var referenceElement = argsArray[1];
        
        webflv_mediaplayer_updateControls(referenceElement,timeInfo);

	}

	if(command=="bufferlength") {


	}


	if(command=="onmetadata") { 

              var metaString = args.split("::");
              var referenceId = metaString[0];
              var objectString = metaString[1];

              if(objectString == "duration") {

                      var durationTime = metaString[2];

                      /* Global for current max duration time for the current video */ 
                      
                      var video_timemax = parseFloat(durationTime);
                      
                      gMediaPlayerArray[referenceId].videoDuration=video_timemax; 
                      
              }


	} 
}
