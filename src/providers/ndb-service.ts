import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class NdbService {

  constructor(public http: Http) {
  }

  searchFood(q: any) {
    let baseUrl = "https://api.nal.usda.gov/ndb/search/?format=json&api_key=MO2tCSDwNo33vvL90mSk8OrRxq6J1OxzsW5QrfMG";
    let sort = "r";
    let offset = 0;
    let max = 100
    let url = baseUrl + `&q=${q}&sort=${sort}&max=${max}&offset=${offset}`
    return this.http.get(url)
      .map((resp: Response) => resp.json())
      .catch(this._handleError);
  }

  getNutrientSummary(ndbno: any) {
    let baseUrl = "http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=MO2tCSDwNo33vvL90mSk8OrRxq6J1OxzsW5QrfMG"
      + "&nutrients=205&nutrients=208&nutrients=203&nutrients=204&nutrients=205"; //Calories, protein, lipid, Carbohydrate
    let url = baseUrl + `&ndbno=${ndbno}`;
    return this.http.get(url)
      .map((resp: Response) => resp.json())
      .catch(this._handleError);
  }

  getFoodReport(ndbno: any) {
    let baseUrl = "https://api.nal.usda.gov/ndb/reports/?format=json&api_key=MO2tCSDwNo33vvL90mSk8OrRxq6J1OxzsW5QrfMG";
    let type = "b" //as brief (f as full)
    let url = baseUrl + `&ndbno=${ndbno}`;
    return this.http.get(url)
      .map((resp: Response) => resp.json())
      .catch(this._handleError);
  }

  private _handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
