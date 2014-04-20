//RK4
var method_rkf = function(t, h) {
  var graph = [], bloco = [], entra = [], sai = [];
  $(".bloco").each(function() {
    if ($(this).find('input').val()) {
      bloco.push({id: $(this).attr('id'), val: Number($(this).find('input').val())});
    }
  });
  for (var i = 0; i < bloco.length; i++) {
    graph[i] = [];
    //Entra
    var temp = jsPlumb.getConnections({target: bloco[i].id});
    for (var j = 0; j < temp.length; j++) {
      var val = $(temp[j].getOverlay("label").getLabel());
      val = $(val).attr('id');
      val = Number($('#' + val).val());
      if (val) {
        entra.push({id: bloco[i].id, id_val: bloco[i].val, val: val});
      }
    }
    //Sai
    var temp = jsPlumb.getConnections({source: bloco[i].id});
    for (var j = 0; j < temp.length; j++) {
      var val = $(temp[j].getOverlay("label").getLabel());
      val = $(val).attr('id');
      val = Number($('#' + val).val());
      if (val) {
        sai.push({id: bloco[i].id, id_val: bloco[i].val, val: val});
      }
    }
  }
  var t_temp = t;
  var periodo = $('#periodo').val();
  while (t_temp <= periodo) {
    for (var i = 0; i < bloco.length; i++) {
      var id = bloco[i].id;
      var val = bloco[i].val;
      var rk1 = h * kUm(val, id, entra, sai);
      var rk2 = h * kDois(val, id, entra, sai, rk1);
      var rk3 = h * kTres(val, id, entra, sai, rk2);
      var rk4 = h * kQuatro(val, id, entra, sai, rk3);
      graph[i].push({x: t_temp.toFixed(3), y: val});
      bloco[i].val = val * 1 + (rk1 * 1 + 2 * rk2 + 2 * rk3 + rk4 * 1) / 6;
      for (var j = 0; j < entra.length; j++) {
        if (entra[j].id === id) {
          entra[j].id_val = bloco[i].val;
        }
      }
      for (var j = 0; j < sai.length; j++) {
        if (sai[j].id === id) {
          sai[j].id_val = bloco[i].val;
        }
      }
      graph[i].label = id;
    }
    t_temp = h + t_temp;

  }
  function kUm(val, id, entra, sai) {
    var result = 0.0;
    for (var i = 0; i < entra.length; i++) {
      if (entra[i].id === id) {
        result += entra[i].val * entra[i].id_val;
      }
    }
    for (var i = 0; i < sai.length; i++) {
      if (sai[i].id === id) {
        result -= sai[i].val * val;
      }
    }
    return result;
  }
  function kDois(val, id, entra, sai, rk1) {
    var result = 0.0;
    for (var i = 0; i < entra.length; i++) {
      if (entra[i].id === id) {
        result += entra[i].val * (entra[i].id_val + rk1);
      }
    }
    for (var i = 0; i < sai.length; i++) {
      if (sai[i].id === id) {
        result -= sai[i].val * (val + rk1);
      }
    }
    return result;
  }
  function kTres(val, id, entra, sai, rk2) {
    var result = 0.0;
    for (var i = 0; i < entra.length; i++) {
      if (entra[i].id === id) {
        result += entra[i].val * (entra[i].id_val + rk2);
      }
    }
    for (var i = 0; i < sai.length; i++) {
      if (sai[i].id === id) {
        result -= sai[i].val * (val + rk2);
      }
    }
    return result;
  }
  function kQuatro(val, id, entra, sai, rk3) {
    var result = 0.0;
    for (var i = 0; i < entra.length; i++) {
      if (entra[i].id === id) {
        result += entra[i].val * (entra[i].id_val + rk3);
      }
    }
    for (var i = 0; i < sai.length; i++) {
      if (sai[i].id === id) {
        result -= sai[i].val * (val + rk3);
      }
    }
    return result;
  }
  return graph;
};