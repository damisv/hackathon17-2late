import {Component} from "@angular/core";

@Component({
    selector: 'homepage-component',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
    constructor() {
        this.pieOptions = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Filed Complaints \'17'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Complaints Statistics \'17 ',
                data: [
                    ['Shops', 45.0],
                    ['Environment', 26.8],
                    {
                        name: 'Lights',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Garbages', 8.5],
                    ['Road Lights', 6.2],
                    ['Others', 0.7]
                ]
            }]
        };

        this.options = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Monthly filed complaints'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'No. of filed complaints'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                name: '2016',
                marker: {
                    symbol: 'square'
                },
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                    y: 26.5,
                    marker: {
                        symbol: ''
                    }
                }, 23.3, 18.2, 13.9, 9.6]

            }, {
                name: '2017',
                marker: {
                    symbol: 'diamond'
                },
                data: [{
                    y: 3.9,
                    marker: {
                        symbol: ''
                    }
                }, 4.2, 5.7, 8.5, 9.9, 11.2, 10.8, 10.6, 9.2, 8.3, 6.6, 6.5]
            }]
        };
    }

    pieOptions: Object;
    options: Object;

}