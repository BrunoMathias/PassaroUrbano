import { OfertaService } from './../ofertas.service';
import { Oferta } from './../shared/oferta.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertaService]
})
export class RestaurantesComponent implements OnInit {

  constructor(private ofertaService: OfertaService) { }

  //public ofertas: Array<Oferta>
  public ofertas: Array<Oferta>

  ngOnInit() {
    this.ofertaService.getOfertasPorCategoria('restaurante')
      .then((ofertas: Array<Oferta>) => {
        this.ofertas = ofertas
      })
  }

}
