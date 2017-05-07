import {HomepageComponent} from "./homepage/homepage.component";
import {ComplaintsComponent} from "./complaints/complaints.component";
import {FileComplaintComponent} from "./complaints/filecomplaint.component";
import {DetailedViewComponent} from "./complaints/detailedview.component";

import {Routes} from "@angular/router";


export const CITIZEN_ROUTES: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full'},
    { path: 'homepage', component: HomepageComponent},
    { path: 'file', component: FileComplaintComponent},
    { path: 'detailed',redirectTo: 'complaints', pathMatch: 'full'},
    { path: 'complaints', component: ComplaintsComponent},
    { path: 'detailed/:id', component: DetailedViewComponent},
];