import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RazredDTO } from '../../DTO/RazredDTO';
import { RazrediService } from '../razredi.service';
import { StavkeSifrarnikaDTO } from '../../DTO/StavkaSifrarnikaDTO';
import { StavkeSifrarnikaService } from '../../sifrarnici/stavke-sifrarnika.service';

@Component({
  selector: 'app-razredi-izmeni',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './razredi-izmeni.component.html',
  styleUrl: './razredi-izmeni.component.css'
})
export class RazrediIzmeniComponent implements OnInit{
  
  ngOnInit(): void {
    this.id = Number(this.aktivnaRuta.snapshot.paramMap.get('id'));
    this.servis.dohvatiRazredPoID(this.id).subscribe(data=>{
      if(data){

        console.log(data)
        this.r = data

        this.razredForma.patchValue({
          skolskaGodina: this.r.skolskaGodina,
          razred: this.r.razredNaziv,
          program: this.r.program,
          ukupanBrojUcenika: this.r.ukupanBrojUcenika,
          ukupanBrojOdeljenja: this.r.ukupanBrojOdeljenja
        });
      this.ucitajSveSifrarnikeZaSelektovanje()
      }else{
        console.log("Razred sa datim id ne postoji.")
      }
    })

  }

  ruter = inject(Router)
  aktivnaRuta = inject(ActivatedRoute)
  servis = inject(RazrediService)
  stavkeSifrarnikaServis = inject(StavkeSifrarnikaService)

  stavkeSifrarnikaSkolskaGodina: StavkeSifrarnikaDTO[] = [];
  stavkeSifrarnikaProgram: StavkeSifrarnikaDTO[] = []
  stavkeSifrarnikaRazred: StavkeSifrarnikaDTO[] = []
  id: number = 0
  r: RazredDTO = new RazredDTO()
  nevalidnaForma: string = ""

  razredi(){
    this.ruter.navigate(['/razredi'])
  }
  odeljenja(){
    this.ruter.navigate(['/odeljenja'])
  }

  trenutnaSkolskaGodina(stavka:StavkeSifrarnikaDTO){
    if(this.r.skolskaGodina == stavka.vrednost){
      return true
    }else{
      return false
    }
  }
  trenutniRazred(stavka:StavkeSifrarnikaDTO){
    if(this.r.razredNaziv == stavka.vrednost){
      return true
    }else{
      return false
    }
  }
  trenutniProgram(stavka:StavkeSifrarnikaDTO){
    if(this.r.program == stavka.vrednost){
      return true
    }else{
      return false
    }
  }

  izmeniRazred() {
  if (this.razredForma.valid) {
    this.nevalidnaForma = "";
    const izmenjeniRazred: RazredDTO = {
      id: this.id,
      skolskaGodina: this.razredForma.value.skolskaGodina!,
      razredNaziv: this.razredForma.value.razred!,
      program: this.razredForma.value.program!,
      ukupanBrojUcenika: this.razredForma.value.ukupanBrojUcenika!,
      ukupanBrojOdeljenja: this.razredForma.value.ukupanBrojOdeljenja!
    };

    this.servis.izmeniRazred(izmenjeniRazred).subscribe({
      next: () => {
        alert('Uspešno izmenjen razred!');
        this.razredi();
      },
      error: (err) => {
        console.error('Greška prilikom izmene razreda:', err);
        alert('Došlo je do greške prilikom izmene.');
      }
    });
  }else{
    this.nevalidnaForma = "Forma nije dobro popunjena."
  }
}

  razredForma = new FormGroup({
    skolskaGodina: new FormControl('', [Validators.required]),
    razred: new FormControl('',[Validators.required]),
    program: new FormControl('', [Validators.required]),
    ukupanBrojUcenika: new FormControl(0),
    ukupanBrojOdeljenja: new FormControl(0)
  });

  //pomocne funckije
  ucitajSveSifrarnikeZaSelektovanje(){
        this.stavkeSifrarnikaServis.dohvatiSveSkolskeGodine().subscribe(data=>{
      if(data){
        console.log(data)
        this.stavkeSifrarnikaSkolskaGodina = data;
      }
    })
      this.stavkeSifrarnikaServis.dohvatiSveRazrede().subscribe(data=>{
      if(data){
        console.log(data)
        this.stavkeSifrarnikaRazred = data;
      }
    })
    this.stavkeSifrarnikaServis.dohvatiSvePrograme().subscribe(data=>{
      if(data){
        console.log(data)
        this.stavkeSifrarnikaProgram = data;
      }
    })
  }
}
