import { Component, OnInit } from '@angular/core';
import { ApiProduitService } from '../services/api-produit.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ApiCommandeService } from '../services/api-commande.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  loginTimes: { username: string; time: string }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }
}
