/**
 * XULSchoolChrome namespace.
 */
if ("undefined" == typeof (XULSchoolChrome))
{
	var XULSchoolChrome = {};
};

/**
 * Controls the browser overlay for the Hello World extension.
 */
var count = 0;
var d = "";
var c = "";
var unknown = "-----";
function test()
{
}

test.prototype = {
	onChange : function(accessPoints)
	{
		netscape.security.PrivilegeManager
				.enablePrivilege('UniversalXPConnect');
		let
		mac = "";
		let
		ssid = "";
		let
		signal = "";
		d = "[";
		for (var i = 0; i < accessPoints.length; i++)
		{
			var a = accessPoints[i];
			if (i > 0) d += ";";
			mac = a.mac;
			ssid = a.ssid;
			signal = a.signal;

			if (a.mac == "") mac = unknown;
			if (a.ssid == "") ssid = unknown;
			if (a.signal == "") signal = unknown;

			d += "( " + mac + "::" + ssid + "::" + signal + ")";
		}
		d += "]";
		c = count++;
		// window.alert(d+c);

	},

	onError : function(value)
	{
		alert("error: " + value);
	},

	QueryInterface : function(iid)
	{
		netscape.security.PrivilegeManager
				.enablePrivilege('UniversalXPConnect');
		if (iid.equals(Components.interfaces.nsIWifiListener)
				|| iid.equals(Components.interfaces.nsISupports)) return this;
		throw Components.results.NS_ERROR_NO_INTERFACE;
	},
}

XULSchoolChrome.BrowserOverlay = {
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
		stringBundle = document.getElementById("xulschoolhello-string-bundle");
		let
		message = stringBundle.getString("xulschoolhello.greeting.label");
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
	XULSchoolChrome.BrowserOverlay.sayHello(e), XULSchoolChrome.BrowserOverlay
			.myListener(e);
}, false, true);
