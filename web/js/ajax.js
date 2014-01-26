//Carrega as informacoes do banco
$(document).ready(function() {
  var url_nome = window.location.hash.replace("#", "");
  if (url_nome) {
    $.ajax({
      type: form_geral.attr('method'),
      url: form_geral.attr('action'),
      dataType: 'json',
      data: {tipo: 'select', url_nome: url_nome},
      //data: form_geral.serialize(),
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
          criar_bloco('load', valores);
          atualizaGrafico();
        }
      }
    });
  }
});

//Ajax para salvar os dados no banco
var form_geral = $('#salvarDados');
form_geral.submit(function() {
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

  //Pega as inform_geralacoes dos compartimentos
  var bloco = $(".bloco"), caixas = [], position;
  for (i = 0; i < bloco.length; i++) {
    if ($(bloco[i]).find('input').val()) {
      position = $(bloco[i]).position();
      caixas.push({
        "id": $(bloco[i]).attr('id'),
        "nome": $(bloco[i]).find('.title').text(),
        "valor": $(bloco[i]).find('input').val(),
        "posTop": position.top,
        "posLeft": position.left
      });
    }
  };

  //Criando o JSON das inform_geralacoes
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
    type: form_geral.attr('method'),
    url: form_geral.attr('action'),
    data: {tipo: 'insert', valores: JSON.stringify(valores)},
    error: function(e) {
      alert("Ocorreu um erro, tente novamente.");
      console.log(e);
    },
    success: function(data) {
      alert("Salvo com sucesso!");
    }
  });
  return false;
});

$('#Registrar').submit(function() {
  if ($(this).find('#inputNome').val() !== '' && $(this).find('#inputEmail').val() !== '' && $(this).find('#inputSenha').val() !== '') {
    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: {
        nome: $(this).find('#inputNome').val(),
        email: $(this).find('#inputEmail').val(),
        senha: $(this).find('#inputSenha').val()
      },
      error: function(e) {
        alert("Ocorreu um erro, tente novamente.");
        console.log(e);
      },
      success: function(data) {
        $('#register').modal('hide');
        alert(data);
        $('#Logar').find('#loginEmail').val($('#Registrar').find('#inputEmail').val());
        $('#Logar').find('#loginSenha').val($('#Registrar').find('#inputSenha').val());
        $('#Logar').find('.btn-success').click();
      }
    });
  } else {
    alert('O preenchimento de todos os campos é obrigatorio');
  }
  return false;
});

$('#Logar').submit(function() {
  if ($(this).find('#loginEmail').val() !== '' && $(this).find('#loginSenha').val() !== '') {
    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: {
        email: $(this).find('#loginEmail').val(),
        senha: $(this).find('#loginSenha').val()
      },
      error: function(e) {
        alert("Ocorreu um erro, tente novamente.");
        console.log(e);
      },
      success: function(e) {
        if (e === "true") {
          location.reload();
        } else {
          alert("Email ou Senha incorretos!");
          $('#Logar').find('input').val('');
        }
      }
    });
  } else {
    alert('O preenchimento de todos os campos é obrigatorio');
  }
  return false;
});
