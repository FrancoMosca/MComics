import { Timestamp } from "@angular/fire/firestore";

export interface Product {
    brand?: string;
    imgUrl?: string;
    name?: string,
    price?: string;
    timestamp?:Timestamp;
  };
  