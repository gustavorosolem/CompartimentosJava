//PLUMB
// Gerador de cores aleatorias
var curColourIndex = 1, maxColourIndex = 24, nextColour = function() {
  var R, G, B;
  R = parseInt(128 + Math.sin((curColourIndex * 3 + 0) * 1.3) * 128);
  G = parseInt(128 + Math.sin((curColourIndex * 3 + 1) * 1.3) * 128);
  B = parseInt(128 + Math.sin((curColourIndex * 3 + 2) * 1.3) * 128);
  curColourIndex = curColourIndex + 1;
  if (curColourIndex > maxColourIndex)
    curColourIndex = 1;
  return "rgb(" + R + "," + G + "," + B + ")";
};

//Configuracoes dos blocos
var sourceOptions = {
  filter: ".ep",
  anchor: "Continuous",
  connector: "Bezier",
  connectorStyle: {strokeStyle: "#000", lineWidth: 2},
  maxConnections: -1,
  onMaxConnections: function(info, e) {
    alert("Maximum connections (" + info.maxConnections + ") reached");
  }
};
var targetOptions = {
  dropOptions: {hoverClass: "dragHover"},
  anchor: "Continuous"
};

jsPlumb.ready(function() {
  jsPlumb.draggable($(".bloco"), {handle: ".drag", opacity: 0.8});
  jsPlumb.importDefaults({
    Container: $("#container-blocos"),
    Endpoint: ["Dot", {radius: 2}],
    HoverPaintStyle: {strokeStyle: "#42a62c", lineWidth: 2},
    ConnectionOverlays: [
      ["PlainArrow", {location: 1, id: "arrow", length: 10, width: 15}],
      ["Label", {label: "Ligação", id: "label"}]
    ]
  });
  jsPlumb.bind("connection", function(info) {
    if (info.sourceId === info.targetId) {
      jsPlumb.detach(info);
    } else {
      info.connection.setPaintStyle({strokeStyle: nextColour()});
      info.connection.getOverlay("label").setLabel("<input type='text' placeholder='Taxa " + $(info.connection.source).attr('data-ref') + ">" + $(info.connection.target).attr('data-ref') + "' class='form-control input-sm' id='k" + $(info.connection.source).attr('data-ref') + $(info.connection.target).attr('data-ref') + "' /><span class='close' data-id='" + info.connection.id + "'>&times;</span>");
    }
  });
  jsPlumb.bind("click", function(c) {
    //jsPlumb.detach(c);
  });

  jsPlumb.bind("jsPlumbConnection", function(connectionInfo) {
    //...update your data model here.  The contents of the 'connectionInfo' are described below.
    //http://jsplumb.tumblr.com/
    //jsPlumb.repaintEverything();
    //function random_width() {
    //return Math.floor(Math.random() * (900 - 200) + 200);
  });
  jsPlumb.bind("jsPlumbConnectionDetached", function(connectionInfo) {
    //...update your data model here.  The contents of the 'connectionInfo' are described below.
  });

  atualizarTudo();
});

//Funcao para apagar um bloco
$(document).on('click', '.bloco .close', function() {
  jsPlumb.detachAllConnections($(this).parent());
  $(this).parent().remove();
  jsPlumb.repaintEverything();
});

$(document).on('click', '._jsPlumb_overlay .close', function() {
  var id = $(this).data('id');
  jsPlumb.select().each(function(conn) {
    if (conn.id === id) {
      jsPlumb.detach(conn);
    }
  });
  atualizaGrafico();
});
