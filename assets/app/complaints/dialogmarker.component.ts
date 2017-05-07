import {Component, OnInit, Inject, Optional} from "@angular/core";
import {MD_DIALOG_DATA,MdDialogRef} from "@angular/material";
import {Router} from "@angular/router";
import {Complaint} from "../models/complaint";


@Component({
    selector: 'dialog-marker-component',
    template: `        
        <div md-dialog-title>{{ complaint?.name}}</div>
        <div md-dialog-content>
           <ul>
               <li> Category: {{ complaint?.category }}</li>
               <li>Longitude: {{ complaint?.longitude}}</li>
               <li>Latitude: {{ complaint?.latitude}}</li>
           </ul>
        </div>
        <div md-dialog-actions>
            <button md-button (click)="dialogRef.close()">Return to map</button>
            <button md-button (click)="viewComplaint()">Detailed View</button>
            <button style="margin: auto;" md-mini-fab color="warn"><md-icon>report</md-icon></button>
            <button style="margin: auto;" md-mini-fab color="primary"><md-icon>thumb_up</md-icon></button>
        </div>
    `
})
export class DialogMarkerComponent implements OnInit {

    complaint:Complaint;

    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
        public dialogRef: MdDialogRef<DialogMarkerComponent>,
        public router: Router
    ) {}

    viewComplaint(){
        console.log(this.complaint._id);
        this.router.navigateByUrl('/citizen/detailed/'+this.complaint._id);
        this.dialogRef.close();
    }

    reportComplaint(){
        this.router.navigateByUrl('/homepage');
        this.dialogRef.close();
    }

    ngOnInit(){
        this.complaint = this.dialogData;
        console.log(this.complaint);
    }
}