$(window).resize(function() {
	$('.container-geral').height($(window).height());
}).resize();

//RK4
var method_rkf = function(t, h) {
	var graph = new Array();
	var bloco = new Array();
	var entra = new Array();
	var sai = new Array();
	$(".bloco").each(function() {
		if ($(this).find('input').val()) {
			bloco.push({id: $(this).attr('id'), val: Number($(this).find('input').val())});
		}
	});
	for(var i=0; i<bloco.length; i++) {
		graph[i] = new Array();
		//Entra
		var temp = jsPlumb.getConnections({target: bloco[i].id});
		for(var j=0; j<temp.length; j++) {
			var val = $(temp[j].getOverlay("label").getLabel());
			val = $(val).attr('id');
			val = Number($('#'+ val).val());
			if (val) {
				entra.push({id: bloco[i].id, id_val: bloco[i].val, val: val});
			}
		}
		//Sai
		var temp = jsPlumb.getConnections({source: bloco[i].id});
		for(var j=0; j<temp.length; j++) {
			var val = $(temp[j].getOverlay("label").getLabel());
			val = $(val).attr('id');
			val = Number($('#'+ val).val());
			if (val) {
				sai.push({id: bloco[i].id, id_val: bloco[i].val, val: val});
			}
		}
	}
	var t_temp = t;
	var periodo = $('#periodo').val();
	while(t_temp <= periodo) {
		for(var i=0; i<bloco.length; i++) {
			var id = bloco[i].id;
			var val = bloco[i].val;
			var rk1 = h * kUm(val, id, entra, sai);
			var rk2 = h * kDois(val, id, entra, sai, rk1);
			var rk3 = h * kTres(val, id, entra, sai, rk2);
			var rk4 = h * kQuatro(val, id, entra, sai, rk3);
			graph[i].push({x: t_temp, y: val});
			bloco[i].val = val*1 + (rk1*1 + 2 * rk2 + 2 * rk3 + rk4*1) / 6;
			for(var j=0; j<entra.length; j++) {
				if(entra[j].id == id) {
					entra[j].id_val = bloco[i].val;
				}
			}
			for(var j=0; j<sai.length; j++) {
				if(sai[j].id == id) {
					sai[j].id_val = bloco[i].val;
				}
			}
			graph[i].label = id;
		}
		t_temp = h + t_temp;
	}
	function kUm(val, id, entra, sai) {
		var result = 0.0;
		for(var i=0; i<entra.length; i++) {
			if(entra[i].id == id) {
				result += entra[i].val * entra[i].id_val;
			}
		}
		for(var i=0; i<sai.length; i++) {
			if(sai[i].id == id) {
				result -= sai[i].val * val;
			}
		}
		return result;
	}
	function kDois(val, id, entra, sai, rk1) {
		var result = 0.0;
		for(var i=0; i<entra.length; i++) {
			if(entra[i].id == id) {
				result += entra[i].val * (entra[i].id_val + rk1);
			}
		}
		for(var i=0; i<sai.length; i++) {
			if(sai[i].id == id) {
				result -= sai[i].val * (val + rk1);
			}
		}
		return result;
	}
	function kTres(val, id, entra, sai, rk2) {
		var result = 0.0;
		for(var i=0; i<entra.length; i++) {
			if(entra[i].id == id) {
				result += entra[i].val * (entra[i].id_val + rk2);
			}
		}
		for(var i=0; i<sai.length; i++) {
			if(sai[i].id == id) {
				result -= sai[i].val * (val + rk2);
			}
		}
		return result;
	}
	function kQuatro(val, id, entra, sai, rk3) {
		var result = 0.0;
		for(var i=0; i<entra.length; i++) {
			if(entra[i].id == id) {
				result += entra[i].val * (entra[i].id_val + rk3);
			}
		}
		for(var i=0; i<sai.length; i++) {
			if(sai[i].id == id) {
				result -= sai[i].val * (val + rk3);
			}
		}
		return result;
	}
	return graph;
}

