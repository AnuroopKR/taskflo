export type CompanyPlan = 'free' | 'pro' | 'enterprise';

export class Company{
    public readonly createdAt: Date;
    public updatedAt: Date;
    constructor(
        public id:string,
        public email:string,
        public name:string,
        public plan?:CompanyPlan,
    ){
        this.name = name.trim(); // Logic: Names shouldn't have trailing spaces
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.validate();
    }

    private validate(){
        if(!this.name||this.name.length<3){
            throw new Error("Company name must be at least 2 characters long.")
        }
    }

    public updatePlan(newPlan:CompanyPlan){
        this.plan=newPlan
    }
}