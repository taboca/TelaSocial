		com.taboca.upvisor.registerWidget( null , "com/icmc/gfxless/gfxless-shift.js","container");
		com.taboca.upvisor.registerWidget( null , "com/taboca/calendar/calendar-shift.js","calendar");
		com.taboca.upvisor.registerWidget( ".container" , "com/taboca/clock/clock.js","clock", "area_topright");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-eventos/twitter.js","twitter", "area_midleft");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-uspmain/twitter.js","twitterslash", "area_midright");
		com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






