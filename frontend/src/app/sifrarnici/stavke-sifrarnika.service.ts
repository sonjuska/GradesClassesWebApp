import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StavkeSifrarnikaDTO } from '../DTO/StavkaSifrarnikaDTO';


@Injectable({
  providedIn: 'root'
})
export class StavkeSifrarnikaService {

  private http = inject(HttpClient)
  private url = "https://localhost:5001/stavkeSifrarnika"

  constructor() { }

    dohvatiSveSkolskeGodine(){
      return this.http.get<StavkeSifrarnikaDTO[]>(`${this.url}/skolskeGodine`)
    }
    dohvatiSveRazrede(){
      return this.http.get<StavkeSifrarnikaDTO[]>(`${this.url}/razredi`)
    }
    dohvatiSveVrsteOdeljenja(){
      return this.http.get<StavkeSifrarnikaDTO[]>(`${this.url}/vrsteOdeljenja`)
    }
    dohvatiSveJezikeNastave(){
      return this.http.get<StavkeSifrarnikaDTO[]>(`${this.url}/jeziciNastave`)
    }
    dohvatiSvePrveStranejezike(){
      return this.http.get<StavkeSifrarnikaDTO[]>(`${this.url}/prviStraniJezici`)
    }
    dohvatiSvePrograme(){
      return this.http.get<StavkeSifrarnikaDTO[]>(`${this.url}/programi`)
    }


}
