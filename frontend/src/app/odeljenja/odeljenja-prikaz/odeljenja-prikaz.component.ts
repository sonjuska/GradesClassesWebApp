import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RazrediService } from '../../razredi/razredi.service';
import { RazredDTO } from '../../DTO/RazredDTO';
import { OdeljenjeDTO } from '../../DTO/OdeljenjeDTO';
import { OdeljenjaService } from '../odeljenja.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-odeljenja-prikaz',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  providers: [DatePipe], 
  templateUrl: './odeljenja-prikaz.component.html',
  styleUrl: './odeljenja-prikaz.component.css'
})
export class OdeljenjaPrikazComponent implements OnInit{
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.ucitajOdeljenja();
  }

  ruter = inject(Router)
  ruta = inject(ActivatedRoute)
  razrediServis = inject(RazrediService)
  odeljenjaServis = inject(OdeljenjaService)
  razred:RazredDTO = new RazredDTO()
  odeljenjaPrikaz: OdeljenjeDTO[] = []

  izmeni(odeljenjeId:number){
    this.ruter.navigate(['/odeljenja/izmeni', odeljenjeId])
  }

  obrisi(id: number) {
    const potvrda = window.confirm("Da li ste sigurni da želite da obrišete ovo odeljenje?");
    if (potvrda) {
      this.odeljenjaServis.obrisiOdeljenje(id).subscribe({
        next: () => {
          this.ucitajOdeljenja(); 
          alert("Odeljenje je uspešno obrisano.");
          this.odeljenja();
        },
        error: (err) => {
          console.error("Greška prilikom brisanja odeljenja:", err);
          alert("Došlo je do greške prilikom brisanja.");
        }
      });
    }
  }

  //navigacija
  razredi(){
    this.ruter.navigate(['/razredi'])
  }
  odeljenja(){
    this.ruter.navigate(['/odeljenja'])
  }
  
  //prikaz bez paginacije
  prikazi(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.razrediServis.dohvatiRazredPoID(+id).subscribe(data=>{
        if(data){
          this.razred = data
        }
      })
      //console.log(id)
      this.odeljenjaServis.dohvatiOdeljenjaPoRazredID(+id).subscribe(data=>{
        if(data){
          this.odeljenjaPrikaz = data.$values
        }
      })
    }else{
      console.log("nema id: ", id)
        this.odeljenjaServis.dohvatiSvaOdeljenja().subscribe(data=>{
        if(data){
          console.log(data)
          this.odeljenjaPrikaz = data.$values
        }
      })
    }
  }
  //paginacija
  trenutnaStranica = 1;
  poStranici = 10;
  ukupnoStranica = 1;
  ukupnoRedova = 0;

  ucitajOdeljenja() {
    const idRazreda = this.ruta.snapshot.paramMap.get('id');
    const offset = (this.trenutnaStranica - 1) * this.poStranici;
    console.log(idRazreda)
    if(idRazreda){
      this.odeljenjaServis.dohvatiOdeljenjaPoRazredIDpaginacija(+idRazreda, this.poStranici, offset)
      .subscribe(res => {
        console.log(res)
        this.odeljenjaPrikaz = res.data;
        this.ukupnoRedova = res.total;
        this.ukupnoStranica = Math.ceil(this.ukupnoRedova / this.poStranici);
        this.filtrirajOdeljenja();
      });
    }else{
      this.odeljenjaServis.dohvatiSvaOdeljenjaPaginacija(this.poStranici, offset)
        .subscribe(res => {
          console.log(res)
          this.odeljenjaPrikaz = res.data;
          this.ukupnoRedova = res.total;
          this.ukupnoStranica = Math.ceil(this.ukupnoRedova / this.poStranici);
          this.filtrirajOdeljenja();
        });
    }
  }

  promeniStranicu(novaStranica: number) {
    if (novaStranica >= 1 && novaStranica <= this.ukupnoStranica) {
      this.trenutnaStranica = novaStranica;
      this.ucitajOdeljenja();
    }
  }
  eksportuj(){
    this.odeljenjaServis.eksportujUExcell();
  }

  //filtriranje odeljenja
  filterText: string = '';
  filtriranaOdeljenja: OdeljenjeDTO[] = [];

  filtrirajOdeljenja() {
    const tekst = this.filterText.toLowerCase().trim();
    this.filtriranaOdeljenja = this.odeljenjaPrikaz.filter(o =>
      o.naziv.toLowerCase().includes(tekst) ||
      o.odeljenjskiStaresina.toLowerCase().includes(tekst) ||
      o.brojUcenika.toString().includes(tekst) ||
      o.jezikNastave.toLowerCase().includes(tekst)
    );
  }
  onFilterChange() {
    this.filtrirajOdeljenja();
  }

  //pomocne funkcije
  izdvojenoOdeljenjeDaNe(i:boolean){
    if(i) return 'Da'
    else return 'Ne'
  }

}