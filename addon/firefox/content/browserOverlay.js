/**
 * AchromaJS namespace.
 */

var AchromaJS = AchromaJS || {};

var count = 0;
var d = "";
var c = "";
var unknown = "-----";
function test()
{
}

AchromaJS.BrowserOverlay = {
	/**
	 * Says 'Hello' to the user.
	 */

	myListener : function(evt)
	{

		evt.target.setAttribute("attribute1", d);
		evt.target.setAttribute("attribute2", c);
		alert(d);

	},
	sayHello : function(aEvent)
	{
		let
		stringBundle = document.getElementById("achromajs-string-bundle");
		let
		message = stringBundle.getString("achromajs.greeting.label");
		netscape.security.PrivilegeManager
				.enablePrivilege('UniversalXPConnect');

		var listener = new test();
		var wifi_service = Components.classes["@mozilla.org/wifi/monitor;1"]
				.getService(Components.interfaces.nsIWifiMonitor);

		wifi_service.startWatching(listener);
		window.alert(message)
	}
};

document.addEventListener("MyExtensionEvent", function(e)
{
	AchromaJS.BrowserOverlay.sayHello(e), AchromaJS.BrowserOverlay
			.myListener(e);
}, false, true);
