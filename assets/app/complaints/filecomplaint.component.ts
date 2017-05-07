import {Component, ViewChild, OnInit, ElementRef, NgZone} from "@angular/core";
import {FormControl} from "@angular/forms";

import {AgmMarker, MapsAPILoader, MarkerManager} from '@agm/core';

import {} from '@types/googlemaps';
import {Complaint} from "../models/complaint";
import {ComplaintService} from "./complaints.service";
import {Router} from "@angular/router";


@Component({
    selector: 'file-complaint-component',
    templateUrl: './filecomplaint.component.html',
    styleUrls: ['./filecomplaint.component.css']
})
export class FileComplaintComponent implements OnInit{

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;

    anonymous:Boolean=false;

    complaint:Complaint=new Complaint('',null,null,'','','public','','')

    @ViewChild("search")
    public searchElementRef: ElementRef;

    @ViewChild('mMap') mMap;

    categoryCtrl: FormControl;
    filteredCategories: any;


    categories = [
        'Traffic Lights',
        'Street Lights',
        'Environment',
        'Animals',
        'Garbage',
        'Leaks',
        'City Hall',
        'Shops',
        'Illegalities'
    ];


    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private complaintService: ComplaintService,
        private router: Router,
        private markerManager: MarkerManager
    )
    {

        this.categoryCtrl = new FormControl();
        this.filteredCategories = this.categoryCtrl.valueChanges
            .startWith(null)
            .map( category => this.filterCategories(category));
        this.anonymous=false;
    }

    filterCategories(category: string){
        return category ? this.categories.filter(s => new RegExp(`^${category}`, 'gi').test(s))
            : this.categories;
    }


    onMapClicked(event){
        this.complaint.longitude = event.coords.lng;
        this.complaint.latitude = event.coords.lat;
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

                    this.complaint.latitude = place.geometry.location.lat();
                    this.complaint.longitude = place.geometry.location.lng();
                    this.mMap.zoom = 12;
                });
            });
        });

    }

    fileComplaint(){
        (this.anonymous)? this.complaint.complainerType='anonymous' : this.complaint.complainerType='public';
        console.log(this.complaint);
        this.complaintService.addComplain(this.complaint).subscribe();

        this.router.navigateByUrl('/citizen/complaints');
    }

}