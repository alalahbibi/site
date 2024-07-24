import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Add this line
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';  // Importez ReactiveFormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ClientsComponent } from './clients/clients.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash/dash.component';
import { ProduitComponent } from './produit/produit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { PersonnelsComponent } from './personnels/personnels.component';
import { CommandePComponent } from './commande-p/commande-p.component';
import { ProduitPComponent } from './produit-p/produit-p.component';
import { SidebarPComponent } from './sidebar-p/sidebar-p.component';
import { AdminIconComponent } from './admin-icon/admin-icon.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { StatComponent } from './stat/stat.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CommandesComponent, 
    ClientsComponent,
    DashComponent,
    ProduitComponent,
    ProductDetailsComponent,
    LoginComponent,
    TestComponent,
    AdminFormComponent,
    PersonnelsComponent,
    CommandePComponent,
    ProduitPComponent,
    SidebarPComponent,
    AdminIconComponent,
    StatistiquesComponent,
    StatComponent,

    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    MatSnackBarModule,
    ReactiveFormsModule,  // Ajoutez ReactiveFormsModule ici
    
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
