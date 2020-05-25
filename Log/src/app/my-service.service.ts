import { Injectable } from "@angular/core";
import {  HttpClient, HttpHeaders,HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { error } from "protractor";

@Injectable({
  providedIn: "root",
})
export class MyServiceService {
  public name: string;
  public jsObject = {};
  myObject: {};
  mySecurity = "abcdefg";
  public hurt : any;
   getNumber : object[];
  constructor(private http: HttpClient) {}

  public getData(name: string): Observable<any> {
    console.log("récuperation contenu de la table");
    return this.http.get<any>(
      'https://localhost:44323/api/LogFile/GetData/' + name
    );
  }
  public getDataInTableByRows(name: string): Observable<any>{
    console.log("récupération des derniers enregistrement");
    return this.http.get<any>('https://localhost:44323/api/LogFile/GetDataInTableByRows/'+ name);
  }
  public getTotalRows(name: string): Observable<any>{
    console.log("renvoie du nombre total ");
    return this.http.get<any>('https://localhost:44323/api/LogFile/GetTotalRowsValues/'+name);
  }
  public getDataInTableRowsOnly(name: string, object: any): Observable<any>{
    console.log("next enrégistrement " +name + "  value "+object);
    return this.http.post<any>('https://localhost:44323/api/LogFile/GetDataInTableByRowsOnly/'+name,object);
  }
  public getAllColumnTable(name: string): Observable<any> {
    console.log("les colonnes ");
    return this.http.get<any>(
      'https://localhost:44323/api/LogFile/GetColTable/' + name
    );
  }
  public getAllTable_name(): Observable<any> {
    console.log("recuperation data");
    return this.http.get<any>(
      'https://localhost:44323/api/LogFile/GetAllTablesName'
    );
  }
  public getValueTable(tableName: string): Observable<any> {
    console.log("récuperation contenu de la table");
    return this.http.get<any>(
      'https://localhost:44323/api/LogFile/GetAllDataInTable/' + tableName
    );
  }
  public getInfoColumsTable(name: string): Observable<any> {
    console.log("les Infos des champs :");
    return this.http.get<any>(
      'https://localhost:44323/api/LogFile/GetAllColumsTable/' + name
    );
  }
  public getDataFilter(name: string, object: any): Observable<any> {
    console.log("les filtres : " + name + JSON.stringify(object));
    console.log(object);
    this.myObject = JSON.stringify(object);
    const objectData = JSON.stringify(object);
    const usersJson: any[] = Array.of(objectData);
    console.log("userJSON : " + usersJson);
    console.log("myObject : " + this.myObject);
    return this.http.post<any>(
      'https://localhost:44323/api/LogFile/GetFilterData/' + name,
      object
    );
  }
}
