import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CidadesModule } from './cidades/cidades.module';
import { RouterModule, Routes } from '@angular/router';
import { CidadesPesquisaComponent } from './cidades/cidades-pesquisa/cidades-pesquisa.component';
import { CidadesService } from './cidades/cidades.service';
import { HttpClientModule } from '@angular/common/http';
import { ClientesModule } from './clientes/clientes.module';
import { ClientesPesquisaComponent } from './clientes/clientes-pesquisa/clientes-pesquisa.component';
import { ClientesService } from './clientes/clientes.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService,MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ErrorHandlerService } from './core/error-handler.service';
import { CidadesCadastroComponent } from './cidades/cidades-cadastro/cidades-cadastro.component';
import { ClientesCadastroComponent } from './clientes/clientes-cadastro/clientes-cadastro.component';
import { ProdutosCadastroComponent } from './produtos/produtos-cadastro/produtos-cadastro.component';
import { CategoriasCadastroComponent } from './categorias/categorias-cadastro/categorias-cadastro.component';
import { ProdutosService } from './produtos/produtos.service';
import { CategoriasService } from './categorias/categorias.service';
import { CategoriasPesquisaComponent } from './categorias/categorias-pesquisa/categorias-pesquisa.component';
import { ProdutosPesquisaComponent } from './produtos/produtos-pesquisa/produtos-pesquisa.component';
import { CategoriasModule } from './categorias/categorias.module';
import { ProdutosModule } from './produtos/produtos.module';



const routes: Routes = [
{path: 'cidades', component: CidadesPesquisaComponent},
{path: 'cidades/novo', component: CidadesCadastroComponent},
{path: 'cidades/:id', component: CidadesCadastroComponent},
{path: 'clientes', component: ClientesPesquisaComponent},
{path: 'clientes/novo', component: ClientesCadastroComponent},
{path: 'clientes/:id', component: ClientesCadastroComponent},
{path: 'categorias', component: CategoriasPesquisaComponent},
{path: 'categorias/nova', component: CategoriasCadastroComponent},
{path: 'categorias/:id', component: CategoriasCadastroComponent},
{path: 'produtos/novo', component: ProdutosCadastroComponent},
{path: 'produtos/:id', component: ProdutosCadastroComponent},
{path: 'produtos', component: ProdutosPesquisaComponent}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    ToastModule,
    CidadesModule,
    ClientesModule,
	CategoriasModule,
	ProdutosModule,
    ConfirmDialogModule
    
   
  ],
  providers: [CidadesService,ClientesService,CategoriasService,ProdutosService,ConfirmationService,MessageService,ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
