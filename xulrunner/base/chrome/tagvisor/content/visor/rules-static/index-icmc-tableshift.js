	com.taboca.upvisor.registerWidget( null , "com/taboca/layout-tableshift/gfxless.js","container");
	com.taboca.upvisor.registerWidget( null , "com/taboca/calendar/calendar-tableshift.js","calendar");
	com.taboca.upvisor.registerWidget( ".container" , "com/taboca/clock/clock.js","clock", "area_panel1");
        com.taboca.upvisor.registerWidget( ".container" , "com/taboca/typing/typing.js","twitter", "area_top");
        com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-drumbeatsc/twitter.js","fotos", "area_panel3");
        //com.taboca.upvisor.registerWidget( ".container" , "com/taboca/fade/fade.js","fotos", "area_panel3");
	com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






