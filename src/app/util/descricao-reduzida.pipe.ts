import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name: 'descicaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto: String, trumcarEm: number): String{
        if(texto.length > trumcarEm){
            return texto.substr(0,trumcarEm) + "..."
        }
        return texto
    }
}