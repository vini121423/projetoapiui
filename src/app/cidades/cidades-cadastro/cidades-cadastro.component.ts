import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadesService } from '../cidades.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-cidades-cadastro',
  templateUrl: './cidades-cadastro.component.html',
  styleUrls: ['./cidades-cadastro.component.css']
})
export class CidadesCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cidadesService: CidadesService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const idcidade = this.route.snapshot.params['id'];
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      estado: [null, [Validators.required, Validators.maxLength(2)]]
    });
  }

  adicionarCidade(){
     
   }

    salvar() {
    this.cidadesService.adicionar(this.formulario.value).then(cidadeAdicionada => {
      this.messageService.add({ severity: 'success', detail: 'Cidade adicionada com sucesso!', summary: 'Concluído' })

      // Manda o usuário de volta para a página de cidades //
      this.router.navigate(['/cidades']);
    }).catch(erro => this.errorHandler.handle(erro));

  }

  atualizarCidade(){
    this.cidadesService.atualizar(this.formulario.value).then(cidade =>{
      this.formulario.patchValue(cidade);
      this.messageService.add({severity:'success',detail: 'Cidade alterada com sucesso!',summary:'Concluído'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
