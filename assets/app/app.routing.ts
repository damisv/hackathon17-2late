import {RouterModule, Routes} from "@angular/router";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);