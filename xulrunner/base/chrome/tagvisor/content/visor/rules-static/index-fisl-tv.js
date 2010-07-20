com.taboca.upvisor.registerWidget( null , "org/fisl/layout-tv/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "org/fisl/calendar/calendar-video.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/twitter-eventos-side/twitter.js","clock", "area_topright");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/twitter-eventos/twitter.js","twitterslash", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/typing2/typing.js","twitter", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "org/fisl/videoexample/example.js","video", "area_topleft");
com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } );




