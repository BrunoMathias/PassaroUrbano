import { OfertaService } from './../ofertas.service';
import { Oferta } from './../shared/oferta.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertaService]
})
export class DiversaoComponent implements OnInit {

  constructor(private ofertaService: OfertaService) { }

  public ofertas: Oferta[]

  ngOnInit() {

    this.ofertaService.getOfertasPorCategoria('diversao')
      .then((oferta: Oferta[]) => {
          this.ofertas = oferta
      })
  }

}
