import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Complaint} from "../models/complaint";
import {ComplaintService} from "./complaints.service";

@Component({
    selector: 'detailed-view-component',
    templateUrl: './detailedview.component.html',
    styleUrls: ['./detailedview.component.css']
})
export class DetailedViewComponent implements OnInit{

    constructor(private activatedRoute: ActivatedRoute,private complaintService: ComplaintService){}

    complaintId;
    @ViewChild('mMap') mMap;

    complaint:Complaint;
    anonymous:Boolean;

    ngOnInit(){
        this.activatedRoute.params.subscribe((params: Params) => {
            let complaintId = params['id'];
            this.complaintId = complaintId;
            console.log(this.complaintId);

        });
        /*this.complaintService.getComplaint(this.complaintId).subscribe( res => this.complaint = res);*/
        this.complaint = new Complaint(this.complaintId,41.089798,23.544769,'Leaks','Test','anonymous','23-23-23','Unsolved','','askgnakfsjnakjdfgkjandf');
        (this.complaint.complainerType=='anonymous')? this.anonymous = true : this.anonymous=false ;

        this.mMap.zoom=15;
    }
}