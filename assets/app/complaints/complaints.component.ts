import {Component, ViewChild, OnInit, ElementRef, NgZone} from "@angular/core";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {DialogMarkerComponent} from "./dialogmarker.component";
import {FormControl} from "@angular/forms";

import { MapsAPILoader } from '@agm/core';

import {} from '@types/googlemaps';



@Component({
    selector: 'complaints-component',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit{

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;

    @ViewChild("search")
    public searchElementRef: ElementRef;



    complaints=[
        {lat: 41.089798, lng:23.544769,category: 'Street bump'},
        {lat: 41.089738, lng:23.542739,category: 'Lights'},
        {lat: 41.089718, lng:23.546029,category: 'Garbage'},
        {lat: 41.089708, lng:23.546119,category: 'Street bump'},
        {lat: 41.089728, lng:23.540749,category: 'Street bump'},
        {lat: 41.089778, lng:23.544789,category: 'Street bump'},
    ];

    @ViewChild('mMap') mMap;

    marker:any;

    selectedOption: string;

    constructor(
            public dialog: MdDialog,
            private mapsAPILoader: MapsAPILoader,
            private ngZone: NgZone)
    {}

    openDialog(complaint) {

        const config = new MdDialogConfig();
        config.data = complaint;
        let dialogRef = this.dialog.open(DialogMarkerComponent,config);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        });
    }

    onMapClicked(event){
        this.complaints.push({lat:event.coords.lat,lng:event.coords.lng,category:'new marker'});
        /*this.marker = new AgmMarker(this._markerManager);
        this.marker.latitude = event.coords.lat;
        this.marker.longitude = event.coords.lng;
        this.mMap.addMarker(this.marker);*/
    }


    ngOnInit(){
        this.mMap.zoom=15;

        this.latitude = 41.089798;
        this.longitude = 23.546779;

        //create search FormControl
        this.searchControl = new FormControl();


        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.mMap.zoom = 12;
                });
            });
        });

    }
}