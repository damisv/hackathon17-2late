import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import 'hammerjs';

import {AppComponent} from "./app.component";
import {ChartModule} from "angular2-highcharts";
import {HomepageComponent} from "./homepage/homepage.component";
import {routing} from "./app.routing";
import {ComplaintsComponent} from "./complaints/complaints.component";
import {FooterComponent} from "./footer/footer.component";
import {AgmCoreModule} from "@agm/core";
import {DialogMarkerComponent} from "./complaints/dialogmarker.component";
import {FileComplaintComponent} from "./complaints/filecomplaint.component";
import {ComplaintService} from "./complaints/complaints.service";
import {AdminService} from "./administration/admin.service";
import {DetailedViewComponent} from "./complaints/detailedview.component";
import {AdminComponent} from "./administration/admin.component";
import {CitizenComponent} from "./citizen.component";



@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        ComplaintsComponent,
        FileComplaintComponent,
        DetailedViewComponent,
        FooterComponent,
        DialogMarkerComponent,
        AdminComponent,
        CitizenComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCCXhFIl8-1YYMEG7qwaikpOji4r5Mq_mE',
            libraries:['places']
        }),
        ChartModule.forRoot(require('highcharts'),
        require('highcharts/highcharts-3d'),
        require('highcharts/modules/exporting'))
    ],
    providers: [ComplaintService,
            AdminService
        ],
    entryComponents: [
        DialogMarkerComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}