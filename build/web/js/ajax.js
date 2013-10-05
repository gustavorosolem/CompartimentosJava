//Ajax para salvar os dados no banco
var form = $('#salvarDados');
var json=[8,2,3,4];
form.submit(function () {
    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        /*dataType: 'json',
        data: {json:json},*/
        data: form.serialize(),
        error: function(e){
            alert("Ocorreu um erro, tente novamente.");
            console.log(e);
        },
        success: function (data) {
            var result=data;
            alert(result);
        }
    });
    return false;
});

//Obter dados do servidor
//http://stackoverflow.com/questions/12600827/jquery-ajax-call-to-servlet-get-data-as-json
//http://www.json.org/java/