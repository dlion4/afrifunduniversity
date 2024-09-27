/*=========================================================================================
    File Name: card-ecommerce.js
    Description: intialize advance ecommerce cards
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Version: 1.0
    Author: Pixinvent
    Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
    var chart_data   = [],
    datapoints='';
    
        
        function readChart(dc_code){
                    //alert('yo');
                    //alert(base_url + '-' + VendAccountNum + '-' + f_year);
                    //Declare variables
                    var base_url = $('#base_url').val(); 
                    var url='',                                               
                    url=base_url + "account/getCollections/" + $.trim(dc_code);
                    //alert(url);
                    ////////////////////////////////////////////////////////////////////        
                    $.ajax({
                        url: url,
                        type:'GET',
                        dataType: 'json',
                        beforeSend: function(){
                            // Replace this with your loading gif image
                            //$('html, body').animate({scrollTop: $(".message").offset().top-100}, 150);
                            //$('.message').show();
                           // $('.message').fadeIn('slow').removeClass('alert-info').addClass('alert alert-danger').
                            //html('<p><img src = "' + base_url +'assets/assets/images/loaders/loader7.gif" class="loaders"/>'
                               // + '<span style="font-weight: bold; padding-left: 1em;font-size: 12px;">Please Wait ......!</span></p>');
                            //$('html, body').animate({scrollTop: $('section').offset().top}, 100);
                            //$(".btn").attr("disabled", true);
                        },
                        error: function(){
                            //$('.message').fadeOut('slow');
                            //$('.message').fadeIn('slow').removeClass('alert-info').addClass('alert alert-danger');
                            //$('.message').html('<strong><h5><i class="fa fa-warning"></i> Error!</h5></strong> Unable to complete your request. Please try again!. If the problem persists, please contact the administrator');
                            //$(".btn").removeAttr("disabled");
                        },
                        success: function( result ) {
                            //alert(result);
                            var jsonData=result;
                            //alert(chart_data);
                            
                            $.each(jsonData,function(i,jsonData){
                                //alert(jsonData.name);
                                chart_data.push({
                                    value: jsonData.value,
                                    name: jsonData.name
                                });
                            });

                            /********************************
                            *       Monthly Sales           *
                            ********************************/
                            // Set paths
                            // ------------------------------   
                            url=base_url + 'assets/';
                            //alert(url);

                            require.config({
                                paths: {
                                    echarts: url + 'app-assets/vendors/js/charts/echarts'
                                }
                            });


                            // Configuration
                            // ------------------------------

                            require(
                                [
                                    'echarts',
                                    'echarts/chart/pie',
                                    'echarts/chart/funnel'
                                ],


                                // Charts setup
                                function (ec) {
                                    /****************************************
                                    *              Monthly Sales            *
                                    ****************************************/
                                    // Initialize chart
                                    // ------------------------------
                                    $('#nightingale-rose-labels2').remove(); // this is my <canvas> element
                                    $('#graph-container').append('<div id="nightingale-rose-labels2" class="height-400 echart-container"></div>');
                                    $('#nightingale-rose-labels2').empty();
                                    //$('#nightingale-rose-labels2').empty();
                                    var myChart = ec.init(document.getElementById('nightingale-rose-labels2'));
                                    //myChart.destroy();
                                    //alert(myChart);

                                    // Chart Options
                                    // ------------------------------
                                    //var chartOptions='';
                                    var chartOptions= {

                                        // Add title
                                        title: {
                                            text: 'Collections Distribution',
                                            subtext: 'on monthly basis',
                                            x: 'center',
                                            textStyle: {
                                                color: '#FFF'
                                            },
                                            subtextStyle: {
                                                color: '#FFF'
                                            }
                                        },

                                        // Add tooltip
                                        tooltip: {
                                            trigger: 'item',
                                            formatter: "{a} <br/>{b}: +{c} ({d}%)"
                                        },


                                        color: ['#ffd775', '#ff847c', '#e84a5f', '#2a363b', '#7fd5c3', '#61a781', '#f0c75e', '#df8c7d', '#e8ed8a', '#55bcbb', '#e974b9', '#2f9395'],


                                        // Display toolbox
                                        toolbox: {
                                            show: true,
                                            orient: 'vertical',
                                            feature: {
                                                mark: {
                                                    show: false,
                                                    title: {
                                                        mark: 'Markline switch',
                                                        markUndo: 'Undo markline',
                                                        markClear: 'Clear markline'
                                                    }
                                                },
                                                dataView: {
                                                    show: true,
                                                    readOnly: false,
                                                    title: 'View data',
                                                    lang: ['View chart data', 'Close', 'Update']
                                                },
                                                magicType: {
                                                    show: true,
                                                    title: {
                                                        pie: 'Switch to pies',
                                                        funnel: 'Switch to funnel',
                                                    },
                                                    type: ['pie', 'funnel']
                                                },
                                                restore: {
                                                    show: true,
                                                    title: 'Restore'
                                                },
                                                saveAsImage: {
                                                    show: true,
                                                    title: 'Same as image',
                                                    lang: ['Save']
                                                }
                                            },
                                            color: '#FFF'
                                        },

                                        // Enable drag recalculate
                                        calculable: true,

                                        // Add series
                                        series: [
                                            {
                                                name: 'Increase (Collections)',
                                                type: 'pie',
                                                radius: ['15%', '73%'],
                                                center: ['50%', '57%'],
                                                roseType: 'area',

                                                itemStyle: {
                                                    normal: {
                                                        label: {
                                                            textStyle: {
                                                                color: '#FFF'
                                                            }
                                                        },
                                                        labelLine: {
                                                            lineStyle: {
                                                                color: '#FFF'
                                                            }
                                                        }
                                                    }
                                                },

                                                // Funnel
                                                width: '40%',
                                                height: '78%',
                                                x: '30%',
                                                y: '17.5%',
                                                max: 450,
                                                sort: 'ascending',
                                                data: chart_data,
                                            }
                                        ]
                                    };

                                    //alert(chart_data)

                                    // Apply options
                                    // ------------------------------

                                    myChart.setOption(chartOptions); 
                                    chart_data.splice(0, chart_data.length); //Clear array

                                    // Resize chart
                                    // ------------------------------

                                    $(function () {

                                        // Resize chart on menu width change and window resize
                                        $(window).on('resize', resize);
                                        $(".menu-toggle").on('click', resize);

                                        // Resize function
                                        function resize() {
                                            setTimeout(function() {

                                                // Resize chart
                                                myChart.resize();
                                            }, 200);
                                        }
                                    });
                                }

                            );


                            //alert( chart_data[0].value + ' ' + chart_data[0].name);
                            $('.message').hide();
                            
                        }
                            
                });

               // alert(chart_data);
}



