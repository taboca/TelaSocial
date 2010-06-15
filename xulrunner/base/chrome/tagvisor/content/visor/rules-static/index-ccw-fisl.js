com.taboca.upvisor.registerWidget( null , "org/fisl/layout-vertical/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "org/fisl/calendar/calendar-fisl.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "com/taboca/clock/clock.js","clock", "area_bottomright");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/twitter-eventos/twitter.js","twitter", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/twitter-postit/twitter.js","twitterslash", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/typing/typing.js","uspmain", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






