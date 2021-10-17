import { Component, OnInit } from "@angular/core";
import { IProduct } from "./IProduct";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html'
})

export class ProductListComponent  implements OnInit{
  pageTitle : string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage : boolean = true;

  private _prodFilter: string = '';
  public get prodFilter(): string {
    return this._prodFilter;
  }
  public set prodFilter(value: string) {
    this._prodFilter = value;
    this.productsFiltered = this.applyFilter(this._prodFilter);

  }
  productsFiltered : IProduct[] = [];

  productList : IProduct[] = [
    {
      productId: 2,
      productName: "Davidson",
      productCode: "DAV-EST-DIGIT",
      releaseDate: "2021-08-06",
      price: 4.5,
      description: "This is a fake",
      starRating: 4,
      imageUrl: "assets/images/xbox-controller.png",
    },
    {
      productId: 4,
      productName: "Coupa",
      productCode: "COUP-IS-Past",
      releaseDate: "2021-01-01",
      price: 1.5,
      description: "This was a fake",
      starRating: 1,
      imageUrl: "assets/images/hammer.png",
    }
  ];

  ngOnInit(): void {
    this.prodFilter = "dav";
  }

  onRatingClicked(message: string): void{
    this.pageTitle = 'Product List: ' + message;
  }

  toggleImage(): void {
     this.showImage = !this.showImage;
  }

  applyFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.productList.filter(prod => prod.productName.toLowerCase().includes(filterBy) );
  }
}
