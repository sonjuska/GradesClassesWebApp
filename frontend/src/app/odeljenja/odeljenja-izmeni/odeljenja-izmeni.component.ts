import { Component, inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OdeljenjaService } from '../odeljenja.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../dodatneKomponente/input/input.component';
import { RazredDTO } from '../../DTO/RazredDTO';
import { StavkeSifrarnikaDTO } from '../../DTO/StavkaSifrarnikaDTO';
import { RazrediService } from '../../razredi/razredi.service';
import { DodajOdeljenjeDTO } from '../../DTO/DodajOdeljenjeDTO';
import { StavkeSifrarnikaService } from '../../sifrarnici/stavke-sifrarnika.service';

@Component({
  selector: 'app-odeljenja-izmeni',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './odeljenja-izmeni.component.html',
  styleUrl: './odeljenja-izmeni.component.css'
})
export class OdeljenjaIzmeniComponent implements OnInit {

  ngOnInit(): void {
    this.izmeniForma.controls.izdvojenoOdeljenje.valueChanges.subscribe(izdvojeno => {         //nz kako drugacije da setujem dinamicku validaciju
      const nazivSkoleCtrl = this.izmeniForma.controls.nazivIzdvojeneSkole;

      if (izdvojeno) {
        nazivSkoleCtrl.setValidators([Validators.required]);
      } else {
        nazivSkoleCtrl.clearValidators();
        nazivSkoleCtrl.setValue(null);
      }

      nazivSkoleCtrl.updateValueAndValidity();
    });

    this.izmeniForma.controls.dvojezicnoOdeljenje.valueChanges.subscribe(dvojezicno=>{    //nz kako drugacije da setujem dinamicku validaciju
      const prviStraniJezik = this.izmeniForma.controls.prviStraniJezik;

      if (dvojezicno) {
        prviStraniJezik.setValidators([Validators.required]);
      } else {
        prviStraniJezik.clearValidators();
        prviStraniJezik.setValue(null);
      }
      prviStraniJezik.updateValueAndValidity();
    })

    //ako se vidi input, onda je required, ako ne, nije
    this.izmeniForma.controls.celodnevnaNastava.valueChanges.subscribe(celodnevna=>{    //nz kako drugacije da setujem dinamicku validaciju
      const smena = this.izmeniForma.controls.smena;

      if (!celodnevna) {
        smena.setValidators([Validators.required]);
      } else {
        smena.clearValidators();
        smena.setValue(null);
      }
      smena.updateValueAndValidity();
    })

    //dohvatanje odeljenja iz rute
    const id = this.ruta.snapshot.paramMap.get('id');
    console.log(id)
    if(id) {
      this.odeljenjaServis.dohvatiCeloOdeljenjePoID(+id).subscribe((data: DodajOdeljenjeDTO) => {
        this.odeljenje = data;
        console.log(data)

        this.razrediServis.dohvatiRazredPoID(this.odeljenje.razredId).subscribe(data=>{
          this.razred = data
          //automatski popuni polja trenutnim odeljenjem
          this.izmeniForma.controls.skolskaGodina.setValue(this.razred.skolskaGodina);
          this.izmeniForma.controls.razred.setValue(this.razred.razredNaziv);
          this.izmeniForma.controls.nazivOdeljenja.setValue(this.odeljenje.naziv);
          this.izmeniForma.controls.vrstaOdeljenja.setValue(this.odeljenje.vrstaOdeljenja);
          this.izmeniForma.controls.kombinovanoOdeljenje.setValue(this.odeljenje.kombinovano);
          this.izmeniForma.controls.celodnevnaNastava.setValue(this.odeljenje.celodnevnaNastava);
          this.izmeniForma.controls.izdvojenoOdeljenje.setValue(this.odeljenje.izdvojenoOdeljenje);
          this.izmeniForma.controls.nazivIzdvojeneSkole.setValue(this.odeljenje.nazivIzdvojeneSkole);
          this.izmeniForma.controls.odeljenskiStaresina.setValue(this.odeljenje.odeljenjskiStaresina);
          this.izmeniForma.controls.smena.setValue(this.odeljenje.smena);
          this.izmeniForma.controls.jezikNastave.setValue(this.odeljenje.jezikNastave);
          this.izmeniForma.controls.dvojezicnoOdeljenje.setValue(this.odeljenje.dvojezicno);
          this.izmeniForma.controls.prviStraniJezik.setValue(this.odeljenje.prviStraniJezik);
          this.izmeniForma.controls.brojUcenika.setValue(this.odeljenje.brojUcenika);
          this.izmeniForma.controls.brojDecaka.setValue(this.odeljenje.brojDecaka);
          this.izmeniForma.controls.brojDevojcica.setValue(this.odeljenje.brojDevojcica);
        })
      
      });    

    }
    

    //automatsko racunanje Broja ucenika u realnom vremenu
    this.izmeniForma.controls.brojDecaka.valueChanges.subscribe(() =>
      this.azurirajBrojUcenika()
    );

    this.izmeniForma.controls.brojDevojcica.valueChanges.subscribe(() =>
      this.azurirajBrojUcenika()
    );

    //ucitaj stavke sifrarnika
    this.ucitajStavkeSifrarnika();
    this.nevalidnaForma= '';
  
  }

