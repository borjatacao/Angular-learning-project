import {Component, OnDestroy, OnInit} from "@angular/core";
import {ProductService} from "./product.service";
import {IProduct} from "./iproduct";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './product-list.component.html'
})

export class ProductListComponent  implements OnInit, OnDestroy{
  pageTitle : string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage : boolean = true;

  private _prodFilter: string = '';
  private sub!: Subscription;
  private errorMessage: string = '';

  constructor(private productService: ProductService) {}

  public get prodFilter(): string {
    return this._prodFilter;
  }
  public set prodFilter(value: string) {
    this._prodFilter = value;
    this.filteredProducts = this.applyFilter(this._prodFilter);

  }
  filteredProducts : IProduct[] = [];

  products : IProduct[] = [];

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void{
    this.pageTitle = 'Product List: ' + message;
  }

  toggleImage(): void {
     this.showImage = !this.showImage;
  }

  applyFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter(prod => prod.productName.toLowerCase().includes(filterBy) );
  }
}
