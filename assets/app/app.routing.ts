import {RouterModule, Routes} from "@angular/router";

import {AdminComponent} from "./administration/admin.component";
import {CitizenComponent} from "./citizen.component";
import {CITIZEN_ROUTES} from "./citizen.routes";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'citizen', pathMatch: 'full'},
    { path: 'citizen',component: CitizenComponent, children: CITIZEN_ROUTES},
    { path: 'admin', component: AdminComponent}/*
    { path: 'suggestions', component: SuggestionComponent}*/
];

export const routing = RouterModule.forRoot(APP_ROUTES);