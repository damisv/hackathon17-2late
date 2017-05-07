import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class ComplaintService {
    constructor(private http: Http) {
    }

    getAllComplaints(): Observable<any> {
        return this.http.get("/complaints/all")
            .map(response => response.json());

    }

    addComplain(complain):Observable<any>{
        const body = JSON.stringify({complain:complain});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('complaints/one', body, {headers: headers})
            .map(response => response.json());
    }
}
