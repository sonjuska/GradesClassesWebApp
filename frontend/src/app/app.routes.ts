import { Routes } from '@angular/router';
import { RazrediPrikazComponent } from './razredi/razredi-prikaz/razredi-prikaz.component';
import { RazrediIzmeniComponent } from './razredi/razredi-izmeni/razredi-izmeni.component';
import { OdeljenjaPrikazComponent } from './odeljenja/odeljenja-prikaz/odeljenja-prikaz.component';
import { DodajRazredComponent } from './razredi/dodaj-razred/dodaj-razred.component';
import { OdeljenjaIzmeniComponent } from './odeljenja/odeljenja-izmeni/odeljenja-izmeni.component';
import { OdeljenjaDodajComponent } from './odeljenja/odeljenja-dodaj/odeljenja-dodaj.component';

export const routes: Routes = [
    {path: '', component: RazrediPrikazComponent},
    {path: 'razredi', component: RazrediPrikazComponent},
    {path: 'razredIzmeni/:id', component: RazrediIzmeniComponent},
    {path: 'dodajRazred', component: DodajRazredComponent},
    {path: 'odeljenja', component:OdeljenjaPrikazComponent},
    {path: 'odeljenja/:id', component: OdeljenjaPrikazComponent},
    {path: 'odeljenja/dodaj/:id', component: OdeljenjaDodajComponent},
    {path: 'odeljenja/izmeni/:id', component: OdeljenjaIzmeniComponent}
];
