import { Component, OnInit, Input } from '@angular/core';
import { Commande } from '../commandes/commandes.component'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  @Input() commandes: Commande[] = [];
  statistiques: { title: string, montant: number, commandes: number }[] = [];

  ngOnInit(): void {
    this.calculateStats();
  }

  ngOnChanges(): void {
    this.calculateStats();
  }

  calculateStats(): void {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const todayOrders = this.commandes.filter(cmd => new Date(cmd.Date).toDateString() === new Date().toDateString());
    const weekOrders = this.commandes.filter(cmd => new Date(cmd.Date) >= startOfWeek);
    const monthOrders = this.commandes.filter(cmd => new Date(cmd.Date) >= startOfMonth);

    this.statistiques = [
      {
        title: "Nombre de commandes aujourd'hui",
        montant: todayOrders.reduce((sum, cmd) => sum + cmd.total, 0),
        commandes: todayOrders.length
      },
      {
        title: "Nombre de commandes cette semaine",
        montant: weekOrders.reduce((sum, cmd) => sum + cmd.total, 0),
        commandes: weekOrders.length
      },
      {
        title: "Nombre de commandes ce mois-ci",
        montant: monthOrders.reduce((sum, cmd) => sum + cmd.total, 0),
        commandes: monthOrders.length
      },
      {
        title: "Total",
        montant: this.commandes.reduce((sum, cmd) => sum + cmd.total, 0),
        commandes: this.commandes.length
      }
    ];
  }
}
