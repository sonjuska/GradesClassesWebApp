export class DodajOdeljenjeDTO{
    id: number = 0
    skolskaGodina: string = ''
    razredId: number = 0
    naziv: string = ''
    vrstaOdeljenja: string = ''
    kombinovano: boolean = false
    celodnevnaNastava: boolean = false
    izdvojenoOdeljenje: boolean = false
    nazivIzdvojeneSkole: string|null = null
    odeljenjskiStaresina: string = ''
    smena: string|null = null
    jezikNastave: string = ''
    dvojezicno: boolean = false
    prviStraniJezik: string|null = null
    brojUcenika: number = 0
    brojDecaka: number = 0
    brojDevojcica: number = 0
}