//CanvasJS
var dps = new Array();
var chart = new CanvasJS.Chart("grafico-container", {
	data: [
		{
			type: "line",
			dataPoints: dps
		}
	]
});
window.onload = function () {
	chart.render();
}

function atualizaGrafico() {
	var t = Number($('#t').val());
	var h = Number($('#h').val());
	var method = $('#metodo option:selected').val();
	if(method == 1) {
		dps = method_rkf(t, h);
	} else if(method == 2) {
		alert('Em desenvolvimento');
		//dps = method_rk4(t, h);
	};
	var graph = new Array();
	for(var i=0; i<dps.length; i++) {
		var soma = 0;
		for(var j=0; j<dps[i].length; j++) {
			soma += dps[i][j].y;
		}
		graph.push({type: "line", name: dps[i].label, label: soma, showInLegend: true, legendText: dps[i].label, dataPoints: dps[i]})
	};
	$('#grafico-container').html('');
	var chart = new CanvasJS.Chart("grafico-container", {
		/*zoomEnabled: true,
		panEnabled: true,*/
		legend: {
			fontSize: 13,
			fontFamily: "Arial",
			horizontalAlign: "right",
			verticalAlign: "bottom"
		},
		/*axisY: {
			interlacedColor: "#F0F8FF" ,
			gridThickness: 0
		},*/
		toolTip: {
			shared: true,
			content: function(e){
				var str = "<strong class='text-info'>Passo: " + e.entries[0].dataPoint.x.toFixed(2) + "</strong><br />";
				var soma_bloco = 0;
				for (var i = 0; i < e.entries.length; i++){
					//var  temp = e.entries[i].dataSeries.name + ": <strong>" +  e.entries[i].dataPoint.y + "</strong> - Soma: " + e.entries[i].dataSeries.label + "<br />";
					var  temp = e.entries[i].dataSeries.name + ": <strong>" +  e.entries[i].dataPoint.y + "</strong><br />";
					str = str.concat(temp);
					soma_bloco += e.entries[i].dataPoint.y;
				}
				str = str.concat("<span class='text-mute'>Soma: <strong>" + soma_bloco + "</strong></span>");
				return (str);
			}
		},
		data: graph
	});
	chart.render();
	
	/* Criar tabela no HTML */
	var tabela = '<tr>';
	tabela += "<th width='150'>Passo</th>";
	for(var i=0; i<dps.length; i++) {
		tabela += '<th>' + dps[i].label + '</th>';
	};
	tabela += '</tr>';
	for(var i=0; i<dps[0].length; i++) {
		tabela += '<tr>';
		tabela += '<td>' + dps[0][i].x + '</td>';
		for(var j=0; j<dps.length; j++) {
			tabela += '<td>' + dps[j][i].y + '</td>';
		};
		tabela += '</tr>';
	};
	$('#result').html(tabela);

}

//PLUMB
// Gerador de cores aleatorias
var curColourIndex = 1, maxColourIndex = 24, nextColour = function() {
	var R,G,B;
	R = parseInt(128+Math.sin((curColourIndex*3+0)*1.3)*128);
	G = parseInt(128+Math.sin((curColourIndex*3+1)*1.3)*128);
	B = parseInt(128+Math.sin((curColourIndex*3+2)*1.3)*128);
	curColourIndex = curColourIndex + 1;
	if (curColourIndex > maxColourIndex) curColourIndex = 1;
	return "rgb(" + R + "," + G + "," + B + ")";
 };

//Configuracoes dos blocos
var sourceOptions = {
	filter:".ep",
	anchor:"Continuous",
	connector: "Bezier",
	connectorStyle:{ strokeStyle: "#000", lineWidth:2 },
	maxConnections: -1,
	onMaxConnections:function(info, e) {
		alert("Maximum connections (" + info.maxConnections + ") reached");
	}
}
var targetOptions = {
	dropOptions: {hoverClass: "dragHover"},
	anchor: "Continuous"
}
 
