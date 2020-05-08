import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Observable} from 'rxjs';
import { ForFilterService } from '../for-filter.service';
import { AffichComponent } from '../affich/affich.component';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})
export class FiltreComponent implements OnInit {

  receive: Observable<any>;
  receivevalue: Observable<any>;
 
  private data : string;


  constructor(private service: MyServiceService, private filterService : ForFilterService) { }

  ngOnInit() {
    this.data = localStorage.getItem("val");
    this.receive = this.service.getAllColumnTable(localStorage.getItem("val"));
    console.log('je suis dans le filtre : ' + JSON.stringify(this.filterService.jsonObject));

    this.receivevalue = this.service.getDataFilter(localStorage.getItem("val"),this.filterService.jsonObject);
    console.log("valeur : "+this.receivevalue);
    //this.receivevalue
    let sub = this.receivevalue.subscribe(data =>{
      data.forEach(el => {
        console.log("element : " + el);
      });
      console.log("Parfait : "+ data);
    },
    error =>{
      console.log("Erreur : "+ error);
    }
    );
  }

}
