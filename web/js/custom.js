$(window).resize(function() {
  $('.container-geral').height($(window).height() - 70);
}).resize();

//CanvasJS
/*var dps = [];
var chart = new CanvasJS.Chart("grafico-container", {
  data: [
    {
      type: "line",
      dataPoints: dps
    }
  ]
});
window.onload = function() {
  chart.render();
};*/

function atualizaGrafico() {
  var t = Number($('#t').val());
  var h = Number($('#h').val());
  var method = Number($('#metodo option:selected').val());
  if (method === 1) {
    dps = method_rkf(t, h);
  } else if (method === 2) {
    alert('Em desenvolvimento');
    //dps = method_rk4(t, h);
  };
  gerarGraficos(dps);

  /*$('#grafico-container').html('');
  var chart = new CanvasJS.Chart("grafico-container", {
    legend: {
      fontSize: 13,
      fontFamily: "Arial",
      horizontalAlign: "right",
      verticalAlign: "bottom"
    },
    toolTip: {
      shared: true,
      content: function(e) {
        var str = "<strong class='text-info'>Passo: " + e.entries[0].dataPoint.x.toFixed(2) + "</strong><br />";
        var soma_bloco = 0;
        for (var i = 0; i < e.entries.length; i++) {
          //var  temp = e.entries[i].dataSeries.name + ": <strong>" +  e.entries[i].dataPoint.y + "</strong> - Soma: " + e.entries[i].dataSeries.label + "<br />";
          var temp = e.entries[i].dataSeries.name + ": <strong>" + e.entries[i].dataPoint.y + "</strong><br />";
          str = str.concat(temp);
          soma_bloco += e.entries[i].dataPoint.y;
        }
        str = str.concat("<span class='text-mute'>Soma: <strong>" + soma_bloco + "</strong></span>");
        return (str);
      }
    },
    data: graph
  });
  chart.render();*/

  /* Criar tabela em HTML */
  var tabela = '<tr>';
  tabela += "<th width='150'>Passo</th>";
  for (var i = 0; i < dps.length; i++) {
    tabela += '<th>' + dps[i].label + '</th>';
  }
  ;
  tabela += '</tr>';
  for (var i = 0; i < dps[0].length; i++) {
    tabela += '<tr>';
    tabela += '<td>' + dps[0][i].x + '</td>';
    for (var j = 0; j < dps.length; j++) {
      tabela += '<td>' + dps[j][i].y + '</td>';
    };
    tabela += '</tr>';
  };
  $('#result').html(tabela);
}

//Funcao do botao para adicionar outro bloco
$(".btn-add-bloco").click(function() {
  criar_bloco('create');
  atualizarTudo();
});

var qtd_bloco = 1;
//Funcao para criar os blocos dinamicamente
function criar_bloco(origem, valores) {
  if (origem === 'create') {
    var Div = $("#bloco-modelo").clone();
    $(Div).html($(Div).html().replace('TITLE', 'x' + qtd_bloco));
    $(Div).find('.grafico-resultado-mini div').attr('id', 'grafico-container-x' + qtd_bloco);
    $(Div).addClass('bloco x' + qtd_bloco).attr("id", "x" + qtd_bloco).attr("data-ref", qtd_bloco).prependTo("#container-blocos");
    qtd_bloco += 1;
  } else if (origem === 'load') {
    $(".bloco").remove();
    for (i = 0; i < valores.caixa.length; i++) {
      var Div = $("#bloco-modelo").clone();
      $(Div).html($(Div).html().replace('TITLE', valores.caixa[i].nome));
      $(Div).find('.grafico-resultado-mini div').attr('id', 'grafico-container-' + valores.caixa[i].id);
      $(Div).addClass('bloco ' + valores.caixa[i].id).attr("id", valores.caixa[i].id).attr("data-ref", valores.caixa[i].id).prependTo("#container-blocos");
      $(Div).find('input').val(valores.caixa[i].valor);
    };
    for (i = 0; i < valores.ligacao.length; i++) {
      jsPlumb.connect({source: valores.ligacao[i].saida_id, target: valores.ligacao[i].chegada_id});
      $("#k" + valores.ligacao[i].saida_id + valores.ligacao[i].chegada_id).val(valores.ligacao[i].valor);
    };
  }
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: $(Div).find('.grafico-resultado-mini .graph')[0]
    },
    series: [{
      data: [],
      showInLegend: false
    }]
  });
  jsPlumb.makeSource($(Div), sourceOptions);
  jsPlumb.makeTarget($(Div), targetOptions);
  jsPlumb.draggable($(Div), {handle: ".drag", stack: "div", opacity: 0.8});
  var tLeft = Math.floor(Math.random() * 800),
      tTop = Math.floor(Math.random() * 600);
  //jsPlumb.animate($(Div), {"left": tLeft, "top": tTop}, {duration: "slow"});
  jsPlumb.repaintEverything();
}

//Inicia a funcao de modificacao dos inputs
$(document).on('propertychange keyup input cut paste', '#container-blocos input, .menu-principal input', function() {
  $(this).val(function(index, value) {
    return value.replace(',', '.');
  });
  if ($(this).data('oldVal') !== $(this).val()) {
    $(this).data('oldVal', $(this).val());
    if ($.isNumeric($(this).val()) === true && $('#t').val() !== 0 && $('#h').val() !== 0) {
      atualizaGrafico();
    }
  }
});

$(document).ajaxSend(function(event, request, settings) {
  $('#loading-indicator').show();
  $("<div class='modal-backdrop fade in'></div>").appendTo('body');
});

$(document).ajaxComplete(function(event, request, settings) {
  $('#loading-indicator').hide();
  $('.modal-backdrop').remove();
});

$(document).on('click', '.yamm .dropdown-menu', function(e) {
  e.stopPropagation();
});

function atualizarTudo() {
  $('#container-blocos .bloco .title').each(function() {
    $(this).editable("click", function(e) {
      if (e.value === '') {
        e.target.html(e.old_value);
        alert("Escreva um nome valido para o bloco");
      }
    });
    $(this).tooltip({
      title: 'Clique para alterar',
      container: 'body'
    });
  });
}

$('.help').tooltip({
  container: 'body',
  placement: 'auto'
});

$(document).ready(function() {
  $('#loading-indicator').hide();
  $('.modal-backdrop').remove();
});