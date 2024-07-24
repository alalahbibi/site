import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ApiCommandeService } from '../services/api-commande.service';
import { ApiProduitService } from '../services/api-produit.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


  user:any

  sidebarOpen: boolean = true;

 
 
  constructor(private sharedService: SharedService, private api:ApiCommandeService) {}

  ngOnInit() {
    this.sharedService.sidebarOpen$.subscribe(open => {
      this.sidebarOpen = open;
    });

    this.getCommande();
  }

  getCommande(){
    this.api.getCommandes().subscribe((data:any)=>{
      console.log("contactcommande",data)
      this.user=data.contactcommande;
    })
    
  }


}
