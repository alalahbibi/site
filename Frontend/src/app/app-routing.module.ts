import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ClientsComponent } from './clients/clients.component';
import { DashComponent } from './dash/dash.component';
import { ProduitComponent } from './produit/produit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { PersonnelsComponent } from './personnels/personnels.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { CommandePComponent } from './commande-p/commande-p.component';
import { ProduitPComponent } from './produit-p/produit-p.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dash', component: DashComponent},
  { path: 'sidebar', component: SidebarComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'produits', component: ProduitComponent},
  { path: 'pl', component: ProductDetailsComponent},
  { path: 'tst', component: TestComponent},
  { path: 'admin', component: AdminFormComponent, },
  { path: 'personnel', component: PersonnelsComponent },
  { path: 'commande-p', component: CommandePComponent },
  { path: 'produit-p', component: ProduitPComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
