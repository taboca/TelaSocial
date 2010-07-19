com.taboca.upvisor.registerWidget( null , "org/fisl/layout-projector/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "org/fisl/calendar/calendar-projector.js","calendar");
//com.taboca.upvisor.registerWidget( ".container" , "org/fisl/twitter-eventos-side/twitter.js","clock", "area_bottomright");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/weather/weather.js","weather", "area_topmid");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/clock/clock.js","clock", "area_topleft");

com.taboca.upvisor.registerWidget( ".container" , "org/fisl/noticias-fisl/noticias.js","fislnews", "area_panel3");
//com.taboca.upvisor.registerWidget( ".container" , "org/fisl/typing2/typing.js","fislnews", "area_panel3");
//com.taboca.upvisor.registerWidget( ".container" , "org/fisl/fade/fade.js","flickr", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/fotogrid/fotogrid.js","flickr", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/twitter-fisl/twitter.js","twitter_fisl", "area_panel1");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } );




