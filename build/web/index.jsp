<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Compartimentos</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen" />
    <link href="css/yamm.css" rel="stylesheet" />
    <link href="css/hopscotch.css" rel="stylesheet" />
    <link href="css/custom.css" rel="stylesheet" />
  </head>
  <body>
    <nav class="navbar navbar-default navbar-fixed-top yamm" role="navigation">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Navegação</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#" id="logo">Compartimentos</a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <form name="PegaDados" action="PegaDados" method="post" class="form-horizontal" id="salvarDados">
          <ul class="nav navbar-nav">
            <li><button type="button" class="btn btn-info navbar-btn btn-add-bloco" id="tut-step1"><span class="glyphicon glyphicon-inbox"></span> Adicionar Bloco</button></li>
            <li class="sep-nav"></li>
            <li><button type="submit" class="btn btn-success navbar-btn" id="tut-step2"><span class="glyphicon glyphicon-save"></span> Salvar Alterações</button></li>
            <li class="sep-nav"></li>
            <li><button type="button" class="btn btn-warning navbar-btn criar-novo" id="tut-step3"><span class="glyphicon glyphicon-file"></span> Novo Projeto</button></li>
            <li class="sep-nav"></li>
            <li class="dropdown" id="tut-step4">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Opções <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li>
                  <div class="yamm-content">
                    <div class="menu-principal">
                      <div class="form-group">
                        <label for="t" class="col-lg-4 control-label">Método</label>
                        <div class="col-lg-8">
                          <select class="input-sm form-control" id="metodo" name="metodo">
                            <option value="3">RKF</option>
                            <!--<option value="2">RK4</option>-->
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="hMin" class="col-lg-4 control-label">PassoMin</label>
                        <div class="col-lg-8">
                          <input name="hMin" class="input-sm form-control" id="hMin" type="text" placeholder="Passo Mínimo" value="0.00001" />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="hMax" class="col-lg-4 control-label">PassoMax</label>
                        <div class="col-lg-8">
                          <input name="hMax" class="input-sm form-control" id="hMax" type="text" placeholder="Passo Máximo" value="1.0" />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="b" class="col-lg-4 control-label">Tempo</label>
                        <div class="col-lg-8">
                          <input name="b" class="input-sm form-control" id="b" type="text" placeholder="Limite Tempo" value="100" />
                        </div>
                      </div>
                      <!--<div class="form-group">
                        <label for="h" class="col-lg-4 control-label">Passo</label>
                        <div class="col-lg-8">
                          <input name="passo" class="input-sm form-control" id="h" type="text" placeholder="H" value="0.01" />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="periodo" class="col-lg-4 control-label">Período</label>
                        <div class="col-lg-8">
                          <input name="periodo" class="input-sm form-control" id="periodo" type="text" placeholder="Tempo" value="4" />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="t" class="col-lg-4 control-label">T</label>
                        <div class="col-lg-8">
                          <input name="t" class="input-sm form-control" id="t" type="text" placeholder="T" value="0.1" />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="t" class="col-lg-4 control-label">Universo</label>
                        <div class="col-lg-8">
                          <input name="universo" class="input-sm form-control" id="universo" type="text" placeholder="Universo" value="0" />
                        </div>
                      </div>-->
                      <div class="form-group">
                        <span class="col-lg-2 control-label"></span>
                        <div class="col-lg-8">
                          <a href="javascript:;" onclick="atualizaGrafico();" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-refresh"></span> Forçar Atualização</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li class="dropdown" id="tut-step5">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Modelos Compartimentais <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#modeloCatenario" class="modelos">Modelo Catenário</a></li>
                <li><a href="#modeloCatenarioCiclico" class="modelos">Modelo Catenário Ciclíco</a></li>
                <li><a href="#modeloMamilar" class="modelos">Modelo Mamilar</a></li>
              </ul>
            </li>
            <li class="dropdown" id="exportar">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Exportar <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="javascript:;" class="export" data-type="xls">Salvar em XLS (Excel)</a></li>
                <li><a href="javascript:;" class="export" data-type="txt">Salvar em TXT</a></li>
                <li><a href="javascript:;" class="export" data-type="csv">Salvar em CSV</a></li>
                <li><a href="javascript:;" class="export" data-type="html">Visualizar HTML</a></li>
              </ul>
            </li>
          </ul>
        </form>
        <ul class="nav navbar-nav navbar-right" id="tut-step6">
          <li class="dropdown login">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Login <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li>
                <div class="yamm-content">
                  <form role="form" name="Login" action="Login" id="Logar" method="post">
                    <div class="form-group">
                      <input type="email" class="form-control" placeholder="Email" id="loginEmail" name="email">
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control" placeholder="Senha" id="loginSenha" name="senha">
                    </div>
                    <button type="submit" class="btn btn-success"><span class="glyphicon glyphicon-log-in"></span> Entrar</button>
                    <a href="#" data-toggle="modal" data-target="#register" class="btn btn-info pull-right"><span class="glyphicon glyphicon-tasks"></span> Registrar-se</a>
                  </form>
                </div>
              </li>
            </ul>
          </li>
          <li class="dropdown user" style="display: none;">
            <!--<c:choose> <c:when test="${ user eq null }"><p>Login</p></c:when><c:otherwise><p>${ user.nome }</p></c:otherwise></c:choose>-->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="nome">${ user.nome }</span> <b class="caret"></b></a>
            <ul class="dropdown-menu" role="menu">
              <li class="divider"></li>
              <li role="presentation" class="dropdown-header">Dados Pessoais</li>
              <li class="disabled"><a href="logout">Alterar Senha</a></li>
              <li><a href="logout" class="logout">Logout</a></li>
            </ul>
          </li>
          <li><a href="javascript:;" class="help"><span class="glyphicon glyphicon-question-sign"></span> Ajuda</a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </nav>
    <div class="container-geral">
      <div id="container-blocos"></div>
      <div id="bloco-modelo">
        <div class="drag"><span class="glyphicon glyphicon-move"></span></div>
        <div class="start ep"><span class="glyphicon glyphicon-random ep"></span></div>
        <span class="title">TITLE</span>
        <div class="form-group">
          <input class="form-control input-sm" type="text" placeholder="Valor Inicial">
        </div>
        <div class="grafico-resultado-mini">
          <div id="grafico-container-" class="graph"></div>
          <div class="reporting"></div>
          <div class="grafico-area"></div>
        </div>
        <span class="close">&times;</span>
        <div class="btn-group dropup universo" style="display:none;">
          <span data-toggle="dropdown" class="glyphicon glyphicon-globe dropdown-toggle"></span>
          <ul class="dropdown-menu" role="menu">
            <li class="subtitle">Universo</li>
            <li><input class="form-control input-sm" type="text" placeholder="Entrada"></li>
            <li><input class="form-control input-sm" type="text" placeholder="Saida"></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="grafico-resultado" tabindex="-1" role="dialog" aria-labelledby="Grafico" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="Grafico">Gráfico</h4>
          </div>
          <div class="modal-body">
            <span class="integracao-soma pull-right"></span>
            <div class="form-inline integracao">
              <div class="form-group">
                <label class="control-label">Integração</label>
              </div>
              <div class="form-group">
                <input class="form-control input-sm" type="text" placeholder="Min" id="pt0" />
              </div>
              <div class="form-group">
                <input class="form-control input-sm" type="text" placeholder="Max" id="pt1" />
              </div>
              <div class="form-group">
                <a class="btn btn-default btn-sm" href="javascript:;" onclick="integracaoAcumulador();" role="button">Calcular</a>
              </div>
              <div class="form-group">
                <a class="btn btn-default btn-sm" href="javascript:;" onclick="resetExtremes();" role="button">Reset</a>
              </div>
            </div>
            <div id="grafico-container"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Register -->
    <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="Registrar" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Cadastro</h4>
          </div>
          <form class="form-horizontal" role="form" name="Register" action="Register" id="Registrar" method="post">
            <div class="modal-body">
              <div class="form-group">
                <label for="inputNome" class="col-sm-2 control-label">Nome</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="inputNome" placeholder="Nome">
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="inputEmail" placeholder="Email">
                </div>
              </div>
              <div class="form-group">
                <label for="inputSenha" class="col-sm-2 control-label">Senha</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="inputSenha" placeholder="Senha">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
              <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Diversos -->
    <!-- <table style="margin-top: 100px;" class="table table-bordered table-hover table-condensed table-striped" id="result"></table> -->
    <div id="export-html" style="display: none;"><span class="glyphicon glyphicon-remove close-html"></span><table class="table table-bordered table-hover table-condensed table-striped" id="result"></table></div>
    <img src="img/ajax-loader.gif" id="loading-indicator" style="position: absolute; left: 50%; top: 50%; margin: -24px 0 0 -24px; z-index: 999;" />
    <div class="modal-backdrop fade in"></div>

    <!-- JS -->
    <!-- jquery -->
    <script src="js/jquery-1.10.1.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.editable.min.js"></script>
    <script src="js/jQuery.download.js"></script>
    <!-- canvas js -->
    <script src="js/highstock.js"></script>
    <script src="js/exporting.js"></script>
    <!-- jsPlumb -->
    <script src="js/jquery.ui.touch-punch.min.js"></script>
    <script src="js/jquery.jsPlumb-1.5.4-min.js"></script>
    <!-- custom -->
    <script src="js/calculos.js"></script>
    <script src="js/graficos.js"></script>
    <script src="js/jsplumb-custom.js"></script>
    <script src="js/custom.js"></script>
    <script src="js/ajax.js"></script>
    <script src="js/hopscotch.js"></script>
    <!-- /JS -->
  </body>
</html>