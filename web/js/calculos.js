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
  console.log(graph);
  return graph;
};

var method_rkf_beta = function(t, h) {
  var nComp = 0;
  var TOL;
  var K = [];
  var W = [];
  var k = [];
  var R = [];
  var graph = [], bloco = [], entra = [], sai = [];
  try {
    for (l = 0; l < 8; l++) {
      K.push(new Array());
      for (j = 0; j < nComp; j++) {
        K[l].push(0);
      }
    }
    $(".bloco").each(function() {
      if ($(this).find('input').val()) {
        bloco.push({id: $(this).attr('id'), val: Number($(this).find('input').val())});
        nComp++;
      }
    });
    for (j = 0; j < nComp; j++) {
      W.push(bloco[j].val);
      graph.push(new Array());
    }
    var connection = jsPlumb.getConnections();
    for (var i = 0; i < nComp; i++) {
      k.push(new Array());
      for (var j = 0; j < nComp; j++) {
        k[i].push(0);
        if (i !== j) {
          for (var z = 0; z < connection.length; z++) {
            if (bloco[i].id === connection[z].sourceId && bloco[j].id === connection[z].targetId) {
              var val = $(connection[z].getOverlay("label").getLabel());
              val = $(val).attr('id');
              val = Number($('#' + val).val());
              k[i][j] = val;
            }
          }
        }
      }
    }

    TOL = 0.001;
    var t = 0;
    var tempo = new Array();
    var x = new Array();
    var a = 0;
    var b = 100;
    var hMin = Number($('#hMin').val().replace(/^\D+/g, ''));
    var hMax = Number($('#hMax').val().replace(/^\D+/g, ''));
    var h = hMax;
    var delta = 0;
    var FLAG = 1;
    var w1 = 0, w2 = 0;
    var c = 0;
    for (j = 0; j < nComp; j++) {
      R[j] = 0;
      x[j] = new Array();
      tempo[j] = new Array();
    }
    if (nComp) {
      while (FLAG === 1) {
        for (l = 0; l < 8; l++) {
          for (j = 0; j < nComp; j++) {
            K[l][j] = 0;
          }
        }

        for (j = 0; j < nComp; j++) {
          for (i = 0; i < nComp; i++) {
            K[0][j] = K[0][j] + h * (k[i][j] * W[i] - k[j][i] * W[j]);
          }
        }

        for (j = 0; j < nComp; j++) {
          for (i = 0; i < nComp; i++) {
            K[1][j] = K[1][j] + h * (k[i][j] * (W[i] + K[0][j] / 6) - k[j][i] * (W[j] + K[0][j] / 6));
          }
        }

        for (j = 0; j < nComp; j++) {
          for (i = 0; i < nComp; i++) {
            K[2][j] = K[2][j] + h * (k[i][j] * (W[i] + 4 * K[0][j] / 75 + 16 * K[1][j] / 75) - k[j][i] * (W[j] + 4 * K[0][j] / 75 + 16 * K[1][j] / 75));
          }
        }

        for (j = 0; j < nComp; j++) {
          for (i = 0; i < nComp; i++) {
            K[3][j] = K[3][j] + h * (k[i][j] * (W[i] + 5 * K[0][j] / 6 - 8 * K[1][j] / 3 + 5 * K[2][j] / 2) - k[j][i] * (W[j] + 5 * K[0][j] / 6 - 8 * K[1][j] / 3 + 5 * K[2][j] / 2));
          }
        }

        for (j = 0; j < nComp; j++) {
          for (i = 0; i < nComp; i++) {
            K[4][j] = K[4][j] + h * (k[i][j] * (W[i] - 165 * K[0][j] / 64 + 55 * K[1][j] / 6 - 425 * K[2][j] / 64 + 85 * K[3][j] / 96) - k[j][i] * (W[j] - 165 * K[0][j] / 64 + 55 * K[1][j] / 6 - 425 * K[2][j] / 64 + 85 * K[3][j] / 96));
          }
        }

        for (j = 0; j < nComp; j++) {
          for (i = 0; i < nComp; i++) {
            K[5][j] = K[5][j] + h * (k[i][j] * (W[i] + 12 * K[0][j] / 5 - 8 * K[1][j] + 4015 * K[2][j] / 612 - 11 * K[3][j] / 36 + 88 * K[4][j] / 255) - k[j][i] * (W[j] + 12 * K[0][j] / 5 - 8 * K[1][j] + 4015 * K[2][j] / 612 - 11 * K[3][j] / 36 + 88 * K[4][j] / 255));
          }
        }

        for (j = 0; j < nComp; j++) {
          for (i = 0; i < nComp; i++) {
            K[6][j] = K[6][j] + h * (k[i][j] * (W[i] - 8263 * K[0][j] / 15000 + 124 * K[1][j] / 75 - 643 * K[2][j] / 680 - 81 * K[3][j] / 250 + 2484 * K[4][j] / 10625) - k[j][i] * (W[j] - 8263 * K[0][j] / 15000 + 124 * K[1][j] / 75 - 643 * K[2][j] / 680 - 81 * K[3][j] / 250 + 2484 * K[4][j] / 10625));
          }
        }

        for (j = 0; j < nComp; j++) {
          for (i = 0; i < nComp; i++) {
            K[7][j] = K[7][j] + h * (k[i][j] * (W[i] + 3501 * K[0][j] / 1720 - 300 * K[1][j] / 43 + 297275 * K[2][j] / 52632 - 319 * K[3][j] / 2322 + 24068 * K[4][j] / 84065 + 3850 * K[6][j] / 26703) - k[j][i] * (W[j] + 3501 * K[0][j] / 1720 - 300 * K[1][j] / 43 + 297275 * K[2][j] / 52632 - 319 * K[3][j] / 2322 + 24068 * K[4][j] / 84065 + 3850 * K[6][j] / 26703));
          }
        }

        for (j = 0; j < nComp; j++) {
          //t = 0;
          w1 = 13 * K[0][j] / 160 + 2375 * K[2][j] / 5984 + 5 * K[3][j] / 16 + 12 * K[4][j] / 85 + 3 * K[5][j] / 44;
          w2 = 3 * K[0][j] / 40 + 875 * K[2][j] / 2244 + 23 * K[3][j] / 72 + 264 * K[4][j] / 1955 + 125 * K[6][j] / 11592 + 43 * K[7][j] / 616;

          R[j] = Math.abs(w2 - w1) / h;

          if (R[j] <= TOL) {

            tempo[j].push(t);
            x[j].push(W[j]);

            if (j === nComp - 1) {
              t = t + h;
            }
            W[j] = W[j] + w1;

          }
          delta = 0.84 * Math.pow(TOL / R[j], 0.25);

          if (delta <= 0.1) {

            h = 0.1 * h;
          } else if (delta >= 4) {
            h = 4. * h;

          } else {
            h = delta * h;
          }//fim if(delta >=4

          if (h > hMax) {
            h = hMax;
          }

          if (tempo[j].slice(-1)[0] >= b) {
            FLAG = 0;
          } else if ((tempo[j].slice(-1)[0] + h) > b) {
            h = b - tempo[j].slice(-1)[0];
          } else if (h < hMin) {
            FLAG = 0;
            console.log("Excedeu h mínimo!   h = " + h);
          }
        }//fim for(int j=...
        //t = t + h;
        c++;
      }//fim while
    }
    
    for (i = 0; i < nComp; i++) {
      var linha = "";
      for (j = 0; j < (tempo[i].length - 1); j++) {
        linha = linha + tempo[i][j] + "\t" + x[i][j] + "\t";
        graph[i].push({x: tempo[i][j], y: x[i][j]});
      }
      graph[i].label = bloco[i].id;
    }
    return graph;
  } catch (e) {
    console.log(e);
  }
};