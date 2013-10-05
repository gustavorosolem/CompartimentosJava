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
        <link href="css/custom.css" rel="stylesheet">
    </head>
    <body>
        <div class="container-geral">
            <div class="menu-principal">
                <div class="well sidebar-nav">
                    <h1>Compartimentos</h1>
                    <p class="config-tit">Configurações gerais:</p>
                    <form name="PegaDados" action="PegaDados" method="get" class="form-horizontal" id="salvarDados">
                        <div class="form-group">
                            <label for="t" class="col-lg-3 control-label">Método</label>
                            <div class="col-lg-5">
                                <select class="input-sm form-control" id="metodo" name="metodo">
                                    <option value="1">RKF</option>
                                    <option value="2">RK4</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="h" class="col-lg-3 control-label">Passo</label>
                            <div class="col-lg-5">
                                <input name="passo" class="input-sm form-control" id="h" type="text" placeholder="H" value="0.01" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="periodo" class="col-lg-3 control-label">Período</label>
                            <div class="col-lg-5">
                                <input name="periodo" class="input-sm form-control" id="periodo" type="text" placeholder="Tempo" value="4" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="t" class="col-lg-3 control-label">T</label>
                            <div class="col-lg-5">
                                <input name="t" class="input-sm form-control" id="t" type="text" placeholder="T" value="0.1" />
                            </div>
                        </div>
                        <div class="form-group">
                            <span class="col-lg-3 control-label"></span>
                            <div class="col-lg-8">
                                <a href="javascript:;" onclick="atualizaGrafico()" class="btn btn-success btn-sm">Calcular</a>
                                <input type="submit" value="Salvar" class="btn btn-success btn-sm" />
                            </div>
                        </div>
                    </form>
                    <a class="btn btn-info btn-sm btn-add-bloco" href="javascript:;">Adicionar novo compartimento</a>
                </div>
            </div>
            <div class="grafico-resultado">
                <div id="grafico-container" style="width: 600px; height: 250px;"></div>
            </div>
            <div id="container-blocos">
                <div class="bloco" id="x1" data-ref="1">
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
                </div>
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
        <!-- custom -->
        <script src="js/custom.js"></script>
        <script src="js/ajax.js"></script>
        <!-- /JS -->
    </body>
</html>