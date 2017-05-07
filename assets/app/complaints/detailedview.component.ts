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
            this.complaintService.getComplaintById(complaintId).subscribe( res => {
                this.complaint = new Complaint(res.complaint._id,res.complaint.latitude,res.complaint.longitude,
                    res.complaint.category,res.complaint.name,res.complaint.complainerType,res.complaint.dateAdded,
                    res.complaint.status,res.complaint.dateSolved,res.complaint.description,res.complaint.complainer_firstname,
                    res.complaint.complainer_lastname);
            });

            //(this.complaint.complainerType=='anonymous')? this.anonymous = true : this.anonymous=false ;

        });
        this.complaint = new Complaint(this.complaintId,41.089798,23.544769,'Leaks','Test','anonymous','23-23-23','Unsolved','','askgnakfsjnakjdfgkjandf');
        (this.complaint.complainerType=='anonymous')? this.anonymous = true : this.anonymous=false ;

        this.mMap.zoom=15;
    }
}