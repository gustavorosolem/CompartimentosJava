<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Compartimentos</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/yamm.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
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
        <a class="navbar-brand" href="#">Compartimentos</a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <form name="PegaDados" action="PegaDados" method="post" class="form-horizontal" id="salvarDados">
          <ul class="nav navbar-nav">
            <li><button type="button" class="btn btn-info navbar-btn btn-add-bloco"><span class="glyphicon glyphicon-inbox"></span> Adicionar Bloco</button></li>
            <li class="sep-nav"></li>
            <li><button type="submit" class="btn btn-success navbar-btn" /><span class="glyphicon glyphicon-save"></span> Salvar Alterações</button></li>
            <li class="sep-nav"></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Opções <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li>
                  <div class="yamm-content">
                    <div class="menu-principal">
                      <div class="form-group">
                        <label for="t" class="col-lg-4 control-label">Método</label>
                        <div class="col-lg-8">
                          <select class="input-sm form-control" id="metodo" name="metodo">
                            <option value="1">RKF</option>
                            <option value="2">RK4</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
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
                        <span class="col-lg-2 control-label"></span>
                        <div class="col-lg-8">
                          <a href="javascript:;" onclick="atualizaGrafico();" class="btn btn-warning btn-sm"><span class="glyphicon glyphicon-refresh"></span> Forçar Atualização</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Modelos Compartimentais <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Modelo A</a></li>
                <li><a href="#">Modelo B</a></li>
                <li><a href="#">Modelo C</a></li>
              </ul>
            </li>
          </ul>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown login">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Login <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li>
                <div class="yamm-content">
                  <form class="" role="form">
                    <div class="form-group">
                      <input type="email" class="form-control" placeholder="Email">
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control" placeholder="Senha">
                    </div>
                    <button type="submit" class="btn btn-success"><span class="glyphicon glyphicon-log-in"></span> Entrar</button>
                    <a href="#" class="btn btn-info pull-right"><span class="glyphicon glyphicon-tasks"></span> Registrar-se</a>
                  </form>
                </div>
              </li>
            </ul>
          </li>
          <li><a href="#" class="help" data-toggle="tooltip" title="Clique em 'Adicionar Bloco' para iniciar"><span class="glyphicon glyphicon-question-sign"></span> Ajuda</a></li>
          <!--<li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </li>-->
        </ul>
      </div><!-- /.navbar-collapse -->
    </nav>
    <div class="container-geral">
      <div class="grafico-resultado">
        <div id="grafico-container" style="width: 600px; height: 250px;"></div>
      </div>
      <div id="container-blocos">
        <!--<div class="bloco" id="x1" data-ref="1">
          <div class="drag"><span class="glyphicon glyphicon-move"></span></div>
          <div class="start ep"><span class="glyphicon glyphicon-random ep"></span></div>
          <span class="title">x1</span>
          <div class="form-group">
            <input class="form-control input-sm" type="text" placeholder="Valor Inicial">
          </div>
          <span class="close">&times;</span>
        </div>
        <div class="bloco" id="x2" data-ref="2">
          <div class="drag"><span class="glyphicon glyphicon-move"></span></div>
          <div class="start ep"><span class="glyphicon glyphicon-random ep"></span></div>
          <span class="title">x2</span>
          <div class="form-group">
            <input class="form-control input-sm" type="text" placeholder="Valor Inicial">
          </div>
          <span class="close">&times;</span>
        </div>
        <div class="bloco" id="x3" data-ref="3">
          <div class="drag"><span class="glyphicon glyphicon-move"></span></div>
          <div class="start ep"><span class="glyphicon glyphicon-random ep"></span></div>
          <span class="title">x3</span>
          <div class="form-group">
            <input class="form-control input-sm" type="text" placeholder="Valor Inicial">
          </div>
          <span class="close">&times;</span>
        </div>-->
      </div>
      <div id="bloco-modelo">
        <div class="drag"><span class="glyphicon glyphicon-move"></span></div>
        <div class="start ep"><span class="glyphicon glyphicon-random ep"></span></div>
        <span class="title">TITLE</span>
        <div class="form-group">
          <input class="form-control input-sm" type="text" placeholder="Valor Inicial">
        </div>
        <span class="close">&times;</span>
      </div>
    </div>

    <table style="margin-top: 100px;" class="table table-bordered table-hover table-condensed table-striped" id="result"></table>
    <img src="img/ajax-loader.gif" id="loading-indicator" style="display:none; position: absolute; left: 50%; top: 50%; margin: -24px 0 0 -24px;" />

    <!-- JS -->
    <!-- jquery -->
    <script src="js/jquery-1.10.1.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!-- canvas js -->
    <script src="js/canvasjs.min.js"></script>
    <!-- jsPlumb -->
    <script src="js/jquery.ui.touch-punch.min.js"></script>
    <!--<script src="js/jquery.jsPlumb-1.5.2-min.js"></script>-->
    <!-- Old jsplumb -->
    <script src="js/plumb/jsBezier-0.6-min.js"></script>
    <script src="js/plumb/jsPlumb-util.js"></script>
    <script src="js/plumb/jsPlumb-dom-adapter.js"></script>
    <script src="js/plumb/jsPlumb-drag.js"></script>
    <script src="js/plumb/jsPlumb.js"></script>
    <script src="js/plumb/jsPlumb-endpoint.js"></script>
    <script src="js/plumb/jsPlumb-connection.js"></script>
    <script src="js/plumb/jsPlumb-anchors.js"></script>
    <script src="js/plumb/jsPlumb-defaults.js"></script>
    <script src="js/plumb/jsPlumb-connectors-statemachine.js"></script>
    <script src="js/plumb/jsPlumb-connectors-flowchart.js"></script>
    <script src="js/plumb/jsPlumb-renderers-svg.js"></script>
    <script src="js/plumb/jsPlumb-renderers-canvas.js"></script>
    <script src="js/plumb/jsPlumb-renderers-vml.js"></script>
    <script src="js/plumb/jquery.jsPlumb.js"></script>
    <script src="js/jquery.editable.min.js"></script>
    <!-- custom -->
    <script src="js/custom.js"></script>
    <script src="js/ajax.js"></script>
    <!-- /JS -->
  </body>
</html>