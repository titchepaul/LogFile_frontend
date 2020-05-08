import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nametable: Object[];
  constructor(private service: MyServiceService, private router: Router) { }

  ngOnInit() {
    this.service.getAllTable_name().toPromise().then(
      data => this.nametable = data as Object[]
    );
  }
      
  public redirect(val :string) : void{
      this.service.name=val;
      console.log("service value :"+ this.service.name);
      this.router.navigate(['affich']);
  }

}
