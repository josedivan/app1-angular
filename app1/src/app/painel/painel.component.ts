import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'
@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: frase[] = FRASES
  public instrucao: string = 'Traduza a frase'
  public resposta: string = ''

  public rodada: number = 0;
  public rodadaFrase!: frase;
  public progresso: number = 0

  public tentativas: number = 3
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()


  constructor() {
    this.atualizaRodada()

  }

  ngOnInit(): void {
  }
  ngOnDestroy() {

  }

  public atualizarResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
    //console.log(this.resposta)
  }
  public verificarResposta(): void {


    if (this.rodadaFrase.frasePtBr == this.resposta) {

      this.rodada++

      if (this.rodada === 4) {
        this.encerrarJogo.emit('Vitória')
      }

      // Atualiza o objeto da rodadaFrase
      this.atualizaRodada()
      // progresso 
      this.progresso = this.progresso + (100 / this.frases.length)

    } else {
      this.tentativas--

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('Derrota')
      }

    }
  }

  public atualizaRodada(): void {

    // Define a frase da rodada em alguam base da logica 
    this.rodadaFrase = this.frases[this.rodada]


    // limpar resposta 

    this.resposta = ''


  }

}


