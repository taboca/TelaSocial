 

		
		//com.taboca.upvisor.registerWidget( null , "com/tests/basic.js","container");
		//com.taboca.upvisor.registerWidget( null , "com/icmc/gfxless/gfxless.js","container");
		com.taboca.upvisor.registerWidget( null , "com/icmc/gfxdaylong/gfxless.js","container");
		com.taboca.upvisor.registerWidget( null , "com/taboca/calendar/calendar-rock.js","calendar");
		com.taboca.upvisor.registerWidget( ".container" , "com/taboca/clock/clock.js","clock");
                com.taboca.upvisor.registerWidget( ".container" , "com/taboca/canvas/rock.js","rock");
                com.taboca.upvisor.registerWidget( ".container" , "com/icmc/randombg/bg.js","randombg");


		com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






