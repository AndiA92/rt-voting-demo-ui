$(document).ready(function () {
    $.get(_config.api.invokeUrl, function (data, status) {
        drawChart(JSON.parse(data));
        var webSocket = new WebSocket(_config.api.wsUrl);
        webSocket.onmessage = function (msg) {
            drawChart(JSON.parse(msg.data));
        };
        webSocket.onclose = function () {
            alert("WebSocket connection closed")
        };

    });
});

function drawChart(json) {
    var pieElements = document.getElementsByTagName("svg");
    if (pieElements.length == 0) {
        drawChart.pie = new d3pie("pie", {
    	    header: {
    		    title: {
    			    text: "Results"
    		    }
    	    },
    	    effects: {
            	load: {
            		effect: "none"
            	}
            },
    	    data: json
        });
    } else {
        drawChart.pie.updateProp("data.content", json.content);
    }
}