import { OfertaService } from './../ofertas.service';
import { Oferta } from './../shared/oferta.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';






@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertaService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  

  constructor(
    private ofertaService: OfertaService,
    private route: ActivatedRoute
    ) { }

    public ofertas: Oferta

  ngOnInit() {
    
    let rota: number
    rota = this.route.snapshot.params['id']

    this.ofertaService.getOfertasPorId(rota)
    .then((resposta: Oferta) => {
      this.ofertas = resposta
    })

    this.route.params.subscribe((parametro: Params) => {
      this.ofertaService.getOfertasPorId(parametro.id)
        .then((resposta: Oferta) => {
          this.ofertas = resposta
        })
    })

    
    
    
  }

  ngOnDestroy(){

  }

  
}
