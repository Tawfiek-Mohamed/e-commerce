import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interface/products/Products';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  // transform(products: Products[], searchValue: string): Products[] {
  //   return products.filter((product) => {
  //     return product.title.toUpperCase().includes(searchValue.toUpperCase());
  //   });
  // }
  transform(products: Products[], searchValue: string): Products[] {
    return products.filter((product) => {
      return product.title.toUpperCase().includes(searchValue.toUpperCase());
    });
  }
}
