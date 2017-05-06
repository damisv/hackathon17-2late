import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/homepage', pathMatch: 'full'},
    { path: 'homepage', component: HomepageComponent}/*,
    { path: 'complaints', component: ComplaintsComponent},
    { path: 'suggestions', component: SuggestionComponent}*/
];

export const routing = RouterModule.forRoot(APP_ROUTES);