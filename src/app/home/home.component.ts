import { Oferta } from './../shared/oferta.model';
import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../ofertas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertaService]
})
export class HomeComponent implements OnInit {

  public ofertas: Array<Oferta> //Defino que recebe Array do tipo Oferta

  constructor(private ofertasService: OfertaService) { }

  ngOnInit() {
    //this.ofertas = this.ofertasService.getOfertas()//Atribuo o servço de oferta
    //console.log(this.ofertas)

    this.ofertasService.getOfertas()
      .then(
      (oferta: Array<Oferta>) => {
        this.ofertas = oferta}//Retorno da promisse resolvida 
      )
      .catch(
      (erro: any) => {console.log(erro)}//retorno promisse rejeitada
      )
  }

}
