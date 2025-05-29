import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OdeljenjaService } from '../odeljenja.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../dodatneKomponente/input/input.component';
import { RazrediService } from '../../razredi/razredi.service';
import { RazredDTO } from '../../DTO/RazredDTO';
import { StavkeSifrarnikaDTO } from '../../DTO/StavkaSifrarnikaDTO';
import { DodajOdeljenjeDTO } from '../../DTO/DodajOdeljenjeDTO';
import { StavkeSifrarnikaService } from '../../sifrarnici/stavke-sifrarnika.service';

@Component({
  selector: 'app-odeljenja-dodaj',
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './odeljenja-dodaj.component.html',
  styleUrl: './odeljenja-dodaj.component.css'
})
export class OdeljenjaDodajComponent implements OnInit{

  ngOnInit(): void {
    
    this.dodajForma.controls.izdvojenoOdeljenje.valueChanges.subscribe(izdvojeno => {         //nz kako drugacije da setujem dinamicku validaciju
      const nazivSkoleCtrl = this.dodajForma.controls.nazivIzdvojeneSkole;

      if (izdvojeno) {
        nazivSkoleCtrl.setValidators([Validators.required]);
      } else {
        nazivSkoleCtrl.clearValidators();
        nazivSkoleCtrl.setValue(null);
      }

      nazivSkoleCtrl.updateValueAndValidity();
    });

    this.dodajForma.controls.dvojezicnoOdeljenje.valueChanges.subscribe(dvojezicno=>{    //nz kako drugacije da setujem dinamicku validaciju
      const prviStraniJezik = this.dodajForma.controls.prviStraniJezik;

      if (dvojezicno) {
        prviStraniJezik.setValidators([Validators.required]);
      } else {
        prviStraniJezik.clearValidators();
        prviStraniJezik.setValue(null);
      }
      prviStraniJezik.updateValueAndValidity();
    })

    //ako se vidi input, onda je required, ako ne, nije
    this.dodajForma.controls.celodnevnaNastava.valueChanges.subscribe(celodnevna=>{    //nz kako drugacije da setujem dinamicku validaciju
      const smena = this.dodajForma.controls.smena;

      if (!celodnevna) {
        smena.setValidators([Validators.required]);
      } else {
        smena.clearValidators();
        smena.setValue(null);
      }
      smena.updateValueAndValidity();
    })

    //automatsko racunanje Broja ucenika u realnom vremenu
    this.dodajForma.controls.brojDecaka.valueChanges.subscribe(() =>
      this.azurirajBrojUcenika()
    );

    this.dodajForma.controls.brojDevojcica.valueChanges.subscribe(() =>
      this.azurirajBrojUcenika()
    );

    //dohvatanje razreda iz rute
    const id = this.ruta.snapshot.paramMap.get('id');
    console.log(id)
    if(id) {
      this.razrediServis.dohvatiRazredPoID(+id).subscribe((data: RazredDTO) => {
        this.razred = data;

      //automatski popuni skolsku godinu i razred
      this.dodajForma.controls.razred.setValue(this.razred.razredNaziv)
      this.dodajForma.controls.skolskaGodina.setValue(this.razred.skolskaGodina)
      });    

    }
    //stavke sifrarnika
    this.stavkeSifrarnikaServis.dohvatiSveVrsteOdeljenja().subscribe(data=>{
      if(data){
        console.log(data)
        this.stavkeSifrarnikaVrsteOdeljenja = data;
      }
    })
    this.stavkeSifrarnikaServis.dohvatiSveJezikeNastave().subscribe(data=>{
      if(data){
        console.log(data)
        this.stavkeSifrarnikaJeziciNastave = data;
      }
    })
    this.stavkeSifrarnikaServis.dohvatiSvePrveStranejezike().subscribe(data=>{
      if(data){
        console.log(data)
        this.stavkeSifrarnikaPrviStraniJezici = data;
      }
    })

  }

  ruter = inject(Router)
  ruta = inject(ActivatedRoute)
  odeljenjaServis = inject(OdeljenjaService)
  razrediServis = inject(RazrediService)
  stavkeSifrarnikaServis = inject(StavkeSifrarnikaService)
  
