import { OfertaService } from './../../ofertas.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertaService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: String = ''

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaService
    ) { }

  ngOnInit() {
    
    
  
    this.route.parent.params.subscribe((parametro: Params) => {
      this.ofertaService.getComoUsarPorId(parametro.id)
      .then((resposta: String) => {
        this.comoUsar = resposta
      })
    })

  }

}
