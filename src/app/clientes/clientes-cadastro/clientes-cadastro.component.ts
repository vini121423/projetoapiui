import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CidadesService } from 'src/app/cidades/cidades.service';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.css']
})
export class ClientesCadastroComponent implements OnInit {
  clientes = [];
  cidades = [];
  formulario: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private cidadeService: CidadesService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private errorHandler: ErrorHandlerService

  ) { }

  ngOnInit() {
    this.configurarFormulario();
    const idcliente = this.route.snapshot.params['id'];
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      telefone: [null, [Validators.required]],
      cidade:this.formBuilder.group({
        id: [null, Validators.required],
        nome:[]
      })
 
    });
  }

  carregarCidades(){
   return this.cidadeService.listarTodasCidades().then(cidades =>{
      this.cidades = cidades
      .map(c => ({
        label: c.nome,
        value: c.id
      }))
   }).catch(erro => this.errorHandler.handle(erro));
  }


  adicionarCliente(){
     
  }

  salvar() {
    this.clienteService.adicionar(this.formulario.value).then(clienteAdicionado => {
      this.messageService.add({ severity: 'success', detail: 'Cliente adicionado com sucesso', summary: 'Concluído' });
      this.router.navigate(['/clientes']);
    }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCliente(){
    this.clienteService.atualizar(this.formulario.value).then(cliente =>{
      this.formulario.patchValue(cliente);
      this.messageService.add({severity: 'success',detail:'Cliente alterado com sucesso!',summary:'Concluído'});

    })
  }

}
