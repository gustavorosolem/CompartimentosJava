//Ajax para salvar os dados no banco
var form = $('#salvarDados');
form.submit(function() {
  //Gerar a URL
  var url_nome = window.location.hash.replace("#", "");
  if (!url_nome) {
    var char = [];
    char[0] = String.fromCharCode(97 + Math.round(Math.random() * 25));
    char[1] = String.fromCharCode(65 + Math.round(Math.random() * 25));
    char[2] = String.fromCharCode(97 + Math.round(Math.random() * 25));
    char[3] = String.fromCharCode(65 + Math.round(Math.random() * 25));
    char[4] = String.fromCharCode(65 + Math.round(Math.random() * 25));
    char[5] = String.fromCharCode(97 + Math.round(Math.random() * 25));
    url_nome = char.join("");
    window.location.hash = url_nome;
  }

  //Conexoes
  var conexoes = [];
  //Entrada
  var temp = jsPlumb.getConnections();
  for (var j = 0; j < temp.length; j++) {
    var val = $(temp[j].getOverlay("label").getLabel());
    val = $(val).attr('id');
    val = Number($('#' + val).val());
    if (val) {
      conexoes.push({"saida_id": temp[j].sourceId, "chegada_id": temp[j].targetId, valor: val});
    }
  }

  //Pega as informacoes dos compartimentos
  var bloco = $(".bloco");
  var caixas = [];
  for (i = 0; i < bloco.length; i++) {
    if ($(bloco[i]).find('input').val()) {
      caixas.push({
        "id": $(bloco[i]).attr('id'),
        "nome": $(bloco[i]).find('.title').text(),
        "valor": $(bloco[i]).find('input').val()
      });
    }
  }
  ;

  //Criando o JSON das informacoes
  var valores = {
    "url_nome": url_nome,
    "passo": Number($('#h').val()),
    "periodo": Number($('#periodo').val()),
    "t": Number($('#t').val()),
    "metodo": Number($('#metodo option:selected').val()),
    "caixa": caixas,
    "ligacao": conexoes
  };

  $.ajax({
    type: form.attr('method'),
    url: form.attr('action'),
    data: {tipo: 'insert', valores: JSON.stringify(valores)},
    error: function(e) {
      alert("Ocorreu um erro, tente novamente.");
      console.log(e);
    },
    success: function(data) {
      alert(data);
    }
  });
  return false;
});

//Carrega as informacoes do banco
$(document).ready(function() {
  var url_nome = window.location.hash.replace("#", "");
  if (url_nome) {
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      dataType: 'json',
      data: {tipo: 'select', url_nome: url_nome},
      //data: form.serialize(),
      error: function(e) {
        alert("Ocorreu um erro, tente novamente.");
        console.log(e);
      },
      success: function(data) {
        var valores = data.valores;
        if (!valores.vazio) {
          console.log(valores);
          $('#h').val(valores.passo);
          $('#periodo').val(valores.periodo);
          $('#t').val(valores.t);
          $("#metodo option[value=" + valores.metodo + "]").attr("selected", "selected");
          $(".bloco").remove();
          for (i = 0; i < valores.caixa.length; i++) {
            var Div = $("#bloco-modelo").clone();
            $(Div).html($(Div).html().replace('TITLE', valores.caixa[i].nome));
            $(Div).addClass('bloco ' + qtd_bloco).attr("id", valores.caixa[i].id).attr("data-ref", valores.caixa[i].id).prependTo("#container-blocos");
            $(Div).find('input').val(valores.caixa[i].valor);
            jsPlumb.makeSource($(Div), sourceOptions);
            jsPlumb.makeTarget($(Div), targetOptions);
            jsPlumb.draggable($(Div), {handle: ".drag", stack: "div", opacity: 0.8});
            var tLeft = Math.floor(Math.random() * 800),
                tTop = Math.floor(Math.random() * 600);
            jsPlumb.animate($(Div), {"left": tLeft, "top": tTop}, {duration: "slow"});
          }
          ;
          for (i = 0; i < valores.ligacao.length; i++) {
            jsPlumb.connect({source: valores.ligacao[i].saida_id, target: valores.ligacao[i].chegada_id});
            $("#k" + valores.ligacao[i].saida_id + valores.ligacao[i].chegada_id).val(valores.ligacao[i].valor);
          }
          ;
          jsPlumb.repaintEverything();
        }
      }
    });
  }
});
