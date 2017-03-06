import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class NdbService {

  constructor(public http: Http) {
    console.log('Hello NdbService Provider');
  }

  searchFood(q: any) {
    let baseUrl = "https://api.nal.usda.gov/ndb/search/?format=json&api_key=MO2tCSDwNo33vvL90mSk8OrRxq6J1OxzsW5QrfMG";
    let sort = "r";
    let offset = 0;
    let max = 25
    let url = baseUrl + `&q=${q}&sort=${sort}&max=${max}&offset=${offset}`
    return this.http.get(url)
      .map((resp: Response) => resp.json())
      .catch(this._handleError);
  }

  getNutrientSummary(q: any) {
    let baseUrl = "http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=MO2tCSDwNo33vvL90mSk8OrRxq6J1OxzsW5QrfMG"
      + "&nutrients=205&nutrients=208&nutrients=203&nutrients=204&nutrients=205"; //Calories, protein, lipid, Carbohydrate
    let url = baseUrl + `&ndbno=${q}`;
    return this.http.get(url)
      .map((resp: Response) => resp.json())
      .catch(this._handleError);
  }

  emptyFoodSummary() {
    return {
      "ndbno": null,
      "name": null,
      "weight": null,
      "measure": null,
      "nutrients": [
        {
          "nutrient_id": "208",
          "nutrient": "Energy",
          "unit": "kcal",
          "value": null,
          "gm": 0
        },
        {
          "nutrient_id": "269",
          "nutrient": "Sugars, total",
          "unit": "g",
          "value": null,
          "gm": 0
        },
        {
          "nutrient_id": "204",
          "nutrient": "Total lipid (fat)",
          "unit": "g",
          "value": null,
          "gm": 0
        },
        {
          "nutrient_id": "205",
          "nutrient": "Carbohydrate, by difference",
          "unit": "g",
          "value": null,
          "gm": 0
        }
      ]
    };
  }

  private _handleError(error: Response){
    return Observable.throw(error.statusText);
  }
}
