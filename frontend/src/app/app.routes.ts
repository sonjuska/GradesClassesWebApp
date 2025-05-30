import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '',
        loadComponent: () => import('./razredi/razredi-prikaz/razredi-prikaz.component')  //lazy loading
      .then(m => m.RazrediPrikazComponent)},
    {path: 'razredi',
        loadComponent: () => import('./razredi/razredi-prikaz/razredi-prikaz.component')
      .then(m => m.RazrediPrikazComponent)},
    {path: 'razredIzmeni/:id',
        loadComponent: () => import('./razredi/razredi-izmeni/razredi-izmeni.component')
      .then(m => m.RazrediIzmeniComponent)},
    {path: 'dodajRazred',
        loadComponent: () => import('./razredi/dodaj-razred/dodaj-razred.component')
      .then(m => m.DodajRazredComponent)},
    {path: 'odeljenja',
        loadComponent: () => import('./odeljenja/odeljenja-prikaz/odeljenja-prikaz.component')
      .then(m => m.OdeljenjaPrikazComponent)},
    {path: 'odeljenja/:id',
        loadComponent: () => import('./odeljenja/odeljenja-prikaz/odeljenja-prikaz.component')
      .then(m => m.OdeljenjaPrikazComponent)},
    {path: 'odeljenja/dodaj/:id',
        loadComponent: () => import('./odeljenja/odeljenja-dodaj/odeljenja-dodaj.component')
      .then(m => m.OdeljenjaDodajComponent)},
    {path: 'odeljenja/izmeni/:id',
        loadComponent: () => import('./odeljenja/odeljenja-izmeni/odeljenja-izmeni.component')
      .then(m => m.OdeljenjaIzmeniComponent)
    }
];
