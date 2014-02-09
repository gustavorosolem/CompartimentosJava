$(window).resize(function() {
  $('.container-geral').height($(window).height() - 70);
}).resize();

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

  /* Criar tabela em HTML */
  var tabela = '<tr>';
  tabela += "<th width='150'>Passo</th>";
  for (var i = 0; i < dps.length; i++) {
    tabela += '<th>' + dps[i].label + '</th>';
  }
  ;
  tabela += '</tr>';
  if (dps[0]) {
    for (var i = 0; i < dps[0].length; i++) {
      tabela += '<tr>';
      tabela += '<td>' + dps[0][i].x + '</td>';
      for (var j = 0; j < dps.length; j++) {
        tabela += '<td>' + dps[j][i].y + '</td>';
      };
      tabela += '</tr>';
    };
  }
  $('#result').html(tabela);
}

//Funcao do botao para adicionar outro bloco
$(".btn-add-bloco").click(function() {
  criar_bloco('create');
});

var qtd_bloco = 1;
//Funcao para criar os blocos dinamicamente
function criar_bloco(origem, valores) {
  var Div;
  if (origem === 'create') {
    Div = $("#bloco-modelo").clone();
    $(Div).html($(Div).html().replace('TITLE', 'x' + qtd_bloco));
    $(Div).find('.grafico-resultado-mini div').attr('id', 'grafico-container-x' + qtd_bloco);
    $(Div).addClass('bloco x' + qtd_bloco).attr("id", "x" + qtd_bloco).attr("data-ref", "x" + qtd_bloco).prependTo("#container-blocos");
    criar_bloco_plumb(Div, 0, 0);
    $(Div).find('.title').editable("click", function(e) {
      if (e.value === '') {
        e.target.html(e.old_value);
        alert("Escreva um nome valido para o bloco");
      }
    });
    qtd_bloco += 1;
  } else if (origem === 'load') {
    limpar_tudo();
    var number;
    for (i = 0; i < valores.caixa.length; i++) {
      Div = $("#bloco-modelo").clone();
      $(Div).html($(Div).html().replace('TITLE', valores.caixa[i].nome));
      $(Div).find('.grafico-resultado-mini div').attr('id', 'grafico-container-' + valores.caixa[i].id);
      $(Div).addClass('bloco ' + valores.caixa[i].id).attr("id", valores.caixa[i].id).attr("data-ref", valores.caixa[i].id).prependTo("#container-blocos");
      $(Div).find('input').val(valores.caixa[i].valor);
      criar_bloco_plumb(Div, valores.caixa[i].posLeft, valores.caixa[i].posTop);
      $(Div).find('.title').editable("click", function(e) {
        if (e.value === '') {
          e.target.html(e.old_value);
          alert("Escreva um nome valido para o bloco");
        }
      });
      number = Number(valores.caixa[i].id.replace('x', ''));
      if (number >= qtd_bloco) {
        qtd_bloco = number + 1;
      }
    };
    for (i = 0; i < valores.ligacao.length; i++) {
      jsPlumb.connect({source: valores.ligacao[i].saida_id, target: valores.ligacao[i].chegada_id});
      $("#k" + valores.ligacao[i].saida_id + valores.ligacao[i].chegada_id).val(valores.ligacao[i].valor);
    };
  }
  atualizarTudo();
  jsPlumb.repaintEverything();
}

function criar_bloco_plumb(Div, posLeft, posTop) {
  if (!posLeft && !posTop) {
    posLeft = Math.floor(Math.random() * ($(window).width() - 200));
    posTop = Math.floor(Math.random() * ($(window).height() - 145));
  }
  jsPlumb.makeSource($(Div), sourceOptions);
  jsPlumb.makeTarget($(Div), targetOptions);
  jsPlumb.draggable($(Div), {handle: ".drag", stack: "div", opacity: 0.8});
  jsPlumb.animate($(Div).attr('id'), {left: posLeft, top: posTop}, {duration: "slow"});
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: $(Div).find('.grafico-resultado-mini .graph')[0]
    },
    series: [{
        data: [],
        showInLegend: false
      }]
  });
}

function limpar_tudo() {
  jsPlumb.detachEveryConnection();
  $(".bloco").remove();
  qtd_bloco = 1;
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

$(document).on('click', '.yamm .dropdown-menu, .universo .dropdown-menu', function(e) {
  e.stopPropagation();
});

function atualizarTudo() {
  $('#container-blocos .bloco .title').each(function() {
    $(this).tooltip({
      title: 'Clique para alterar',
      container: 'body'
    });
  });
  $('#container-blocos .bloco .universo .dropdown-toggle').each(function() {
    $(this).tooltip({
      title: 'Alterar valores do universo',
      container: 'body'
    });
  });
}

$.getScript("json/ajuda.js", function() {
  $('.help').click(function() {
    hopscotch.startTour(ajuda);
  });
});

$(document).ready(function() {
  $('#loading-indicator').hide();
  $('.modal-backdrop').remove();
  getUsuarioInfo();
});

$(document).on('click', '.reload', function() {
  location.assign($(this).attr('href'));
  carregarBlocos();
});

$(".criar-novo").click(function() {
  var apagar = confirm("Todas as alterações que não estão salvas serão perdidas!");
  if (apagar === true) {
    location.assign('#');
    limpar_tudo();
  }
  return false;
});