  skolskaGodina='/'
  razred: RazredDTO = new RazredDTO
  stavkeSifrarnika = ['X','Y', 'Z'];
  stavkeSifrarnikaVrsteOdeljenja: StavkeSifrarnikaDTO[] = [];
  stavkeSifrarnikaJeziciNastave: StavkeSifrarnikaDTO[] = [];
  stavkeSifrarnikaPrviStraniJezici: StavkeSifrarnikaDTO[] = [];

  nevalidnaForma: string = '';

  razredi(){
    this.ruter.navigate(['/razredi'])
  }
  odeljenja(){
    this.ruter.navigate(['/odeljenja'])
  }

  dodajForma = new FormGroup({

    skolskaGodina: new FormControl({value:this.skolskaGodina, disabled : true}),                   
    razred: new FormControl({value: '', disabled : true}),
    nazivOdeljenja: new FormControl('',[Validators.required]),
    vrstaOdeljenja: new FormControl('', [Validators.required]),
    kombinovanoOdeljenje: new FormControl(false),
    celodnevnaNastava: new FormControl(false),
    izdvojenoOdeljenje: new FormControl(false),
    nazivIzdvojeneSkole: new FormControl(null),                 //required dinamicki
    odeljenskiStaresina: new FormControl(''),
    smena: new FormControl(null),                              //required dinamicki
    jezikNastave: new FormControl('', [Validators.required]),
    dvojezicnoOdeljenje: new FormControl(false),
    prviStraniJezik: new FormControl(null),                    //required dinamicki
    brojUcenika: new FormControl(0),
    brojDecaka: new FormControl(0, {validators:[Validators.required, Validators.pattern(/^\d+$/), this.brojUcenikaVeciOdNuleValidator]}),
    brojDevojcica: new FormControl(0, {validators:[Validators.required, Validators.pattern(/^\d+$/),  this.brojUcenikaVeciOdNuleValidator]})
    
  })

  brojUcenikaVeciOdNuleValidator(control: FormControl): ValidationErrors | null {
    const value = +control.value;
    return value > 0 ? null: { veciOdNule: true };
  }

  azurirajBrojUcenika() {
    const brojUcenika = this.dodajForma.controls.brojDecaka.value || 0;
    const brojUcenica = this.dodajForma.controls.brojDevojcica.value || 0;
    const zbir = +brojUcenika + +brojUcenica;

    this.dodajForma.controls.brojUcenika.setValue(zbir, { emitEvent: false });    //da se izbegne petlja
  }


  dodajOdeljenje() {
    if (this.dodajForma.valid) {
      this.nevalidnaForma = "";
      const novoOdeljenje: DodajOdeljenjeDTO = {
          id: 0,
          razredId: this.razred.id!,
          skolskaGodina: this.razred.skolskaGodina!,
          naziv: this.dodajForma.value.nazivOdeljenja!,
          vrstaOdeljenja: this.dodajForma.value.vrstaOdeljenja!,
          kombinovano: this.dodajForma.value.kombinovanoOdeljenje!,
          celodnevnaNastava: this.dodajForma.value.celodnevnaNastava!,
          izdvojenoOdeljenje: this.dodajForma.value.izdvojenoOdeljenje!,
          nazivIzdvojeneSkole: this.dodajForma.value.nazivIzdvojeneSkole!,
          odeljenjskiStaresina: this.dodajForma.value.odeljenskiStaresina!,
          smena: this.dodajForma.value.smena!,
          jezikNastave: this.dodajForma.value.jezikNastave!,
          dvojezicno: this.dodajForma.value.dvojezicnoOdeljenje!,
          prviStraniJezik: this.dodajForma.value.prviStraniJezik!,
          brojUcenika: this.dodajForma.value.brojUcenika!,
          brojDecaka: this.dodajForma.value.brojDecaka!,
          brojDevojcica: this.dodajForma.value.brojDevojcica!
      };

      this.odeljenjaServis.dodajOdeljenje(novoOdeljenje).subscribe({
        next: () => {
          alert('Uspešno dodato odeljenje!');
          this.razredi();
        },
        error: (err) => {
          console.error('Greška prilikom dodavanja odeljenja:', err);
          alert('Došlo je do greške prilikom dodavanja odeljenja.');
        }
      });
    }else{
      this.nevalidnaForma = "Forma nije dobro popunjena."
    }
  }
}
