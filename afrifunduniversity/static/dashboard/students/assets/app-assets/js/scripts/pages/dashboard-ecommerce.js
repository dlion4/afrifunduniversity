/*=========================================================================================
    File Name: dashboard-ecommerce.js
    Description: dashboard-ecommerce
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var online=$("#online").val();
var names=$("#unames").val();
var notifications=$("#notifications").val();
var role_id=$("#roleid").val();
var profile=$("#user_profile").val();
var user_mobile=$("#usermobile").val();
var verified=$("#verified").val();

var message="";
if(notifications==1){
  message='Today you got some notifications and messages. Please check it out! ';
}else{
  message='Welcome to HELB Portal ! ';
}

/*****Ready function start*****/
$(document).ready(function(){
  
  //alert(verified + "  " + role_id + "  " + user_mobile); 
           
  
  //alert(user_mobile + '--' + verified);

  $('#statement').DataTable({
    "bFilter": false,
    "bLengthChange": false,
    "bPaginate": false,
    "bInfo": false,
  });
});
/*****Ready function end*****/

/*****Load function start*****/
$(window).on("load",function(){

  //alert('yo');
  //alert(names + '--' + message);

  if(online==0){

    //alert(online);
    // Success Type
    toastr.warning(message, 'Howdy <b>' + names + '</b>!');
  }

  updateNotification();
          
  ////////////////////////////////////////////////////////////////////
    function updateNotification() { 
               
    var base_url = $('#base_url').val(); 
    var user_id=  $('#user_id').val(); 
    var url=base_url + 'account/update_notification/' + user_id ;
            
    //alert(url);
    //////////////////////////////////////////////////////////////////
    $.ajax({
      url: url,
      type:'POST',
      dataType: 'html',
      beforeSend: function(){
        // Replace this with your loading gif image
        //$('#visitors').show();
        //$('#visitors').html('<img src = "<?=base_url(); ?>assets/assets/images/loaders/loader7.gif" class="loaders"/>');
      },
      error: function(){

        $.toast({
          heading: 'Error!',
          text: 'Unable to Load Details. Please try again!. If the problem persists, please contact the administrator.',
          position: 'top-right',
          loaderBg:'#e6b034',
          icon: 'error',
          hideAfter: 3500, 
          stack: 6
        });
      },
      success: function( response ) {
                                
        //alert(response);
        $('#online' ).val(1);
        //$('#visitors').html(response);
      }
    });
                                                   
        return false;                                                       
    } // end readResults  
  
});
/*****Load function* end*****/

