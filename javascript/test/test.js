$(document).ready(function() {
	var table = $("#idTableTest");

	var tds = $("#idTableTest td");

	alert(tds.length);

	for (var prop in tds[0]) {
		// alert("in");
		if (prop.indexOf("inner") > -1) {
			// alert(prop);
		}
	}
});