import {Component, ViewChild} from "@angular/core";
import {AdminService} from "./admin.service";
import {isNullOrUndefined} from "util";
import {FormControl} from "@angular/forms";

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
    accountTypes;



    privileges = ['admin','editor'];
    privilegesCtrl;
    filteredPrivileges;

    @ViewChild('tabGroup') tabGroup;

    constructor(private adminService:AdminService){
        this.privilegesCtrl = new FormControl();
        this.filteredPrivileges = this.privilegesCtrl.valueChanges
            .startWith(null)
            .map( privilege => this.filterPrivileges(privilege));
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
            });
        adminService.get("/admin/accountTypes").subscribe(
            res =>{
                this.accountTypes = res.account_types;
            }
        )
    }

    filterPrivileges(privilege){
        return privilege ? this.privileges.filter(s => new RegExp(`^${privilege}`, 'gi').test(s))
            : this.privileges;
    }

   checkthis(id){

   }

    @ViewChild('sidenav') sidenav;

    changeCategory(category){
        this.filterCategory = category;
        this.sidenav.close();
        this.tabGroup.selectedIndex=0;
    }



    createAccountType(typeName){
        this.adminService.post({typeName:typeName},"/createAccountType").subscribe(
            res =>{
                this.accountTypes.push(res.account_type);
            }
        )
    }
    modifyAccountType(index){
        this.adminService.post({account_type:this.accountTypes[index]},"/modifyAccountType").subscribe(
            res=> {
                this.accountTypes[index] = res.account_type;
            }
        )
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