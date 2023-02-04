export class Product {

    public id: number = 0;
    public name: string = '';
    public categoryName: string = '';
    public description: string = '';
    public imageURL: string = '';
    public unitType: string = '';

    public price: number = 0;
    public isActive: boolean = false;
    public createdDate: Date = new Date();
    public lastUpdateDate: Date = new Date();

    public constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}


