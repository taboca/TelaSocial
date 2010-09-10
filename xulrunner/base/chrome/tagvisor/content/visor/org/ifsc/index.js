
com.taboca.upvisor.registerWidget( null , "org/ifsc/layout-vertical/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "org/ifsc/calendar/calendar.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/clock/clock.js","clock", "area_topmid");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/twitter-pool/twitter.js","twitter", "area_panel1");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/fotogrid-vertical/fotogrid.js","fotos", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/twitter-postit/twitter.js","twitterslash", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/typing2/typing.js","typing", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






