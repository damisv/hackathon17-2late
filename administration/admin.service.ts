import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class AdminService {
    constructor(private http:Http){}
    getAllComplaints():Observable<any>{
        return this.http.get("/admin/complaints")
            .map(response => response.json());

    }
    getAllCategories():Observable<any>{
        return this.http.get("/admin/categories")
            .map(response => response.json());

    }
    addCategory(categoryName):Observable<any>{
        const body = JSON.stringify({categoryName:categoryName});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('admin/addCategory', body, {headers: headers})
            .map(response => response.json());
    }
    removeCategory(category):Observable<any>{
        const body = JSON.stringify({category:category});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('admin/removeCategory', body, {headers: headers})
            .map(response => response.json());
    }
    removeComplaint(complaint):Observable<any>{
        const body = JSON.stringify({complaint:complaint});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('admin/removeComplaint', body, {headers: headers})
            .map(response => response.json());
    }
    getDistinctCategories():Observable<any>{
        return this.http.get("/admin/getDistinctCategories")
            .map(response => response.json());

    }
}

