import { Pedido } from './../shared/pedido.model';
import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number  
  public pedido: Pedido = new Pedido()

  //--------------------------
  public endereco: String = ""
  public numero: String = "" 
  public complemento: String = ""
  public formaPagamento: String = ""

  //-------------- Validação Dos Campos

  public validacaoEndereco: boolean
  public validacaoNumero: boolean
  public validacaoComplemento: boolean
  public validacaoPagamento: boolean

  //------------ Estados Primitivos dos campos (pristine)

  public enderecoEstadoPrimitivo:boolean =  true
  public numeroEstadoPrimitivo:boolean = true
  public complementoEstadoPrimitivo:boolean = true
  public pagamentoEstadoPrimitivo:boolean = true

  //----------- Controla Botão Comprar

  public formEstado: String = 'disabled'

    
  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
  
      //this.ordemCompraService.efetivarCompra()

  }

  public atualizaEndereco(endereco: String ): void{
    this.endereco = endereco
    //console.log(this.endereco)
    this.enderecoEstadoPrimitivo = false

     if(this.endereco.length > 3){
       this.validacaoEndereco = true
     }
     else{
       this.validacaoEndereco = false
     }
     this.habilitaForm()

  }

  public atualizaNumero(numero: String): void {
    this.numero = numero
    
    this.numeroEstadoPrimitivo = false

    if(this.numero > ''){
      this.validacaoNumero = true
    }
    else{
      console.log("Numero Invalido")
      this.validacaoNumero = false
    }
    this.habilitaForm()
  }

  public atualizaComplemento(complemento: String): void {
    this.complemento = complemento
    
    this.complementoEstadoPrimitivo = false


    if(this.complemento.length > 0){
      this.validacaoComplemento = true
    } 
  }

  public atualizaFormaPagamento(formaPagamento: String): void {
    this.formaPagamento = formaPagamento
    
    this.pagamentoEstadoPrimitivo = false

    if(this.formaPagamento.length > 0){
      this.validacaoPagamento = true
    }
    else{
      this.validacaoPagamento = false
    }
    this.habilitaForm()
  }

  public habilitaForm(): void {
    if(this.validacaoPagamento == true && this.validacaoNumero == true && this.validacaoEndereco == true){
      this.formEstado = ''
    }else{
      this.formEstado = 'disabled'
    }
  }

  public confirmarCompra(): void{

    this.pedido.endereco = this.endereco
    this.pedido.complemento = this.complemento
    this.pedido.numero = this.numero
    this.pedido.formaPagamento = this.formaPagamento
    
    this.ordemCompraService.efetivarCompra(this.pedido)
      .subscribe((resposta: any) => {
        this.idPedidoCompra = resposta
        
      })
  }



}
