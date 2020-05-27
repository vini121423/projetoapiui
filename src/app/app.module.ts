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

const routes: Routes = [
{path: 'cidades', component: CidadesPesquisaComponent},
{path: 'clientes', component: ClientesPesquisaComponent}
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
    ConfirmDialogModule
    
   
  ],
  providers: [CidadesService,ClientesService,ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
