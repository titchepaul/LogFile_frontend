import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ForFilterService } from '../for-filter.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-affich',
  templateUrl: './affich.component.html',
  styleUrls: ['./affich.component.css'],
})
export class AffichComponent implements OnInit {
  private receive: Object[];
  private receivedata: Object[];
  private receivevalue: Object[];
  private colInfo: Observable<any>;
  private colInfo2 = [];
  private counter: Object[];
  private myCounter: number;
  private flag: number;
  // public share : Observable<any>;
  myForm: FormGroup;
  formgroupobject = {};

  private t = new Array();
  private map = new Map();
  private js_map = new Map();
  private up: string;
  private str_1: string;
  private str_2: string;
  private up_1: string;
  private up_2: string;


  constructor(
    private service: MyServiceService,
    private filterService: ForFilterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  data: string;

  ngOnInit() {
    // if (this.service.name != null) {
    //  localStorage.setItem("val", this.service.name);
    // }
    // this.isValid = true;
    // this.data = localStorage.getItem("val");

    // this.counter = this.service.getNumber;
    const url = this.router.url;
    this.data = url.substring(url.lastIndexOf('/')).replace('/','');
    localStorage.setItem('val', this.data);
    // console.log("number "+ this.service.getNumber.length);
    /*this.service.getTotalRows(this.data).toPromise().then(
      data => this.counter = data as number
    );*/
    this.service.getTotalRows(localStorage.getItem('val')).toPromise().then(
      data => this.counter = data as any[]
    );
    this.colInfo = this.service.getInfoColumsTable(localStorage.getItem('val'));

    this.service.getInfoColumsTable(localStorage.getItem('val')).toPromise().then(
              data => {this.colInfo2 = data as any[];}
        );
    this.service.getAllColumnTable(localStorage.getItem('val')).toPromise().then(
             data => this.receive = data as Object[]
        );
    this.service.getDataInTableByRows(localStorage.getItem('val')).toPromise().then(
             data => this.receivedata = data as Object[]
        );
          /*this.service.getValueTable(localStorage.getItem("val")).toPromise().then(
             data => this.receivevalue = data as Object[]
          );*/

        // tslint:disable-next-line: prefer-const
    let subscription = this.colInfo.subscribe((data) => {
            const formgroupobject = {};
           // console.log('myData : '+  JSON.stringify(this.colInfo2));
            data.forEach((el) => {
              formgroupobject[el.name] = new FormControl('', [Validators.required]);
              // console.log('elem : '+ JSON.stringify(el));
              if (el.type === 'datetime') {
                formgroupobject[el.name + 'Sign'] = new FormControl('', [
                  Validators.required,
                ]);
              }
            });
            this.myForm = new FormGroup(formgroupobject);
            console.log('okkkk');
          });

    // this.counter = this.counter - 10;
    this.flag = 1;
    console.log('value :' + this.counter);
    console.log('receive : ' + localStorage.getItem('val'));
    this.clearFilter();

  }
  next() {
    console.log('next '+ this.counter);
    // this.myCounter = this.counter as unknown as number;
    console.log('count next '+ this.myCounter);
    if (this.flag === 1) {
      this.myCounter = this.counter as unknown as number;
      this.flag ++;
      this.myCounter  = this.myCounter - 2000;     // x2
      if (this.myCounter >= 0) {
        // this.myCounter  = this.myCounter -20;
        this.js_map.set('value', this.myCounter);
        console.log('next counter ' + this.myCounter.toString());
        this.js_map.forEach((value, key) => {
          this.service.jsObject[key] = value;
        });
        this.service.getDataInTableRowsOnly(localStorage.getItem('val'), this.service.jsObject).toPromise().then(
          data => this.receivedata = data as Object[]
        );
      } else {
        this.myCounter = 0;
        this.js_map.set('value', this.myCounter);
        console.log('next counter ' + this.myCounter.toString());
        this.js_map.forEach((value, key) => {
          this.service.jsObject[key] = value;
        });
        this.service.getDataInTableRowsOnly(localStorage.getItem('val'), this.service.jsObject).toPromise().then(
          data => this.receivedata = data as Object[]
        );
      }
    } else {
      this.myCounter = this.myCounter - 1000;
      if (this.myCounter > 0) {
        // this.myCounter = this.myCounter -10;
        this.js_map.set('value', this.myCounter);
        this.js_map.forEach((value, key) => {
          this.service.jsObject[key] = value;
        });
        this.service.getDataInTableRowsOnly(localStorage.getItem('val'), this.service.jsObject).toPromise().then(
          data => this.receivedata = data as Object[]
        );
      } else {
        this.myCounter = 0;
        this.js_map.set('value', this.myCounter);
        this.js_map.forEach((value, key) => {
          this.service.jsObject[key] = value;
        });
        this.service.getDataInTableRowsOnly(localStorage.getItem('val'), this.service.jsObject).toPromise().then(
          data => this.receivedata = data as Object[]
        );
      }
    }
  }
  dataFilter() {
    /*this.map = new Map();
    this.filterService.jsonObject = {};
    this.isValid = false;
    let sub = this.colInfo.subscribe((data) => {
      data.forEach((el) => {
        if (el.type === "datetime") {
          this.up = el.name;
          this.up_1 = this.myForm.get(this.up + "").value;
          this.up_2 = this.myForm.get(this.up + "Sign").value;
          this.str_1 = el.name;
          this.str_2 = this.up_2 + this.up_1;
          if (this.up_1 != "" && this.up_2 != "") {
            console.log("name: " + this.str_1);
            console.log("mes ups: " + this.str_2);
            this.map.set(this.str_1, this.str_2);
          }
        } else {
          this.up = el.name;
          this.up_1 = this.myForm.get(this.up + "").value;
          if (this.up_1 != "") {
            this.map.set(this.up, this.up_1);
            console.log("n fois : ");
          }
        }
        this.map.forEach((value, key) => {
          this.filterService.jsonObject[key] = value;
        });
      });
      if(!(Object.keys(this.filterService.jsonObject).length === 0)){
        //this.receivevalue = this.service.getDataFilter(localStorage.getItem("val"),this.filterService.jsonObject);
        this.service.getDataFilter(localStorage.getItem("val"),this.filterService.jsonObject).toPromise().then(
          data => this.receivevalue = data as Object[]
       );
        console.log("pour le filtre");
        this.router.navigate(["affich"]);
      }
    });*/
    this.map = new Map();
    this.filterService.jsonObject = {};
    const sub = this.colInfo2.map(el => {
      if (el.type === 'datetime') {
        this.up = el.name;
        this.up_1 = this.myForm.get(this.up + '').value;
        this.up_2 = this.myForm.get(this.up + 'Sign').value;
        this.str_1 = el.name;
        this.str_2 = this.up_2 + this.up_1;
        if (this.up_1 != '' && this.up_2 != '') {
          console.log('name: ' + this.str_1);
          console.log('mes ups: ' + this.str_2);
          this.map.set(this.str_1, this.str_2);
        }
      } else {
        this.up = el.name;
        this.up_1 = this.myForm.get(this.up + '').value;
        if (this.up_1 != '') {
          this.map.set(this.up, this.up_1);
          console.log('n fois : ');
        }
      }
      this.map.forEach((value, key) => {
        this.filterService.jsonObject[key] = value;
      });
    });
    if (!(Object.keys(this.filterService.jsonObject).length === 0)) {
      // this.receivevalue = this.service.getDataFilter(localStorage.getItem("val"),this.filterService.jsonObject);
      this.service.getDataFilter(localStorage.getItem('val'), this.filterService.jsonObject).toPromise().then(
        data => this.receivedata = data as Object[]
     );
      console.log('pour le filtre');
      const tableName = this.route.snapshot.params.tableName;
      this.router.navigate(['table/'+ tableName]);
    }
  }
  clearFilter() {
        this.service.getDataInTableByRows(localStorage.getItem('val')).toPromise().then(
          data => this.receivedata = data as Object[]
        );
        this.myCounter = this.counter as unknown as number;
        console.log('clear '+ this.myCounter);
        // effacer le filtre
        /*let control: AbstractControl = null;
        this.myForm.reset();
        this.myForm.markAsUntouched();
        Object.keys(this.myForm.controls).forEach((key) =>{
          control = this.myForm.controls[key];
          control.setErrors(null);
        });*/
  }

  back() {
     this.myCounter = this.myCounter + 1000;
     let offset = this.counter as unknown as number;
     if (this.myCounter < offset) {
        this.js_map.set('value', this.myCounter);
        this.js_map.forEach((value, key) => {
          this.service.jsObject[key] = value;
        });
        console.log('back '+ this.myCounter);
        this.service.getDataInTableRowsOnly(localStorage.getItem('val'), this.service.jsObject).toPromise().then(
          data => this.receivedata = data as Object[]
        );
      } else {
        this.myCounter = this.myCounter - 1000;
      }
  }
}
