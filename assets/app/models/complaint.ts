export class Complaint{
    constructor(public latitude: Number,
                public longitude: Number,
                public category: String,
                public name: String,
                public complainerType: String,
                public dateAdded: String,
                public status: String,
                public dateSolved?:String,
                public description?:String,
                public complainer_firstname?: String,
                public complainer_lastname?: String,
    ) {}
}