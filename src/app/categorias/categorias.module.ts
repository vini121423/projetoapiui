import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasCadastroComponent } from './categorias-cadastro/categorias-cadastro.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [CategoriasPesquisaComponent, CategoriasCadastroComponent],
  exports: [CategoriasPesquisaComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TableModule,
    TooltipModule,
    FormsModule
  ]
})
export class CategoriasModule { }
