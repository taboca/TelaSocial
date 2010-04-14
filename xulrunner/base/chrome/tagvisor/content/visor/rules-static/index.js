 
		
		com.taboca.upvisor.registerWidget( null , "com/icmc/gfxfullvideo/gfxless.js","container");
		com.taboca.upvisor.registerWidget( null , "com/taboca/calendar/calendar-id.js","calendar");

//                com.taboca.upvisor.registerWidget( ".container" , "com/icmc/videoexample/example-full.js","video", "area_background");
		com.taboca.upvisor.registerWidget( ".container" , "com/taboca/clock/clock.js","clock", "area_topright");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-eventos/twitter.js","twitter", "area_midleft");
                //com.taboca.upvisor.registerWidget( ".container" , "com/icmc/magna/grade.js","grade", "area_midleft2");
//                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/flickr/flickr.js","flickr", "area_midleft2");
               com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-g1/twitter.js","twitterg1", "area_midright");


		com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






