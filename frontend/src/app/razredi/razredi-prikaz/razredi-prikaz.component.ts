import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RazrediService } from '../razredi.service';
import { RazredDTO } from '../../DTO/RazredDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-razredi-prikaz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './razredi-prikaz.component.html',
  styleUrl: './razredi-prikaz.component.css'
})
export class RazrediPrikazComponent implements OnInit{
  ngOnInit(): void {
    this.ucitajRazrede()
  }

  ruter = inject(Router)
  servis = inject(RazrediService)

  sviRazredi: RazredDTO[] = []

  //navigacija
  razredi(){
    this.ruter.navigate(['/razredi'])
  }
  odeljenja(){
    this.ruter.navigate(['/odeljenja'])
  }

  //funkcije dugmad
  dodajRazred(){
    this.ruter.navigate(['/dodajRazred'])
  }
  izmeni(id:number){
    this.ruter.navigate(['/razredIzmeni', id]);
  }
  dodajOdeljenje(id:number){
    this.ruter.navigate(['/odeljenja/dodaj', id]);
  }
  obrisi(id: number) {
    const potvrda = window.confirm("Da li ste sigurni da želite da obrišete ovaj razred?");
    if (potvrda) {
      this.servis.obrisiRazred(id).subscribe({
        next: () => {
          this.ucitajRazrede();
          alert("Razred je uspešno obrisan.");
          this.razredi();
        },
        error: (err) => {
          console.error("Greška prilikom brisanja razreda:", err);
          alert("Došlo je do greške prilikom brisanja.");
        }
      });
    }
  }

  odeljenjaPoIdRazreda(id: number){
    this.ruter.navigate(['odeljenja', id])
  }

  //paginacija
  trenutnaStranica = 1;
  poStranici = 10;
  ukupnoStranica = 1;
  ukupnoRedova = 0;
  
  //loading spinner
  loading:boolean = false;

  ucitajRazrede(){
    this.loading = true;
    const offset = (this.trenutnaStranica - 1) * this.poStranici;
    this.servis.dohvatiSveRazredePaginacija(this.poStranici, offset)
      .subscribe(res => {
        //console.log(res)
        this.sviRazredi = res.data;
        this.ukupnoRedova = res.total;
        this.ukupnoStranica = Math.ceil(this.ukupnoRedova / this.poStranici);
        this.filtrirajRazrede();
        this.loading = false;
      });

  }
  promeniStranicu(novaStranica: number) {
    if (novaStranica >= 1 && novaStranica <= this.ukupnoStranica) {
      this.trenutnaStranica = novaStranica;
      this.ucitajRazrede();
    }
  }

  //filtriranje razreda
  filterText: string = '';
  filtriraniRazredi: RazredDTO[] = [];

  filtrirajRazrede() {
    const tekst = this.filterText.toLowerCase().trim();
    this.filtriraniRazredi = this.sviRazredi.filter(r =>
      r.razredNaziv.toLowerCase().includes(tekst) ||
      r.skolskaGodina.toLowerCase().includes(tekst) ||
      r.program.toLowerCase().includes(tekst) ||
      r.ukupanBrojOdeljenja.toString().includes(tekst) ||
      r.ukupanBrojUcenika.toString().includes(tekst)
    );
  }
  onFilterChange() {
    this.filtrirajRazrede();
  }



  
  /*
  //prikaz bez paginacije
  prikazi(){
    this.servis.dohvatiSveRazrede().subscribe((data:any)=>{
      console.log(data)
      this.sviRazredi = data.$values;
    })
  }
  */
}
