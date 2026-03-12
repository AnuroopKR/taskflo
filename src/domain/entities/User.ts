export type RoleType = "ADMIN" | "EMPLOYEE";
export class User {
  public readonly createdAt: Date;
  public updatedAt: Date;
  constructor(
    public id: string,
    public companyId: string,
    public name: string,
    public email: string,
    public role: RoleType,
    public password?: string,
  ) {
    this.name = name.trim(); // Logic: Names shouldn't have trailing spaces
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.validate();
  }

  private validate() {
    if (!this.name || this.name.length < 3) {
      throw new Error("Company name must be at least 2 characters long.");
    }
    if (!this.email) {
      throw new Error("Email is mandatory.");
    }
  }
}
