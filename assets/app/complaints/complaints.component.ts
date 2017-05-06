import {Component, ViewChild, OnInit} from "@angular/core";
import {AgmMarker, MarkerManager} from "@agm/core";
import {coerceToNumber} from "@angular/material/typings/grid-list/grid-list-measure";

@Component({
    selector: 'complaints-component',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit{

    lat: number = 41.089798;
    lng: number = 23.546779;


    complaints=[
        {lat: 41.089798, lng:23.544769,name: 'Street bump'},
        {lat: 41.089738, lng:23.542739,name: 'Lights'},
        {lat: 41.089718, lng:23.546029,name: 'Garbage'},
        {lat: 41.089708, lng:23.546119,name: 'Street bump'},
        {lat: 41.089728, lng:23.540749,name: 'Street bump'},
        {lat: 41.089778, lng:23.544789,name: 'Street bump'},
    ];

    @ViewChild('mMap') mMap;
    marker: AgmMarker;

    constructor(){
    }

    onMapClicked(event){
        this.complaints.push({lat:event.coords.lat,lng:event.coords.lng,name:'new marker'});
        /*this.marker = new AgmMarker(this._markerManager);
        this.marker.latitude = event.coords.lat;
        this.marker.longitude = event.coords.lng;
        this.mMap.addMarker(this.marker);*/
    }

    ngOnInit(){
        this.mMap.zoom=15;

    }
}