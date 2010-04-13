 

		
		//com.taboca.upvisor.registerWidget( null , "com/tests/basic.js","container");
		//com.taboca.upvisor.registerWidget( null , "com/icmc/gfxless/gfxless.js","container");
		com.taboca.upvisor.registerWidget( null , "com/icmc/gfxdaylong/gfxless.js","container");
		com.taboca.upvisor.registerWidget( null , "com/taboca/calendar/calendar.js","calendar");
		com.taboca.upvisor.registerWidget( ".container" , "com/taboca/clock/clock.js","clock");
                com.taboca.upvisor.registerWidget( ".container" , "com/icmc/calouros/grade.js","grade");
                //com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter/twitter.js","twitter");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-bixos/twitter.js","twitter");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/ticker/ticker.js","ticker");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-slash/twitter.js","twitterslash");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-bmacc/twitter.js","twitterbmacc");


		com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






