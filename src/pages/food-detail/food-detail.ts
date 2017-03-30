import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NdbService } from '../../providers/providers';
import { AngularFire, AngularFireAuth, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-food-detail',
  templateUrl: 'food-detail.html'
})
export class FoodDetailPage {
  title: string;
  meal: any;
  foodDetail: any;
  foodSummary: any;
  servings: number;
  servingSize: number;

  foodData: FirebaseListObservable<any>;
  nutritionData: FirebaseObjectObservable<any>;
  currentNutritionData: any;
  date: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ndbService: NdbService,
    public af: AngularFire,
    private _auth: AngularFireAuth
  ) {
    this.title = this.navParams.get("title");
    this.meal = this.navParams.get("meal");
    this.foodDetail = this.navParams.get("food");
    this.foodSummary = this.navParams.get("summary");
    this.servings = 1.0;
    this.servingSize = 100;
    this.date = new Date().toISOString().substring(0, 10);

    this.foodData = af.database.list('/' + this.meal + '/' + this._auth.getAuth().uid + '/' + this.date);
    this.nutritionData = af.database.object('/nutrition/' + this._auth.getAuth().uid + '/' + this.date);
  }

  save() {
    this.saveFood();
    this.saveNutrition();
    this.navCtrl.pop();
  }

  saveFood() {
    this.foodData.push(this.foodDetail);
  }

  initNutrition() {
    console.log("initNutrition...");
    let nutrients = [
      {
        "nutrient_id": "255",
        "name": "Water",
        "group": "Proximates",
        "unit": "g",
        "value": "57.32",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "48.72"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "118.08"
          }
        ]
      },
      {
        "nutrient_id": "208",
        "name": "Energy",
        "group": "Proximates",
        "unit": "kcal",
        "value": "255",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "217"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "525"
          }
        ]
      },
      {
        "nutrient_id": "203",
        "name": "Protein",
        "group": "Proximates",
        "unit": "g",
        "value": "26.54",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "22.56"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "54.67"
          }
        ]
      },
      {
        "nutrient_id": "204",
        "name": "Total lipid (fat)",
        "group": "Proximates",
        "unit": "g",
        "value": "15.71",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "13.35"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "32.36"
          }
        ]
      },
      {
        "nutrient_id": "205",
        "name": "Carbohydrate, by difference",
        "group": "Proximates",
        "unit": "g",
        "value": "0.00",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.00"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0.00"
          }
        ]
      },
      {
        "nutrient_id": "291",
        "name": "Fiber, total dietary",
        "group": "Proximates",
        "unit": "g",
        "value": "0.0",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.0"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0.0"
          }
        ]
      },
      {
        "nutrient_id": "269",
        "name": "Sugars, total",
        "group": "Proximates",
        "unit": "g",
        "value": "0.00",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.00"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0.00"
          }
        ]
      },
      {
        "nutrient_id": "301",
        "name": "Calcium, Ca",
        "group": "Minerals",
        "unit": "mg",
        "value": "51",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "43"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "105"
          }
        ]
      },
      {
        "nutrient_id": "303",
        "name": "Iron, Fe",
        "group": "Minerals",
        "unit": "mg",
        "value": "0.81",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.69"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "1.67"
          }
        ]
      },
      {
        "nutrient_id": "304",
        "name": "Magnesium, Mg",
        "group": "Minerals",
        "unit": "mg",
        "value": "19",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "16"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "39"
          }
        ]
      },
      {
        "nutrient_id": "305",
        "name": "Phosphorus, P",
        "group": "Minerals",
        "unit": "mg",
        "value": "213",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "181"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "439"
          }
        ]
      },
      {
        "nutrient_id": "306",
        "name": "Potassium, K",
        "group": "Minerals",
        "unit": "mg",
        "value": "259",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "220"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "534"
          }
        ]
      },
      {
        "nutrient_id": "307",
        "name": "Sodium, Na",
        "group": "Minerals",
        "unit": "mg",
        "value": "69",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "59"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "142"
          }
        ]
      },
      {
        "nutrient_id": "309",
        "name": "Zinc, Zn",
        "group": "Minerals",
        "unit": "mg",
        "value": "3.11",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "2.64"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "6.41"
          }
        ]
      },
      {
        "nutrient_id": "401",
        "name": "Vitamin C, total ascorbic acid",
        "group": "Vitamins",
        "unit": "mg",
        "value": "0.0",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.0"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0.0"
          }
        ]
      },
      {
        "nutrient_id": "404",
        "name": "Thiamin",
        "group": "Vitamins",
        "unit": "mg",
        "value": "0.486",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.413"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "1.001"
          }
        ]
      },
      {
        "nutrient_id": "405",
        "name": "Riboflavin",
        "group": "Vitamins",
        "unit": "mg",
        "value": "0.316",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.269"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0.651"
          }
        ]
      },
      {
        "nutrient_id": "406",
        "name": "Niacin",
        "group": "Vitamins",
        "unit": "mg",
        "value": "7.381",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "6.274"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "15.205"
          }
        ]
      },
      {
        "nutrient_id": "415",
        "name": "Vitamin B-6",
        "group": "Vitamins",
        "unit": "mg",
        "value": "0.488",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.415"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "1.005"
          }
        ]
      },
      {
        "nutrient_id": "435",
        "name": "Folate, DFE",
        "group": "Vitamins",
        "unit": "µg",
        "value": "0",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0"
          }
        ]
      },
      {
        "nutrient_id": "418",
        "name": "Vitamin B-12",
        "group": "Vitamins",
        "unit": "µg",
        "value": "0.62",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.53"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "1.28"
          }
        ]
      },
      {
        "nutrient_id": "320",
        "name": "Vitamin A, RAE",
        "group": "Vitamins",
        "unit": "µg",
        "value": "4",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "3"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "8"
          }
        ]
      },
      {
        "nutrient_id": "318",
        "name": "Vitamin A, IU",
        "group": "Vitamins",
        "unit": "IU",
        "value": "13",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "11"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "27"
          }
        ]
      },
      {
        "nutrient_id": "323",
        "name": "Vitamin E (alpha-tocopherol)",
        "group": "Vitamins",
        "unit": "mg",
        "value": "0.20",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.17"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0.41"
          }
        ]
      },
      {
        "nutrient_id": "328",
        "name": "Vitamin D (D2 + D3)",
        "group": "Vitamins",
        "unit": "µg",
        "value": "1.0",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.8"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "2.1"
          }
        ]
      },
      {
        "nutrient_id": "324",
        "name": "Vitamin D",
        "group": "Vitamins",
        "unit": "IU",
        "value": "39",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "33"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "80"
          }
        ]
      },
      {
        "nutrient_id": "430",
        "name": "Vitamin K (phylloquinone)",
        "group": "Vitamins",
        "unit": "µg",
        "value": "0.0",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.0"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0.0"
          }
        ]
      },
      {
        "nutrient_id": "606",
        "name": "Fatty acids, total saturated",
        "group": "Lipids",
        "unit": "g",
        "value": "4.487",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "3.814"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "9.243"
          }
        ]
      },
      {
        "nutrient_id": "645",
        "name": "Fatty acids, total monounsaturated",
        "group": "Lipids",
        "unit": "g",
        "value": "5.067",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "4.307"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "10.438"
          }
        ]
      },
      {
        "nutrient_id": "646",
        "name": "Fatty acids, total polyunsaturated",
        "group": "Lipids",
        "unit": "g",
        "value": "1.948",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "1.656"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "4.013"
          }
        ]
      },
      {
        "nutrient_id": "605",
        "name": "Fatty acids, total trans",
        "group": "Lipids",
        "unit": "g",
        "value": "0.067",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0.057"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0.138"
          }
        ]
      },
      {
        "nutrient_id": "601",
        "name": "Cholesterol",
        "group": "Lipids",
        "unit": "mg",
        "value": "86",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "73"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "177"
          }
        ]
      },
      {
        "nutrient_id": "262",
        "name": "Caffeine",
        "group": "Other",
        "unit": "mg",
        "value": "0",
        "measures": [
          {
            "label": "oz",
            "eqv": 85,
            "eunit": "g",
            "qty": 3,
            "value": "0"
          },
          {
            "label": "chop",
            "eqv": 206,
            "eunit": "g",
            "qty": 1,
            "value": "0"
          }
        ]
      }
    ];

    let nutrition: any = {};
    nutrients.forEach(n => {
      let nutrient: any = {};
      nutrient['nutrient_id'] = n.nutrient_id;
      nutrient['nutrient_name'] = n.name;
      nutrient['nutrient_group'] = n.group;
      nutrient['nutrient_unit'] = n.unit;
      nutrient['nutrient_value'] = 0;

      nutrition[n.nutrient_id] = nutrient;
    });

    this.nutritionData.set(nutrition);
    this.currentNutritionData = nutrition
  }

  saveNutrition() {
    this.nutritionData.take(1).subscribe(
      value => {
        if (!value[203]) {
          this.initNutrition();
        } else {
          this.currentNutritionData = value;
        }
      },
      e => { },
      () => {
        console.log("saving data...")
        this.foodDetail.nutrients.forEach(n => {
          let currentValue = this.currentNutritionData[n.nutrient_id.toString()].nutrient_value;
          let update: any = {};
          let nutrient: any = {};
          nutrient['nutrient_id'] = n.nutrient_id;
          nutrient['nutrient_name'] = n.name;
          nutrient['nutrient_group'] = n.group;
          nutrient['nutrient_unit'] = n.unit;
          nutrient['nutrient_value'] = (Number(n.value) * this.servings * this.servingSize / 100).toFixed(2) + Number(currentValue);
          update[n.nutrient_id] = nutrient;
          this.nutritionData.update(update);
        })
      }
    )
  }
}
