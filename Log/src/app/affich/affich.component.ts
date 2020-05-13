import { Component, OnInit } from "@angular/core";
import { MyServiceService } from "../my-service.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ForFilterService } from "../for-filter.service";
import { $ } from 'protractor';

@Component({
  selector: "app-affich",
  templateUrl: "./affich.component.html",
  styleUrls: ["./affich.component.css"],
})
export class AffichComponent implements OnInit {
  private receive:  Object[];
  private receivedata: Object[];
  private receivevalue: Object[];
  private colInfo: Observable<any>;
  private colInfo2 = [];
  private counter : number;
  //public share : Observable<any>;
  myForm: FormGroup;
  formgroupobject = {};

  private t = new Array();
  private map = new Map();
  private up: string;
  private str_1: string;
  private str_2: string;
  private up_1: string;
  private up_2: string;


  constructor(
    private service: MyServiceService,
    private filterService: ForFilterService,
    private router: Router
  ) {  
  }
  data: string;

  ngOnInit() {
    //if (this.service.name != null) {
    //  localStorage.setItem("val", this.service.name);
    //}
    //this.isValid = true;
    //this.data = localStorage.getItem("val");

    this.counter = 0;
    let url = this.router.url;
    this.data = url.substring(url.lastIndexOf("/")).replace("/","");
    localStorage.setItem("val",this.data);

    this.service.getTotalRows(this.data).toPromise().then(
      data => this.counter = data as number
    );
    this.colInfo = this.service.getInfoColumsTable(localStorage.getItem("val"));

        this.service.getInfoColumsTable(localStorage.getItem("val")).toPromise().then(
              data => {this.colInfo2 = data as any[]}
        );
          this.service.getAllColumnTable(localStorage.getItem("val")).toPromise().then(
             data => this.receive = data as Object[]
          );
          this.service.getValueTable(localStorage.getItem("val")).toPromise().then(
             data => this.receivevalue = data as Object[]
          );

          let subscription = this.colInfo.subscribe((data) => {
            let formgroupobject = {};
           //console.log('myData : '+  JSON.stringify(this.colInfo2));
            data.forEach((el) => {
              formgroupobject[el.name] = new FormControl("", [Validators.required]);
              //console.log('elem : '+ JSON.stringify(el));
              if (el.type === "datetime") {
                formgroupobject[el.name + "Sign"] = new FormControl("", [
                  Validators.required,
                ]);
              }
            });
            this.myForm = new FormGroup(formgroupobject);
            console.log("okkkk");
          });


    console.log("value :" + this.counter);
    console.log("receive : " + localStorage.getItem("val"));
    this.goBack();

    /*let subscription = this.colInfo.subscribe((data) => {
      let formgroupobject = {};
      data.forEach((el) => {
        formgroupobject[el.name] = new FormControl("", [Validators.required]);
        if (el.type === "datetime") {
          formgroupobject[el.name + "Sign"] = new FormControl("", [
            Validators.required,
          ]);
        }
      });
      this.myForm = new FormGroup(formgroupobject);
      console.log("okkkk");
    });*/
    /*let subscription = this.colInfo.toPromise().then(data => {
      let formgroupobject = {};
      data.forEach((el) => {
        formgroupobject[el.name] = new FormControl("", [Validators.required]);
        if (el.type === "datetime") {
          formgroupobject[el.name + "Sign"] = new FormControl("", [
            Validators.required,
          ]);
        }
      });
      this.myForm = new FormGroup(formgroupobject);
      console.log("okkkk");
    });*/
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
    let sub = this.colInfo2.map(el =>{
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
  }
  goBack(){
    this.service.getValueTable(localStorage.getItem("val")).toPromise().then(
      data => this.receivevalue = data as Object[]
    );
    //this.counter = this.counter - 10;
    console.log("counter : " + this.counter);  
  }
}
