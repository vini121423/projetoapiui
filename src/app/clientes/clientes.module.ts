import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { ClientesCadastroComponent } from './clientes-cadastro/clientes-cadastro.component';



@NgModule({
  declarations: [ClientesPesquisaComponent, ClientesCadastroComponent],
  exports: [ClientesPesquisaComponent],
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
export class ClientesModule { }
