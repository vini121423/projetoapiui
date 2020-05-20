import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadesPesquisaComponent } from './cidades-pesquisa/cidades-pesquisa.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CidadesPesquisaComponent],
  exports: [CidadesPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ]
})
export class CidadesModule { }
