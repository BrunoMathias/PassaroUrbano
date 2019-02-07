import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertaService]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: String = ''

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaService
    ) { }

  ngOnInit() {
    

    this.route.parent.params.subscribe((parametro: Params) => {
      this.ofertaService.getOndeFicarPorId(parametro.id)
    .then((resposta: String) => {
      this.ondeFica = resposta
    })
    })
  }


}
