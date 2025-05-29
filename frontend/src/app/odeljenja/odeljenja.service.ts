import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OdeljenjeDTO } from '../DTO/OdeljenjeDTO';
import { DodajOdeljenjeDTO } from '../DTO/DodajOdeljenjeDTO';

@Injectable({
  providedIn: 'root',
})
export class OdeljenjaService {

  private http = inject(HttpClient)
  private url = "https://localhost:5001/odeljenja"

  constructor() { }

  dohvatiSvaOdeljenja(){
    return this.http.get<{$values:OdeljenjeDTO[]}>(`${this.url}`)
  }
  dohvatiOdeljenjaPoRazredID(razredId:number){
    return this.http.get<{$values:OdeljenjeDTO[]}>(`${this.url}/razredi/${razredId}`)
  }
  dohvatiOdeljenjaPoRazredIDpaginacija(razredId: number, limit: number, offset: number) {
    return this.http.get<{ total: number, data: OdeljenjeDTO[] }>(
      `${this.url}/razredi/${razredId}/paginacija?limit=${limit}&offset=${offset}`
    );
  }
  dohvatiSvaOdeljenjaPaginacija(limit: number, offset: number) {
    return this.http.get<{ total: number, data: OdeljenjeDTO[] } >(
      `${this.url}/paginacija?limit=${limit}&offset=${offset}`
    );
  }
  dohvatiOdeljenjePoID(id:number){
  return this.http.get<OdeljenjeDTO>(`${this.url}/${id}`)
  }
  dohvatiCeloOdeljenjePoID(id:number){
      return this.http.get<DodajOdeljenjeDTO>(`${this.url}/celo/${id}`)
  }
  izmeniOdeljenje(o:DodajOdeljenjeDTO){
    return this.http.put(`${this.url}/azuriraj/${o.id}`, o);
  }
  dodajOdeljenje(o:DodajOdeljenjeDTO){
    console.log(o.naziv+' '+o.brojDecaka+' '+o.brojDevojcica)
    return this.http.post(`${this.url}/dodaj/`, o);
  }
  obrisiOdeljenje(id:number){
    return this.http.delete(`${this.url}/obrisi/${id}`);
  }
  eksportujUExcell() {
    this.http.get(`${this.url}/exportUExcell`, { responseType: 'blob' }).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;

      a.download = `Odeljenje.xlsx`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
}


}