$(window).on("load", function(){
    $('#recent-buyers, #new-orders').perfectScrollbar({
        wheelPropagation: true
    });
    
    /********************************************
    *               Monthly Sales               *
    ********************************************/
    Morris.Bar.prototype.fillForSeries = function(i) {
      var color;
      return "0-#fff-#f00:20-#000";
    };

    Morris.Bar({
        element: 'monthly-sales',
        data: [{month: 'Jan', sales: 1835 }, {month: 'Feb', sales: 2356 }, {month: 'Mar', sales: 1459 }, {month: 'Apr', sales: 1289 }, {month: 'May', sales: 1647 }, {month: 'Jun', sales: 2156 }, {month: 'Jul', sales: 1835 }, {month: 'Aug', sales: 2356 }, {month: 'Sep', sales: 1459 }, {month: 'Oct', sales: 1289 }, {month: 'Nov', sales: 1647 }, {month: 'Dec', sales: 2156 }],
        xkey: 'month',
        ykeys: ['sales'],
        labels: ['Sales'],
        barGap: 4,
        barSizeRatio: 0.3,
        gridTextColor: '#bfbfbf',
        gridLineColor: '#E4E7ED',
        numLines: 5,
        gridtextSize: 14,
        resize: true,
        barColors: ['#FF394F'],
        hideHover: 'auto',
    });
    
});
(function(window, document, $) {
    'use strict';    
    /*************************************************
    *               Score Chart                      *
    *************************************************/
    (function () {
      var scoreChart = function scoreChart(id, labelList, series1List) {
        var scoreChart = new Chartist.Line('#' + id, {
          labels: labelList,
          series: [series1List]
        }, {
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 2
          }),
          fullWidth: true,
          chartPadding: {
            right: 25
          },
          series: {
            "series-1": {
              showArea: false
            }
          },
          axisX: {
            showGrid: false
          },
          axisY: {
            labelInterpolationFnc: function labelInterpolationFnc(value) {
              return value / 1000 + 'K';
            },
            scaleMinSpace: 40
          },
          plugins: [Chartist.plugins.tooltip()],
          low: 0,
          showPoint: false,
          height: 300
        });

        scoreChart.on('created', function (data) {
          var defs = data.svg.querySelector('defs') || data.svg.elem('defs');
          var width = data.svg.width();
          var height = data.svg.height();

          var filter = defs.elem('filter', {
            x: 0,
            y: "-10%",
            id: 'shadow' + id
          }, '', true);

          filter.elem('feGaussianBlur', { in: "SourceAlpha",
            stdDeviation: "24",
            result: 'offsetBlur'
          });
          filter.elem('feOffset', {
            dx: "0",
            dy: "32"
          });

          filter.elem('feBlend', { in: "SourceGraphic",
            mode: "multiply"
          });

          defs.elem('linearGradient', {
              id: id + '-gradient',
              x1: 0,
              y1: 0,
              x2: 1,
              y2: 0
          }).elem('stop', {
              offset: 0,
              'stop-color': 'rgba(22, 141, 238, 1)'
          }).parent().elem('stop', {
              offset: 1,
              'stop-color': 'rgba(98, 188, 246, 1)'
          });

          return defs;
        }).on('draw', function (data) {
          if (data.type === 'line') {
            data.element.attr({
              filter: 'url(#shadow' + id + ')'
            });
          } else if (data.type === 'point') {

            var parent = new Chartist.Svg(data.element._node.parentNode);
            parent.elem('line', {
              x1: data.x,
              y1: data.y,
              x2: data.x + 0.01,
              y2: data.y,
              "class": 'ct-point-content'
            });
          }
          if (data.type === 'line' || data.type == 'area') {
            data.element.animate({
              d: {
                begin: 1000 * data.index,
                dur: 1000,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          }
        });
      };

      var DayLabelList = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
      var DaySeries1List = {
        name: "series-1",
        data: [0, 4500, 2600, 6100, 2600, 6500, 3200, 6800]
      };

      var WeekLabelList = ["W1", "W2", "W4", "W5", "W6", "W7", "W8"];
      var WeekSeries1List = {
        name: "series-1",
        data: [77000, 18000, 61000, 26000, 58000, 32000, 70000, 45000]
      };

      var MonthLabelList = ["AUG", "SEP", "OTC", "NOV", "DEC", "JAN", "FEB"];
      var MonthSeries1List = {
        name: "series-1",
        data: [100000, 500000, 300000, 700000, 100000, 200000, 700000, 50000]
      };

      var createChart = function createChart(button) {
        var btn = button || $("#ecommerceChartView .chart-action").find(".active");

        var chartId = btn.attr("href");
        switch (chartId) {
          case "#scoreLineToDay":
            scoreChart("scoreLineToDay", DayLabelList, DaySeries1List);
            break;
          case "#scoreLineToWeek":
            scoreChart("scoreLineToWeek", WeekLabelList, WeekSeries1List);
            break;
          case "#scoreLineToMonth":
            scoreChart("scoreLineToMonth", MonthLabelList, MonthSeries1List);
            break;
        }
      };

      createChart();
      $(".chart-action li a").on("click", function () {
        createChart($(this));
      });
    })();

    /*************************************************
    *               Cost Revenue Stats               *
    *************************************************/
    new Chartist.Line('#cost-revenue', {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        series: [
            [
                {meta:'Revenue', value: 5},
                {meta:'Revenue', value: 3},
                {meta:'Revenue', value: 6},
                {meta:'Revenue', value: 3},
                {meta:'Revenue', value: 8},
                {meta:'Revenue', value: 5},
                {meta:'Revenue', value: 8},
                {meta:'Revenue', value: 12},
                {meta:'Revenue', value: 7},
                {meta:'Revenue', value: 14},
             
            ]
        ]
    }, {
        low: 0,
        high: 18,
        fullWidth: true,
        showArea: true,
        showPoint: true,
        showLabel: false,
        axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0
        },
        axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
        },
        chartPadding: 0,
        plugins: [
            Chartist.plugins.tooltip()
        ]
    }).on('draw', function(data) {
        if (data.type === 'area') {
            data.element.attr({
                'style': 'fill: #28D094; fill-opacity: 0.2'
            });
        }
        if (data.type === 'line') {
            data.element.attr({
                'style': 'fill: transparent; stroke: #28D094; stroke-width: 4px;'
            });
        }
        if (data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
              cx: [data.x], cy:[data.y], r:[7],
            }, 'ct-area-circle');
             data.element.replace(circle);
        }
    });
})(window, document, jQuery);
