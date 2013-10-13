//Ajax para salvar os dados no banco
var form = $('#salvarDados');
var valores = {
    "url_nome": "XX",
    "passo": 0,
    "periodo": 0,
    "t": 0,
    "metodo": 0,
    "caixa": [
        {
            "nome": "XX",
            "valor": 0,
            "ligacao": [
                {
                    "caixa_id": 0,
                    "caixa_destino_id": 0
                }, {
                    "caixa_id": 0,
                    "caixa_destino_id": 0
                }
            ]
        }, {
            "nome": "XX",
            "valor": 0,
            "ligacao": [
                {
                    "caixa_id": 0,
                    "caixa_destino_id": 0
                }, {
                    "caixa_id": 0,
                    "caixa_destino_id": 0
                }
            ]
        }
    ]
};
form.submit(function () {
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