(function(window, document, $) {
    'use strict';

    var base_url = $('#base_url').val();
    var url=base_url + 'assets/';
    //alert(url);
    /********************************
    *       Monthly Sales           *
    ********************************/
    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: url + 'app-assets/vendors/js/charts/echarts'
        }
    });


    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/funnel'
        ],


        // Charts setup
        function (ec) {
            /****************************************
            *              Monthly Sales            *
            ****************************************/
            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('nightingale-rose-labels2'));

            // Chart Options
            // ------------------------------
            var chartOptions = {

                // Add title
                title: {
                    text: 'Applicants Distribution',
                    subtext: 'on monthly basis',
                    x: 'center',
                    textStyle: {
                        color: '#FFF'
                    },
                    subtextStyle: {
                        color: '#FFF'
                    }
                },

                // Add tooltip
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: +{c}$ ({d}%)"
                },


                color: ['#ffd775', '#ff847c', '#e84a5f', '#2a363b', '#7fd5c3', '#61a781', '#f0c75e', '#df8c7d', '#e8ed8a', '#55bcbb', '#e974b9', '#2f9395'],


                // Display toolbox
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        mark: {
                            show: true,
                            title: {
                                mark: 'Markline switch',
                                markUndo: 'Undo markline',
                                markClear: 'Clear markline'
                            }
                        },
                        dataView: {
                            show: true,
                            readOnly: false,
                            title: 'View data',
                            lang: ['View chart data', 'Close', 'Update']
                        },
                        magicType: {
                            show: true,
                            title: {
                                pie: 'Switch to pies',
                                funnel: 'Switch to funnel',
                            },
                            type: ['pie', 'funnel']
                        },
                        restore: {
                            show: true,
                            title: 'Restore'
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Same as image',
                            lang: ['Save']
                        }
                    },
                    color: '#FFF'
                },

                // Enable drag recalculate
                calculable: true,

                // Add series
                series: [
                    {
                        name: 'Increase (Applicants)',
                        type: 'pie',
                        radius: ['15%', '73%'],
                        center: ['50%', '57%'],
                        roseType: 'area',

                        itemStyle: {
                            normal: {
                                label: {
                                    textStyle: {
                                        color: '#FFF'
                                    }
                                },
                                labelLine: {
                                    lineStyle: {
                                        color: '#FFF'
                                    }
                                }
                            }
                        },

                        // Funnel
                        width: '40%',
                        height: '78%',
                        x: '30%',
                        y: '17.5%',
                        max: 450,
                        sort: 'ascending',

                        data: [chart_data],
                    }
                ]
            };

            // Apply options
            // ------------------------------

            myChart.setOption(chartOptions);


            // Resize chart
            // ------------------------------

            $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".menu-toggle").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        myChart.resize();
                    }, 200);
                }
            });


            /************************************
            *       Top Selling Categories      *
            ************************************/

            // Initialize chart
            // ------------------------------
            var topCategoryChart = ec.init(document.getElementById('doughnut'));

            // Chart Options
            // ------------------------------
            var topCategoryChartOptions = {

                // Add title
                title: {
                    text: 'Top 5 Categories',
                    subtext: 'Top selling mobiles',
                    x: 'center',
                    textStyle: {
                        color: '#FFF'
                    },
                    subtextStyle: {
                        color: '#FFF'
                    }
                },

                // Add legend
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['Moto Z', 'Galaxy S7 Edge', 'One Plus 3', 'Mi 5', 'iPhone 6s'],
                    textStyle: {
                        color: '#FFF'
                    },
                },

                // Add custom colors
                color: ['#ffd322', '#ffa422', '#e89805', '#ffc107', '#fff306'],

                // Display toolbox
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        mark: {
                            show: true,
                            title: {
                                mark: 'Markline switch',
                                markUndo: 'Undo markline',
                                markClear: 'Clear markline'
                            }
                        },
                        dataView: {
                            show: true,
                            readOnly: false,
                            title: 'View data',
                            lang: ['View chart data', 'Close', 'Update']
                        },
                        magicType: {
                            show: true,
                            title: {
                                pie: 'Switch to pies',
                                funnel: 'Switch to funnel',
                            },
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    y: '20%',
                                    width: '50%',
                                    height: '70%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore: {
                            show: true,
                            title: 'Restore'
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Same as image',
                            lang: ['Save']
                        }
                    },
                    color: '#FFF'
                },

                // Enable drag recalculate
                calculable: true,

                // Add series
                series: [
                    {
                        name: 'Top Categories',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center: ['50%', '57.5%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#FFF'
                                    }
                                },
                                labelLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#FFF'
                                    }
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    formatter: '{b}' + '\n\n' + '{c} ({d}%)',
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '17',
                                        fontWeight: '500'
                                    }
                                }
                            }
                        },

                        data: [
                            {value: 335, name: 'Moto Z'},
                            {value: 618, name: 'Galaxy S7 Edge'},
                            {value: 234, name: 'One Plus 3'},
                            {value: 135, name: 'Mi 5'},
                            {value: 956, name: 'iPhone 6s'}
                        ]
                    }
                ]
            };

            // Apply options
            // ------------------------------

            topCategoryChart.setOption(topCategoryChartOptions);


            // Resize chart
            // ------------------------------

            $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".menu-toggle").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        topCategoryChart.resize();
                    }, 200);
                }
            });


            /************************************
            *       Customer Browser Stats      *
            ************************************/
            // Initialize chart
            // ------------------------------
            var customerBrowerChart = ec.init(document.getElementById('timeline'));

            var idx = 1;

            // Chart Options
            // ------------------------------
            var customBrowerChartOptions = {

                // Add timeline
                timeline: {
                    x: 10,
                    x2: 10,
                    data: [
                        '2014-01-01', '2014-02-01', '2014-03-01', '2014-04-01', '2014-05-01',
                        { name:'2014-06-01', symbol: 'emptyStar2', symbolSize: 8 },
                        '2014-07-01', '2014-08-01', '2014-09-01', '2014-10-01', '2014-11-01',
                        { name:'2014-12-01', symbol: 'star2', symbolSize: 8 }
                    ],
                    label: {
                        formatter: function(s) {
                            return s.slice(0, 7);
                        },
                        textStyle: {
                            color: '#FFF'
                        },
                    },
                    checkpointStyle: {
                        color: '#6C5B7B',
                        borderColor: '#FFF',
                        label: {
                            // show: false,
                            textStyle: {
                                color: '#FFF'
                            }
                        }
                    },
                    controlStyle: {
                        normal: {
                            color: '#FFF'
                        },
                    },
                    lineStyle: {
                        color: '#FFF',
                        width: 1,
                        type: 'dashed'
                    },
                    autoPlay: true,
                    playInterval: 3000,
                },

                // Set options
                options: [
                    {

                        // Add title
                        title: {
                            text: 'Browser statistics',
                            subtext: 'Based on shared research',
                            x: 'center',
                            textStyle: {
                                color: '#FFF'
                            },
                            subtextStyle: {
                                color: '#FFF'
                            }
                        },

                        // Add tooltip
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },

                        // Add legend
                        legend: {
                            x: 'left',
                            orient: 'vertical',
                            data: ['Chrome','Firefox','Safari','IE9+','IE8-'],
                            textStyle: {
                                color: '#FFF'
                            },
                        },

                        // Add custom colors
                        color: ['#FECEA8', '#FF847C', '#F8AC6F','#6C5B7B', '#99B898'],

                        // Display toolbox
                        toolbox: {
                            show: true,
                            orient: 'vertical',
                            feature: {
                                mark: {
                                    show: true,
                                    title: {
                                        mark: 'Markline switch',
                                        markUndo: 'Undo markline',
                                        markClear: 'Clear markline'
                                    }
                                },
                                dataView: {
                                    show: true,
                                    readOnly: false,
                                    title: 'View data',
                                    lang: ['View chart data', 'Close', 'Update']
                                },
                                magicType: {
                                    show: true,
                                    title: {
                                        pie: 'Switch to pies',
                                        funnel: 'Switch to funnel',
                                    },
                                    type: ['pie', 'funnel'],
                                    option: {
                                        funnel: {
                                            x: '25%',
                                            width: '50%',
                                            funnelAlign: 'left',
                                            max: 1700
                                        }
                                    }
                                },
                                restore: {
                                    show: true,
                                    title: 'Restore'
                                },
                                saveAsImage: {
                                    show: true,
                                    title: 'Same as image',
                                    lang: ['Save']
                                }
                            },
                            color: "#FFF"
                        },

                        // Add series
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            center: ['50%', '50%'],
                            radius: '60%',
                            data: [
                                {value: idx * 128 + 80, name: 'Chrome'},
                                {value: idx * 64 + 160, name: 'Firefox'},
                                {value: idx * 32 + 320, name: 'Safari'},
                                {value: idx * 16 + 640, name: 'IE9+'},
                                {value: idx++ * 8 + 1280, name: 'IE8-'}
                            ],
                            itemStyle: {
                                normal: {
                                    label: {
                                        textStyle: {
                                            color: '#FFF'
                                        }
                                    },
                                    labelLine: {
                                        lineStyle: {
                                            color: '#FFF'
                                        }
                                    }
                                }
                            },
                        }]
                    },

                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    },
                    {
                        series: [{
                            name: 'Browser',
                            type: 'pie',
                            data: [
                                {value: idx * 128 + 80,  name:'Chrome'},
                                {value: idx * 64  + 160,  name:'Firefox'},
                                {value: idx * 32  + 320,  name:'Safari'},
                                {value: idx * 16  + 640,  name:'IE9+'},
                                {value: idx++ * 8  + 1280, name:'IE8-'}
                            ]
                        }]
                    }
                ]
            };

            // Apply options
            // ------------------------------

            customerBrowerChart.setOption(customBrowerChartOptions);


            // Resize chart
            // ------------------------------

            $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".menu-toggle").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        customerBrowerChart.resize();
                    }, 200);
                }
            });
        }

    );

})(window, document, jQuery);