com.taboca.upvisor.registerWidget( null , "com/fisl/3pane-tv/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "com/taboca/calendar/calendar-icmc-3pane.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-eventos-side/twitter.js","clock", "area_bottomright");
com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-bloco1/twitter.js","twitterslash", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "com/taboca/typing/typing.js","twitter", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "com/taboca/videoexample/example.js","uspmain", "area_bottom");
com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } );




