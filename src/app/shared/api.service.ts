import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data:any){
   return this.http.post<any>('https://demojsonserver.herokuapp.com/posts', data).pipe(map((res:any) => {
      console.log('Res',res);
      return res;
    }))
  }

  getEmployee(){
   return this.http.get<any>('https://demojsonserver.herokuapp.com/posts').pipe(map((res:any) => {
    console.log('Res',res);
      return res;
    }))
  }

  updateEmployee(data:any, id: number){
   return this.http.put<any>('https://demojsonserver.herokuapp.com/posts/'+id, data).pipe(map((res:any) => {
    console.log('Res',res);
      return res;
    }))
  }

  deleteEmployee(id: number){
  return this.http.delete<any>('https://demojsonserver.herokuapp.com/posts/'+id).pipe(map((res:any) => {
    console.log('Res',res);
      return res;
    }))
  }


}
