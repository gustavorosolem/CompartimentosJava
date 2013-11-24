$(function() {
  Highcharts.setOptions({
    chart: {
      animation: {
        duration: 500
      },
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 0
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    tooltip: {
      crosshairs: [true],
      enabled: false
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }/*,
        point: {
          events: {
            mouseOver: function() {
              $reporting.html('x: ' + this.x + ', y: ' + this.y);
            }
          }
        },
        events: {
          mouseOut: function() {
            $reporting.empty();
          }
        }*/
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    lang: {
      contextButtonTitle: 'Salvar Gráfico',
      downloadJPEG: 'Download JPG',
      downloadPDF: 'Download PDF',
      downloadPNG: 'Download PNG',
      downloadSVG: 'Download SGV',
      printChart: 'Imprimir gráfico'
    }
  });

  //Popup Zoom
  var popupChart = new Highcharts.Chart({
    chart: {
      renderTo: 'grafico-container',
      height: 250,
      width: 540,
      zoomType: 'x'
    },
    exporting: {
      enabled: true
    },
    tooltip: {
      enabled: true
    },
    series: [{
        data: [],
        showInLegend: false
      }]
  });
});

function gerarGraficos(dps) {
  var graph = [];
  for (var i = 0; i < dps.length; i++) {
    var soma = 0;
    for (var j = 0; j < dps[i].length; j++) {
      soma += dps[i][j].y;
    }
    //graph.push({type: "line", name: dps[i].label, label: soma, showInLegend: true, legendText: dps[i].label, dataPoints: dps[i]});
    graph.push({id: dps[i].label, name: dps[i].label, data: dps[i]});
  };
  var chart;
  for (var i = 0; i < graph.length; i++) {
    chart = $('#grafico-container-' + graph[i].id).highcharts();
    chart.series[0].update({
      data: graph[i].data,
      name: graph[i].name,
      showInLegend: false
    }, true);
  }
}

function popUpGraph(existingChart, nome) {
  var popupChart = $('#grafico-container').highcharts();
  var data = existingChart.series[0].data;
  var newSeries = [];
  for (var i = 0; i < data.length; i++) {
    newSeries.push({x: data[i].x, y: data[i].y});
  }
  popupChart.series[0].update({
    data: newSeries,
    name: existingChart.series[0].name,
    showInLegend: false
  }, true);
  $('#grafico-resultado .modal-title').html(nome);
  $('#grafico-resultado').modal('show');
}
$(document).on('click', '.grafico-area', function() {
  popUpGraph($('#' + $(this).siblings('.graph').attr('id')).highcharts(), $(this).parents('.bloco').find('.title').html());
});