  ruter = inject(Router)
  ruta = inject(ActivatedRoute)
  odeljenjaServis = inject(OdeljenjaService)
  razrediServis = inject(RazrediService)
  stavkeSifrarnikaServis = inject(StavkeSifrarnikaService)
  
  skolskaGodina='/'
  razred: RazredDTO = new RazredDTO
  odeljenje: DodajOdeljenjeDTO = new DodajOdeljenjeDTO()
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

  izmeniForma = new FormGroup({

    skolskaGodina: new FormControl({value:this.skolskaGodina, disabled : true}),                   
    razred: new FormControl({value: '', disabled : true}),
    nazivOdeljenja: new FormControl('',[Validators.required]),
    vrstaOdeljenja: new FormControl('', [Validators.required]),
    kombinovanoOdeljenje: new FormControl(false),
    celodnevnaNastava: new FormControl(false),
    izdvojenoOdeljenje: new FormControl(false),
    nazivIzdvojeneSkole: new FormControl<string|null>(null),                 //required dinamicki
    odeljenskiStaresina: new FormControl(''),
    smena: new FormControl<string|null>(null),                              //required dinamicki
    jezikNastave: new FormControl('', [Validators.required]),
    dvojezicnoOdeljenje: new FormControl(false),
    prviStraniJezik: new FormControl<string|null>(null),                    //required dinamicki
    brojUcenika: new FormControl(0),
    brojDecaka: new FormControl(0, {validators:[Validators.required, Validators.pattern(/^\d+$/), this.brojUcenikaVeciOdNuleValidator]}),
    brojDevojcica: new FormControl(0, {validators:[Validators.required, Validators.pattern(/^\d+$/),  this.brojUcenikaVeciOdNuleValidator]})
    
  })

  brojUcenikaVeciOdNuleValidator(control: FormControl): ValidationErrors | null {
    const value = +control.value;
    return value > 0 ? null: { veciOdNule: true };
  }

  azurirajBrojUcenika() {
    const brojUcenika = this.izmeniForma.controls.brojDecaka.value || 0;
    const brojUcenica = this.izmeniForma.controls.brojDevojcica.value || 0;
    const zbir = +brojUcenika + +brojUcenica;

    this.izmeniForma.controls.brojUcenika.setValue(zbir, { emitEvent: false });    //da se izbegne petlja
  }

  izmeniOdeljenje() {
    if (this.izmeniForma.valid) {
      this.nevalidnaForma = "";

      const izmenjenoOdeljenje: DodajOdeljenjeDTO = {
        id: this.odeljenje.id,
        skolskaGodina: this.razred.skolskaGodina,
        razredId: this.razred.id,
        naziv: this.izmeniForma.value.nazivOdeljenja!,
        vrstaOdeljenja: this.izmeniForma.value.vrstaOdeljenja!,
        kombinovano: this.izmeniForma.value.kombinovanoOdeljenje!,
        celodnevnaNastava: this.izmeniForma.value.celodnevnaNastava!,
        izdvojenoOdeljenje: this.izmeniForma.value.izdvojenoOdeljenje!,
        nazivIzdvojeneSkole: this.izmeniForma.value.nazivIzdvojeneSkole || '',
        odeljenjskiStaresina: this.izmeniForma.value.odeljenskiStaresina!,
        smena: this.izmeniForma.value.smena || '',
        jezikNastave: this.izmeniForma.value.jezikNastave!,
        dvojezicno: this.izmeniForma.value.dvojezicnoOdeljenje!,
        prviStraniJezik: this.izmeniForma.value.prviStraniJezik || '',
        brojUcenika: this.izmeniForma.value.brojUcenika!,
        brojDecaka: this.izmeniForma.value.brojDecaka!,
        brojDevojcica: this.izmeniForma.value.brojDevojcica!
      };

      this.odeljenjaServis.izmeniOdeljenje(izmenjenoOdeljenje).subscribe({
        next: () => {
          alert('Uspešno izmenjeno odeljenje!');
          this.odeljenja();
        },
        error: (err) => {
          console.error('Greška prilikom izmene odeljenja:', err);
          alert('Došlo je do greške prilikom izmene.');
        }
      });

    }else {
        this.nevalidnaForma = "Forma nije dobro popunjena.";
    }
  }
  ucitajStavkeSifrarnika(){
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

  resetuj(){
    this.izmeniForma.reset()
  }

}
