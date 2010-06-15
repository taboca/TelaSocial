org.fisl.upvisor.registerWidget( null , "org/fisl/layout-vertical/gfxless.js","container");
org.fisl.upvisor.registerWidget( null , "org/fisl/calendar/calendar-fisl.js","calendar");
org.fisl.upvisor.registerWidget( ".container" , "com/taboca/clock/clock.js","clock", "area_bottomright");
org.fisl.upvisor.registerWidget( ".container" , "org/fisl/twitter-eventos/twitter.js","twitter", "area_panel2");
org.fisl.upvisor.registerWidget( ".container" , "org/fisl/twitter-postit/twitter.js","twitterslash", "area_panel3");
org.fisl.upvisor.registerWidget( ".container" , "org/fisl/typing/typing.js","uspmain", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






