import {Component} from "@angular/core";
import {ComplaintService} from "../complaints/complaints.service";

@Component({
    selector: 'homepage-component',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
    categories = [
        {name:'Traffic Lights',y: 0},
        {name:'Street Lights',y: 0},
        {name:'Environment',y: 0},
        {name:'Animals',y: 0},
        {name:'Garbage',y: 0},
        {name:'Leaks',y: 0},
        {name:'City Hall',y: 0},
        {name:'Shops',y: 0},
        {name:'Illegalities',y: 0}
    ];

    complaintsNumber = 0;
    constructor(private complaintService:ComplaintService) {
        complaintService.getAllComplaints().subscribe(
            res=>{
                this.initPieOptions();
                for(let complaint of res.complaints){
                    let index = this.categories.findIndex(x => x.name==complaint.category);
                    if(index>=0){
                        this.categories[index]["y"]++;
                    }
                    this.complaintsNumber++;
                    this.pieOptions["title"]["text"] = 'Filed Complaints '+this.complaintsNumber;
                }
                for(let category of this.categories){
                    let index = this.pieOptions["series"][0].data.findIndex(x => x.name==category.name);
                    if(index>=0){
                        this.pieOptions["series"][0].data[index].y = category.y;
                    }
                }
            }
        );

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

    initPieOptions(){
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
                text: 'Filed Complaints '+this.complaintsNumber
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
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
                name: 'Complaints Statistics ',
                data: [
                    {name:'Traffic Lights', y:0},
                    {name:'Street Lights', y:0},
                    {
                        name: 'Lights',
                        y: 0,
                        sliced: true,
                        selected: true
                    },
                    {name:'Environment', y:0},
                    {name:'Animals', y:0},
                    {name:'Garbage', y:0},
                    {name:'Leaks', y:0},
                    {name:'City Hall', y:0},
                    {name:'Shops', y:0},
                    {name:'Illegalities', y:0}
                ]
            }]
        };
    }
    pieOptions: Object;
    options: Object;

}