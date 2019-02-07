import { OfertaService } from './../ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';



@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertaService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Array<Oferta>>


  public subjectPesquisa: Subject<String> = new Subject<String>()

  constructor(private ofertaService: OfertaService) { 
    
  }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(debounceTime(1000)//executa a ação switchMap após 1,5s
    ,distinctUntilChanged(),
      switchMap((termo: string) => {
        if(termo.trim() ===''){
          //retornar um observable de arrayd e ofertas vazio
          return of<Oferta[]>([]);
        }
        return this.ofertaService.pesquisaOfertas(termo);
      }),catchError((err: any) => {
        console.log(err)
        return of<Oferta[]>([]);
      })
    )


    
    //Efeito Transição Barra de Navegação
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-110px";
      }
      prevScrollpos = currentScrollPos;
      }
  }

  public pesquisa(termoDaBusca: string): void{
    this.subjectPesquisa.next(termoDaBusca)
    
    /*console.log(termoDaBusca)
    this.ofertas = this.ofertaService.pesquisaOfertas(termoDaBusca)
      
    
    this.ofertas.subscribe(
      ((ofertas:Oferta[]) => 
        console.log(ofertas)
      ),
      ((erou:any) => {
        console.log("Error: ", erou.name)
      }),
      (() => console.log("Fluxo de eventos completo"))
    )*/

    
  }

  public limpaPesquisa(): void{
    this.subjectPesquisa.next('')
  }

  
  
}
