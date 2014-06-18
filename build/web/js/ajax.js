//Carrega as informacoes do banco
$(document).ready(function() {
  carregarBlocos();
});

function carregarBlocos() {
  var url_nome = window.location.hash.replace("#", "");
  if (url_nome) {
    $.ajax({
      type: form_geral.attr('method'),
      url: form_geral.attr('action'),
      dataType: 'json',
      data: {tipo: 'select', url_nome: url_nome},
      error: function(e) {
        alert("Ocorreu um erro, tente novamente.");
        console.log(e);
      },
      success: function(data) {
        var valores = data.valores;
        if (!valores.vazio) {
          /*$('#h').val(valores.passo);
           $('#periodo').val(valores.periodo);*/
          $('#hMin').val(valores.passo);
          $('#hMax').val(valores.periodo);
          $('#t').val(valores.t);
          $("#metodo option[value=" + valores.metodo + "]").attr("selected", "selected");
          criar_bloco('load', valores);
          atualizaGrafico();
        }
      }
    });
  }
}

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
  for (var i = 0; i < bloco.length; i++) {
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
    /*"passo": Number($('#h').val()),
     "periodo": Number($('#periodo').val()),*/
    "passo": Number($('#hMin').val()),
    "periodo": Number($('#hMax').val()),
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
      $('.dropdown.user .meus-compartimentos').remove();
      getUsuarioInfo();
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
        $('#Logar').find('#loginEmail').val($('#Registrar').find('#inputEmail').val());
        $('#Logar').find('#loginSenha').val($('#Registrar').find('#inputSenha').val());
        $('#Logar').find('.btn-success').click();
        $('#register input').each(function() {
          $(this).val('');
        });
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
        if (e !== "false") {
          getUsuarioInfo();
          $('#Logar input').each(function(i) {
            $(i).val('');
          });
        } else {
          alert("Email ou Senha incorretos!");
          $('#Logar #loginSenha').val('');
        }
      }
    });
  } else {
    alert('O preenchimento de todos os campos é obrigatorio');
  }
  return false;
});

function getUsuarioInfo() {
  $.ajax({
    type: 'POST',
    url: 'UsuarioInfo',
    error: function(e) {
      alert("Ocorreu um erro, tente novamente.");
      console.log(e);
    },
    success: function(e) {
      var data = $.parseJSON(e);
      if (e !== "false") {
        $('.dropdown.user .nome').text(data.nome);
        if (data.urls) {
          for (var i = 0; i < data.urls.length; i++) {
            $('.dropdown.user .dropdown-menu').prepend($('<li class="meus-compartimentos"><a href="javascript:;" class="delete pull-right" data-id="' + data.urls[i] + '"><span class="glyphicon glyphicon-remove"></span></a><a href="#' + data.urls[i] + '" class="reload">' + data.urls[i] + '</a></li>'));
          }
        }
        $('.dropdown.user .dropdown-menu').prepend($('<li role="presentation" class="dropdown-header meus-compartimentos">Meus Projetos</li>'));
        $('.dropdown.login').hide();
        $('.dropdown.user').show();
      } else {
        $('.dropdown.login').show();
        $('.dropdown.user').hide();
      }
    }
  });
}

$(".logout").click(function() {
  $.ajax({
    type: 'POST',
    url: $(this).attr('href'),
    error: function(e) {
      alert("Ocorreu um erro, tente novamente.");
      console.log(e);
    },
    success: function(e) {
      $('#Logar input').each(function() {
        $(this).val('');
      });
      location.assign('#');
      limpar_tudo();
      $('.dropdown.login').show();
      $('.dropdown.user').hide();
      $('.dropdown.user .meus-compartimentos').remove();
    }
  });
  return false;
});

$(document).on('click', '.meus-compartimentos .delete', function() {
  var apagar = confirm("Tem certeza que deseja deletar este registro?\nEste processo não poderá ser desfeito");
  if (apagar === true) {
    $.ajax({
      type: 'POST',
      url: 'RegistroDelete',
      data: {
        registroId: $(this).data('id')
      },
      error: function(e) {
        alert("Ocorreu um erro, tente novamente.");
        console.log(e);
      },
      success: function(e) {
        if (e === "true") {
          $('.dropdown.user .meus-compartimentos').remove();
          getUsuarioInfo();
        } else {
          alert("Voce precisa ser o dono deste registro para apaga-lo\nCaso este projeto seja seu, realize seu login");
        }
      }
    });
  }
});

$(".modelos").click(function() {
  location.assign('#');
  limpar_tudo();
  var modelo = $(this).attr('href').replace("#", "");
  $.getJSON("json/" + modelo + ".json", function(data) {
    criar_bloco('load', data);
  });
  atualizaGrafico();
  return false;
});