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
                this.distinctCategories.push("all");
                this.filterCategory = "all";
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
        if(isNullOrUndefined(this.filterCategory) || this.filterCategory=="all")return true;
            return category===this.filterCategory;
    }

    deleteFilteredComplaints() {
        let category = this.filterCategory;
        if (this.filterCategory == "all") {
            this.adminService.removeAllComplaints().subscribe(
                res => {
                    this.complaints = [];
                    this.distinctCategories = [];
                    this.distinctCategories.push("all");
                }
            )
        } else {
            this.adminService.removeComplaintsOfCategory(category).subscribe(
                res => {
                    let index = 0;
                    for (let complaint of this.complaints) {
                        if (complaint.category == res.category || res.category == "") {
                            this.complaints.splice(index, 1);
                        }
                        index++;
                    }
                    if (res.category == "") {
                        this.distinctCategories = [];
                        this.distinctCategories.push("all");
                    } else {
                        index = this.distinctCategories.indexOf(res.category);
                        this.distinctCategories.splice(index, 1);
                        this.filterCategory = "all";
                    }

                }
            );
        }
    }

}