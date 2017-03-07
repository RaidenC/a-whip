import { SearchFood } from './search-food';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

describe('SearchFood', () => {
  describe('searchFood', () => {
    let cmp: SearchFood,
      mockNdbService;

    beforeEach(() => {
      let q: string = 'egg';
      let toastCtl: ToastController
      mockNdbService = jasmine.createSpyObj('mockNdbService', ['searchFood', 'getNutrientSummary', 'emptyFoodSummary'])
      cmp = new SearchFood(mockNdbService, toastCtl)
    });

    it('should update searchResult', () => {
      mockNdbService.searchFood.and.returnValue(Observable.of(false))
    });
  })
});
