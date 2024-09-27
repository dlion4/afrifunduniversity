/*=========================================================================================
    File Name: bar.js
    Description: Morris bar chart
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Bar chart
// ------------------------------
$(window).on("load", function(){
    //alert('here');
    Morris.Bar({
        element: 'bar-chart',
        data: [{
                y: '2022',
                a: 780,
                b: 420,
                c: 780,
                d: 420
            }, {
                y: '2021',
                a: 540,
                b: 380,
                c: 780,
                d: 420
            }, {
                y: '2020',
                a: 480,
                b: 360,
                c: 780,
                d: 420
            }, {
                y: '2019',
                a: 320,
                b: 390,
                c: 780,
                d: 420
            }, {
                y: '2018',
                a: 320,
                b: 390,
                c: 780,
                d: 420
            }
        ],
        xkey: 'y',
        ykeys: ['a', 'b','c', 'd'],
        labels: ['Ongoing', 'Done','Pending', 'Finalized'],
        barGap: 6,
        barSizeRatio: 0.35,
        smooth: true,
        gridLineColor: '#e3e3e3',
        numLines: 5,
        gridtextSize: 14,
        fillOpacity: 0.4,
        resize: true,
        barColors: ['#ff4657', '#5f6ee8','#ff8d43', '#5bd08c']
    });

    //alert('here');
});