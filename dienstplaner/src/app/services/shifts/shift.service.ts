import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ShiftList} from '../../domain-models/shift-list/shift-list';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operator/map';

@Injectable()
export class ShiftService {

  private url = '../assets/mockdata/shift-data.json';
  list: ShiftList[];

  constructor(private http: HttpClient) {
  }

  getShiftlist(): Observable<any> {
    return this.http.get(this.url);

    //  .map((res: Response) => res.json() as ShiftList[]);
  }

  // test this
  // getShiftList2(): Observable<Array<ShiftList>> {
  //   return this.http.get(this.url)
  //     .map((res: Response) => res.json());
  // }

  // getShiftlist(): Observable<Array<ShiftList>> {
  //   this.http.get(this.url)
  //     .map((res: Response) => {
  //       return <ShiftList[]>res.json().results;
  //     });
  //   .subscribe((res: Response) => {
  //     console.log(res.results);
  //     console.log(Object.assign({},res.result));
  //     //this.list = res;
  //   });
  // return [];
// }


// getShiftlist(): Observable<ShiftList[]> {
//   return this.http.get(this.url)
//     .map((res: Response) => {
//       return res.json().results.map(item => {
//         return Object.assign(ShiftList.prototype, item);
//       });
//     });
// }

}
