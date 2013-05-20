pref("toolkit.defaultChromeURI", "chrome://telasocial/content/telasocial.xul");
pref("extensions.tagvisor.app","org/icmc/index-icmc-4.0.js");
pref("general.useragent.extra.telasocial", "TelaSocial CrowdBrowsing/0.1");
pref("extensions.tagvisor.auto",true);

// These are debug mode you can simulate any type of TV with the zoom out 
pref("extensions.tagvisor.zoom",".5");
pref("extensions.tagvisor.resolution","960,560");

pref("nglayout.debug.disable_xul_cache", true);
pref("nglayout.debug.disable_xul_fastload", true);
pref("layout.css.flexbox.enabled", true);


// use this to see debug in the console
pref("browser.dom.window.dump.enabled", true);

// for CCW mode we fixed ubuntu with pref("layout.css.dpi", 72);

// This is for XULRunner app to show inline error pages, 
// based in netError.xhtml for example, instead of alert boxes 
// http://kb.mozillazine.org/Browser.xul.error_pages.enabled 

pref("browser.xul.error_pages.enabled", true);
