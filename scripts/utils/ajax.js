var Ajax = {
    create: function() {
        if (window.ActiveXObject)
            return new ActiveXObject("Microsoft.XMLHTTP");

        return new XMLHttpRequest();
    },
    readFile: function(url) {
        var ajax = this.create();
  
        ajax.open('GET', url, true);
        ajax.send();
        ajax.onreadystatechange = function() {
            if (4 == ajax.readyState) {
                if(200 == ajax.status) {
                    console.info(ajax.responseText);
                }
            };
        }
    }
};
