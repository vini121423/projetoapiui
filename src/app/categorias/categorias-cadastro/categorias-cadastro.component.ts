import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CategoriasService } from '../categorias.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-categorias-cadastro',
  templateUrl: './categorias-cadastro.component.html',
  styleUrls: ['./categorias-cadastro.component.css']
})
export class CategoriasCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService

  ) { }

  ngOnInit() {
    this.configurarFormulario();
    const idCategoria = this.route.snapshot.params['id'];

    if (idCategoria) {
      this.carregarCategoria(idCategoria);
    }
  }

  carregarCategoria(id: number) {
    this.categoriasService.buscarPorId(id).then(categoria => {
      this.formulario.patchValue(categoria);
    }).catch(erro => this.errorHandler.handle(erro));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.maxLength(20)]]
    })
  }

  get atualizando(){
    return Boolean(this.formulario.get('id').value);
    
  }


  salvar() {
    if(this.atualizando){
      this.atualizarCategoria();
    } else{
      this.adicionarCategoria();
    }
  }

  adicionarCategoria() {
    this.categoriasService.adicionar(this.formulario.value).then(categoriaAdicionada => {
      this.messageService.add({ severity: 'success', detail: 'Categoria adicionada!', summary: 'Concluído' });

      this.router.navigate(['/categorias']);
    }).catch(erro => this.errorHandler.handle(erro));
  }


  atualizarCategoria() {
    this.categoriasService.alterar(this.formulario.value).then(categoria => {
      this.formulario.patchValue(categoria);
      this.messageService.add({ severity: 'success', detail: 'Categoria alterada com sucesso!', summary: 'Concluído' });
    }).catch(erro => this.errorHandler.handle(erro));
  }
}
