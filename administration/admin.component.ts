import {Component} from "@angular/core";
import {AdminService} from "./admin.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'admin-component',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
    newCategory;
    complaints;
    categories;
    distinctCategories;
    filterCategory = null;
    constructor(private adminService:AdminService){
        adminService.getAllComplaints().subscribe(
            res=>{
                this.complaints = res.complaints;
            }
        );
        adminService.getAllCategories().subscribe(
            res=>{
                this.categories = res.categories;
            }
        );
        adminService.getDistinctCategories().subscribe(
            res =>{
                this.distinctCategories = res.categories;
            })
    }
    addCategory(categoryName){
    this.adminService.addCategory(categoryName).subscribe(
        res =>{
            this.newCategory = res.categoryName;
        })
    }
    removeCategory(index){
        this.adminService.removeCategory(this.categories[index]).subscribe(
            res =>{
                this.categories.splice(index,1);
            })
    }
    removeComplaint(index){
        this.adminService.removeComplaint(this.complaints[index]).subscribe(
            res =>{
                this.complaints.splice(index,1);
            })
    }



    categorySearch(category){
        if(isNullOrUndefined(this.filterCategory))return true;
            return category===this.filterCategory;
    }


}