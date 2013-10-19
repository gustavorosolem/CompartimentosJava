//Ajax para salvar os dados no banco
var form = $('#salvarDados');
form.submit(function () {    
    //Gerar a URL
    var url_nome = window.location.hash.replace("#","");
    if(!url_nome) {
        var char = new Array();
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
    var conexoes = new Array();
    //Entrada
    var temp = jsPlumb.getConnections();
    for(var j=0; j<temp.length; j++) {
        var val = $(temp[j].getOverlay("label").getLabel());
        val = $(val).attr('id');
        val = Number($('#'+ val).val());
        if (val) {
            conexoes.push({"saida_id": temp[j].sourceId, "chegada_id": temp[j].targetId, valor: val});
        }
    }
    
    //Pega as informacoes dos compartimentos
    var bloco = $(".bloco");
    var caixas = new Array();
    for (i=0; i<bloco.length; i++) {
        if ($(bloco[i]).find('input').val()) {
            caixas.push({
                "id": $(bloco[i]).attr('id'),
                "nome": $(bloco[i]).find('.title').text(),
                "valor": $(bloco[i]).find('input').val()
            });
        }
    };
    
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
        //dataType: 'json',
        data: {valores: JSON.stringify(valores)},
        //data: form.serialize(),
        error: function(e){
            alert("Ocorreu um erro, tente novamente.");
            console.log(e);
        },
        success: function (data) {
            alert(data);
        }
    });
    return false;
});

//Obter dados do servidor
//http://stackoverflow.com/questions/12600827/jquery-ajax-call-to-servlet-get-data-as-json