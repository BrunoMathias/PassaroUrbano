import { URL_API } from './app.api';
import { Oferta } from './shared/oferta.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators'



@Injectable()
export class OfertaService{

    

    constructor(private http: HttpClient){}

    //private url_api: string = "http://localhost:3000/ofertas"
    

   public getOfertas(): Promise<Oferta[]> {
        //efetuar um requisição HTTP
        
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta) => resposta)
            
        //Retornar uma promisse com Array Oferta.
    } 

    public getOfertasPorCategoria(categoria: String): Promise<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta) => resposta)
    }

    public getOfertasPorId(id: number): Promise<Oferta>{
        return this.http.get<Oferta>(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta) => resposta)
    }

    public getComoUsarPorId(id: number): Promise<String>{
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta[0].descricao
        })
    }

    public getOndeFicarPorId(id: number): Promise<String>{
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta[0].descricao
        })
    }

        public pesquisaOfertas(termo: String): Observable<Oferta[]>{
            return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10),map((resposta: any) => resposta))
        }
    /*
    public getOfertas():Promise<Oferta[]>{
        return this.http
           .get<Oferta[]>('http://localhost:3000/ofertas')
           .toPromise()
           .then((resposta)=> resposta)
   }*/

    /*public getOfertas2(): Promise<Array<Oferta>>{
        return new Promise((resolve,reject) => {
            console.log('Passou por aqui?')
            let deu_certo = true //forçando o reject ou resolve
            
            if(deu_certo){
                setTimeout(() => resolve(this.ofertas), 3000 )//Quando for montada radd a This>Ofertas
                
            }
            else{
                reject({codigo_erro: 404, mensagem_erro: "Servidor Não Encontrado"})
            }
            
        })
        .then((oferta: Array<Oferta>) =>
        {
            console.log('Primeiro Then')
            return oferta
        }        
        )
        .then((oferta: Array<Oferta>) => {
            return new Promise((resolve2, reject2) => {
                console.log('Segundo Then')
                setTimeout(() => {resolve2(oferta)}, 3000 )
            })
        } ).then((oferta: Array<Oferta>) =>
        {
            console.log('Terceiro Then')
            return oferta
        }        
        )
    } */
}
