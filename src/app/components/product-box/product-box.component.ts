
import { Component } from '@angular/core';
import { Firestore, collectionData, collection, query, orderBy} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss'],
})
export class ProductBoxComponent {

  products!: Observable<Product[]>;
  constructor(private firestore: Firestore) {
    this.getData();
  }
  getData(){
    const collectionInstance = collection(this.firestore,'products');
    const q = query(collectionInstance, orderBy("timestamp","desc"));
    

    collectionData(q).subscribe(val => {
      console.log(val);
    })

    this.products = collectionData(q);
  }
}
