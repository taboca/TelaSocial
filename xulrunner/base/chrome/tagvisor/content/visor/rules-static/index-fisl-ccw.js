
com.taboca.upvisor.registerWidget( null , "org/fisl/layout-vertical/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "org/fisl/calendar/calendar-fisl.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/clock/clock.js","clock", "area_topright");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/fotogrid-vertical/fotogrid.js","fotos", "area_panel1");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/twitter-pool/twitter.js","twitter", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/twitter-postit/twitter.js","twitterslash", "area_panel3");
//com.taboca.upvisor.registerWidget( ".container" , "org/fisl/twitter-fisl/twitter.js","twitterslash", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/typing2/typing.js","typing", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






