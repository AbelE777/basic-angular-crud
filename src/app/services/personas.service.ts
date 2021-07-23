import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class PersonasService {

  apiUrl_personas= '/api/personas';
  
  constructor(private http:HttpClient) { 
    
  }

  // mostrar en tabla
  getPersonas():Observable<any>{
    let header = new HttpHeaders().set('Type-content', 'application/json');
    return this.http.get<any>(this.apiUrl_personas)
  }

  // get from api/zonas
  getZona():Observable<any>{
    return this.http.get<any>(`/api/zonas`)
  }
  
  // agregar registro
  addNewPerson(body:any):Observable<any>{
    return this.http.post(this.apiUrl_personas, body);
  }

  // get person by id
  getPersonById(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl_personas}/${id}`);
  }

  // put method
  updateData(body:any):Observable<any>{
    return this.http.put<any>(`api/personas/${body.id}`, body);
  }

  // delete method
  deleteRecord(id:number):Observable<any>{
    return this.http.delete<any>(`api/personas/${id}`);
  }
}
