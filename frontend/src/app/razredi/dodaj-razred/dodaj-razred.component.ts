import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RazredDTO } from '../../DTO/RazredDTO';
import { StavkeSifrarnikaDTO } from '../../DTO/StavkaSifrarnikaDTO';
import { RazrediService } from '../razredi.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StavkeSifrarnikaService } from '../../sifrarnici/stavke-sifrarnika.service';

@Component({
  selector: 'app-dodaj-razred',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dodaj-razred.component.html',
  styleUrl: './dodaj-razred.component.css'
})
export class DodajRazredComponent implements OnInit{

  ngOnInit(): void {
    this.ucitajSifrarnikeZaSelektovanje();
  }

  ruter = inject(Router)
  aktivnaRuta = inject(ActivatedRoute)
  servis = inject(RazrediService)
  stavkeSifrarnikaServis = inject(StavkeSifrarnikaService)

  stavkeSifrarnikaSkolskaGodina: StavkeSifrarnikaDTO[] = [];
  stavkeSifrarnikaProgram: StavkeSifrarnikaDTO[] = []
  stavkeSifrarnikaRazred: StavkeSifrarnikaDTO[] = []
  nevalidnaForma: string = ""

  razredi(){
    this.ruter.navigate(['/razredi'])
  }
  odeljenja(){
    this.ruter.navigate(['/odeljenja'])
  }

  dodajRazred() {
    if (this.razredForma.valid) {
      this.nevalidnaForma = "";
      const noviRazred: RazredDTO = {
        id: 0,
        skolskaGodina: this.razredForma.value.skolskaGodina!,
        razredNaziv: this.razredForma.value.razred!,
        program: this.razredForma.value.program!,
        ukupanBrojUcenika: this.razredForma.value.ukupanBrojUcenika!,
        ukupanBrojOdeljenja: this.razredForma.value.ukupanBrojOdeljenja!
      };

      this.servis.dodajRazred(noviRazred).subscribe({
        next: () => {
          alert('Uspešno dodat razred!');
          this.razredi();
        },
        error: (err) => {
          console.error('Greška prilikom dodavanja razreda:', err);
          alert('Došlo je do greške prilikom dodavanja.');
        }
      });
    }else{
      this.nevalidnaForma = "Forma nije dobro popunjena."
    }
  }

  //reaktivna forma za dodavanje razreda
  razredForma = new FormGroup({
    skolskaGodina: new FormControl('', [Validators.required]),
    razred: new FormControl('',[Validators.required]),
    program: new FormControl('', [Validators.required]),
    ukupanBrojUcenika: new FormControl(0),
    ukupanBrojOdeljenja: new FormControl(0)
  });

  //pomocne funkcije
  ucitajSifrarnikeZaSelektovanje(){

      //ucitava sve skolske godine iz sifrarnika, za selektovanje
      this.stavkeSifrarnikaServis.dohvatiSveSkolskeGodine().subscribe(data=>{
        if(data){
          console.log(data)
          this.stavkeSifrarnikaSkolskaGodina = data;
        }
      })
      //ucitava sve razrede iz sifrarnika, za selektovanje
        this.stavkeSifrarnikaServis.dohvatiSveRazrede().subscribe(data=>{
        if(data){
          console.log(data)
          this.stavkeSifrarnikaRazred = data;
        }
      })
      //ucitava sve programe iz sifrarnika, za selektovanje
      this.stavkeSifrarnikaServis.dohvatiSvePrograme().subscribe(data=>{
        if(data){
          console.log(data)
          this.stavkeSifrarnikaProgram = data;
        }
      })
  }

}
