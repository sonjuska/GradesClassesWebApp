import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RazredDTO } from '../DTO/RazredDTO';

@Injectable({
  providedIn: 'root'
})
export class RazrediService {

  private http = inject(HttpClient)
  private url = "https://localhost:5001/razredi"

  constructor() { }

  dohvatiSveRazrede(){
    return this.http.get<{$values:RazredDTO[]}>(`${this.url}`)
  }
  dohvatiSveRazredePaginacija(limit:number, offset:number){
    return this.http.get<{ total: number, data: RazredDTO[]}>(
      `${this.url}/paginacija?limit=${limit}&offset=${offset}`
    );
  }
  dohvatiRazredPoID(id:number){
    return this.http.get<RazredDTO>(`${this.url}/${id}`)
  }
  izmeniRazred(r:RazredDTO){
    return this.http.put(`${this.url}/azuriraj/${r.id}`, r);
  }
  dodajRazred(r:RazredDTO){
    return this.http.post(`${this.url}/dodaj/`, r);
  }
  obrisiRazred(id:number){
    return this.http.delete(`${this.url}/obrisi/${id}`);
  }
}
