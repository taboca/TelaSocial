 
		
		com.taboca.upvisor.registerWidget( null , "com/icmc/gfxfullvideo/gfxless.js","container");
		com.taboca.upvisor.registerWidget( null , "com/taboca/calendar/calendar-id.js","calendar");

		com.taboca.upvisor.registerWidget( ".container" , "com/taboca/clock/clock.js","clock", "area_topright");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-eventos/twitter.js","twitter", "area_midleft");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-g1/twitter.js","twitterg1", "area_midleft2");


		com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