//Funcao do botao para adicionar outro bloco
var qtd_bloco = 4
$(".btn-add-bloco").click(function() {
	var Div = $("#bloco-modelo").clone();
	$(Div).html($(Div).html().replace('TITLE', 'x' + qtd_bloco));
	$(Div).addClass('bloco ' + qtd_bloco).attr("id", "x" + qtd_bloco).attr("data-ref", qtd_bloco).prependTo("#container-blocos");
	jsPlumb.makeSource($(Div), sourceOptions);
	jsPlumb.makeTarget($(Div), targetOptions);
	jsPlumb.draggable($(Div), { handle: ".drag", stack: "div", opacity: 0.8});
	var tLeft = Math.floor(Math.random()*800),
		tTop  = Math.floor(Math.random()*600);
	jsPlumb.animate($(Div), { "left": tLeft, "top": tTop }, { duration: "slow" });
	jsPlumb.repaintEverything();
	qtd_bloco += 1;
});

//Funcao para apagar um bloco
$(document).on('click', '.bloco .close', function() {
	jsPlumb.detachAllConnections($(this).parent());
	$(this).parent().remove();
	jsPlumb.repaintEverything();
});

jsPlumb.ready(function() {
	jsPlumb.draggable($(".bloco"), { handle: ".drag", opacity: 0.8});
	jsPlumb.importDefaults({
		Container: $("#container-blocos"),
		Endpoint: ["Dot", {radius:2}],
		HoverPaintStyle: {strokeStyle: "#42a62c", lineWidth: 2},
		ConnectionOverlays: [
			["PlainArrow", {location: 1, id: "arrow", length: 10, width: 15}],
			["Label", {label: "Ligação", id: "label"}]
		]
	});
	$(".bloco").each(function(i,e) {			
		jsPlumb.makeSource($(e), sourceOptions);
	});
	jsPlumb.makeTarget($(".bloco"), targetOptions);
	jsPlumb.bind("connection", function(info) {
		info.connection.setPaintStyle({strokeStyle:nextColour()});
		info.connection.getOverlay("label").setLabel("<input type='text' placeholder='Taxa x" + $(info.connection.source).attr('data-ref') + "x" + $(info.connection.target).attr('data-ref') + "' class='form-control input-sm' id='k" + $(info.connection.source).attr('data-ref') + $(info.connection.target).attr('data-ref') + "' />");
	});
	jsPlumb.bind("click", function(c) { 
		//jsPlumb.detach(c); 
	});
	jsPlumb.bind("jsPlumbConnection", function(connectionInfo) {
	  //...update your data model here.  The contents of the 'connectionInfo' are described below.
	  //http://jsplumb.tumblr.com/
	  //jsPlumb.repaintEverything();
	  //function random_width() {
	  //return Math.floor(Math.random() * (900 - 200) + 200);
	});
	jsPlumb.bind("jsPlumbConnectionDetached", function(connectionInfo) {
	   //...update your data model here.  The contents of the 'connectionInfo' are described below.
	});
	$('.bloco').each(function(i,el){
		var tLeft = Math.floor(Math.random()*800),
			tTop  = Math.floor(Math.random()*600);
		jsPlumb.animate($(el), { "left": tLeft, "top": tTop }, { duration: "slow" });
	});
	jsPlumb.recalculateOffsets($("#container-blocos"));

	//Inicia a funcao de modificacao dos inputs
	$(document).on('propertychange keyup input cut paste', 'input', function() {
		if ($(this).data('oldVal') != $(this).val()) {
			$(this).data('oldVal', $(this).val());
			if ($.isNumeric($(this).val()) == true && $('#t').val() != 0 && $('#h').val() != 0) {
				atualizaGrafico();
			}
		}
	});
});