$(function() {
  Highcharts.setOptions({
    chart: {
      animation: {
        duration: 500
      },
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 0,
      height: 40
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
      enabled: false
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        },
        turboThreshold: 0
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
      height: 400,
      width: 740,
      zoomType: 'x',
      animation: false
    },
    exporting: {
      enabled: true
    },
    tooltip: {
      enabled: true
    },
    scrollbar: {
      enabled: true
    },
    navigator: {
      enabled: true
    },
    rangeSelector: {
      enabled: false
    },
    xAxis: {
      events: {
        setExtremes: function(e) {
          $('.integracao #pt0').val(e.min);
          $('.integracao #pt1').val(e.max);
        }
      }
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
    graph.push({id: dps[i].label, name: dps[i].label, data: dps[i]});
  };
  var chart;
  for (var i = 0; i < graph.length; i++) {
    chart = $('#grafico-container-' + graph[i].id).highcharts({
      chart: {
        margin: [0, 0, 0, 0]
      },
      series: [{
        data: graph[i].data,
        name: graph[i].name,
        showInLegend: false
      }]
    });
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
    name: existingChart.series[0].name
  }, true);
  var dataExtremes = popupChart.xAxis[0].getExtremes();
  popupChart.xAxis[0].setExtremes(dataExtremes.dataMin, dataExtremes.dataMax);
  $('#grafico-resultado .modal-title').html(nome);
  $('#grafico-resultado').modal('show');
}
$(document).on('click', '.grafico-area', function() {
  popUpGraph($('#' + $(this).siblings('.graph').attr('id')).highcharts(), $(this).parents('.bloco').find('.title').html());
});

/* setExtremes */
$(document).on('propertychange keyup input cut paste', '.integracao input', function() {
  $(this).val(function(index, value) {
    return value.replace(',', '.');
  });
  if ($.isNumeric($('.integracao #pt0').val()) === true && $.isNumeric($('.integracao #pt1').val()) === true) {
    var chart = $('#grafico-container').highcharts();
    chart.xAxis[0].setExtremes($('.integracao #pt0').val(), $('.integracao #pt1').val());
  }
});

function resetExtremes() {
  var chart = $('#grafico-container').highcharts();
  var data = chart.xAxis[0].getExtremes();
  chart.xAxis[0].setExtremes(data.dataMin, data.dataMax);
  $('.integracao-soma').html(0);
}

function integracaoAcumulador() {
  var limite_inferior = Number($('.integracao #pt0').val());
  var limite_superior = Number($('.integracao #pt1').val());
  var soma = 0, valor;
  var passo = Number($('#h').val());
  var chart = $('#grafico-container').highcharts();
  var t = limite_inferior;
  while (t <= limite_superior && t >= limite_inferior) {
    soma = soma + getYValue(chart, 1, t);
    t = t + passo;
  }
  $('.integracao-soma').html(soma);
}

function getYValue(chartObj, seriesIndex, xValue) {
  var yValue = null;
  var points = chartObj.series[seriesIndex].points;
  for (var i = 0; i < points.length; i++) {
    if (points[i].x > xValue) {
      break;
    }
    else {
      if (points[i].x === xValue) {
        yValue = points[i].y;
        break;
      }
    }
    yValue = points[i].y;
  }
  return yValue;
}