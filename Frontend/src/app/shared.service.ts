// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sidebarOpen = new BehaviorSubject<boolean>(true);
  sidebarOpen$ = this.sidebarOpen.asObservable();
  private dropdownState = new BehaviorSubject<boolean>(false);
  currentDropdownState = this.dropdownState.asObservable();

  private villesTunisie = [
    {
      nom: 'Ariana',
      delegations: [
        'Ariana Ville', 'Soukra', 'Raoued', 'Kalaat el-Andalous', 'Sidi Thabet', 'Mnihla'
      ]
    },
    {
      nom: 'Béja',
      delegations: [
        'Béja Nord', 'Béja Sud', 'Amdoun', 'Nefza', 'Téboursouk', 'Testour', 'Goubellat', 'Thibar'
      ]
    },
    {
      nom: 'Ben Arous',
      delegations: [
        'Ben Arous', 'Bou Mhel el-Bassatine', 'El Mourouj', 'Ezzahra', 'Fouchana', 'Hammam Chott', 'Hammam Lif', 'Mohamedia', 'Medina Jedida', 'Mégrine', 'Mornag', 'Radès'
      ]
    },
    {
      nom: 'Bizerte',
      delegations: [
        'Bizerte Nord', 'Bizerte Sud', 'El Alia', 'Menzel Bourguiba', 'Menzel Jemil', 'Sejnane', 'Tinja', 'Utique', 'Ghar El Melh', 'Joumine'
      ]
    },
    {
      nom: 'Gabès',
      delegations: [
        'Gabès Médina', 'Gabès Ouest', 'Gabès Sud', 'Ghannouch', 'Métouia', 'Mareth', 'Nouvelle Matmata', 'El Hamma', 'Menzel Habib'
      ]
    },
    {
      nom: 'Gafsa',
      delegations: [
        'Gafsa Nord', 'Gafsa Sud', 'El Guettar', 'Métlaoui', 'Moularès', 'Redeyef', 'Sened', 'Sidi Aïch'
      ]
    },
    {
      nom: 'Jendouba',
      delegations: [
        'Jendouba Nord', 'Jendouba Sud', 'Bou Salem', 'Tabarka', 'Aïn Draham', 'Fernana', 'Ghardimaou', 'Oued Meliz'
      ]
    },
    {
      nom: 'Kairouan',
      delegations: [
        'Kairouan Nord', 'Kairouan Sud', 'Bou Hajla', 'Chebika', 'Haffouz', 'Hajeb El Ayoun', 'Nasrallah', 'Oueslatia', 'Sbikha'
      ]
    },
    {
      nom: 'Kasserine',
      delegations: [
        'Kasserine Nord', 'Kasserine Sud', 'Ezzouhour', 'Hassi El Ferid', 'Sbeitla', 'Sbiba', 'Thala', 'Foussana', 'Fériana', 'Majel Bel Abbès'
      ]
    },
    {
      nom: 'Kébili',
      delegations: [
        'Kébili Nord', 'Kébili Sud', 'Douz Nord', 'Douz Sud', 'Souk Lahad', 'El Faouar'
      ]
    },
    {
      nom: 'Le Kef',
      delegations: [
        'Le Kef Ouest', 'Le Kef Est', 'Dahmani', 'Jérissa', 'El Ksour', 'Sers', 'Nebeur', 'Sakiet Sidi Youssef', 'Tajerouine', 'Kalâat Khasba'
      ]
    },
    {
      nom: 'Mahdia',
      delegations: [
        'Mahdia', 'Bou Merdes', 'Chebba', 'Chorbane', 'El Jem', 'Essouassi', 'Hebira', 'Ksour Essef', 'Melloulèche', 'Ouled Chamekh', 'Sidi Alouane'
      ]
    },
    {
      nom: 'Manouba',
      delegations: [
        'Manouba', 'Borj El Amri', 'Douar Hicher', 'El Battan', 'Jedaida', 'Mornaguia', 'Oued Ellil', 'Tebourba'
      ]
    },
    {
      nom: 'Médenine',
      delegations: [
        'Médenine Nord', 'Médenine Sud', 'Ben Gardane', 'Beni Khedache', 'Djerba - Ajim', 'Djerba - Houmt Souk', 'Djerba - Midoun', 'Sidi Makhlouf', 'Zarzis'
      ]
    },
    {
      nom: 'Monastir',
      delegations: [
        'Monastir', 'Bekalta', 'Bembla', 'Beni Hassen', 'Jemmal', 'Ksar Hellal', 'Ksibet el-Médiouni', 'Moknine', 'Ouardanine', 'Sahline', 'Sayada-Lamta-Bou Hjar', 'Zéramdine'
      ]
    },
    {
      nom: 'Nabeul',
      delegations: [
        'Nabeul', 'Béni Khalled', 'Béni Khiar', 'Bou Argoub', 'Dar Chaâbane El Fehri', 'El Haouaria', 'Grombalia', 'Hammam Ghezèze', 'Hammamet', 'Kélibia', 'Korba', 'Menzel Bouzelfa', 'Menzel Temime', 'Soliman', 'Takelsa'
      ]
    },
    {
      nom: 'Sfax',
      delegations: [
        'Sfax Ville', 'Sfax Ouest', 'Sfax Sud', 'Sakiet Eddaïer', 'Sakiet Ezzit', 'Agareb', 'Bir Ali Ben Khalifa', 'El Amra', 'El Hencha', 'Graïba', 'Jebiniana', 'Kerkennah', 'Mahres', 'Menzel Chaker'
      ]
    },
    {
      nom: 'Sidi Bouzid',
      delegations: [
        'Sidi Bouzid Ouest', 'Sidi Bouzid Est', 'Bir El Hafey', 'Cebbala Ouled Asker', 'Jilma', 'Meknassy', 'Menzel Bouzaiane', 'Mezzouna', 'Ouled Haffouz', 'Regueb', 'Sidi Ali Ben Aoun', 'Souk Jedid'
      ]
    },
    {
      nom: 'Siliana',
      delegations: [
        'Siliana Nord', 'Siliana Sud', 'Bou Arada', 'Gaâfour', 'El Aroussa', 'Bargou', 'Kesra', 'Makthar', 'Rouhia', 'Sidi Bou Rouis'
      ]
    },
    {
      nom: 'Sousse',
      delegations: [
        'Sousse Ville', 'Sousse Jawhara', 'Sousse Médina', 'Sousse Riadh', 'Akouda', 'Bouficha', 'Enfidha', 'Hammam Sousse', 'Hergla', 'Kalâa Kebira', 'Kalâa Seghira', 'Kondar', 'M\'saken', 'Sidi Bou Ali'
      ]
    },
    {
      nom: 'Tataouine',
      delegations: [
        'Tataouine Nord', 'Tataouine Sud', 'Bir Lahmar', 'Dehiba', 'Ghomrassen', 'Remada', 'Smar'
      ]
    },
    {
      nom: 'Tozeur',
      delegations: [
        'Tozeur', 'Degache', 'Hamet Jerid', 'Nefta', 'Tameghza'
      ]
    },
    {
      nom: 'Tunis',
      delegations: [
        'Bab El Bhar', 'Bab Souika', 'Carthage', 'Cité El Khadra', 'Djebel Jelloud', 'El Kabaria', 'El Menzah', 'El Omrane', 'El Omrane supérieur', 'El Ouardia', 'Ettahrir', 'Ezzouhour', 'Hraïria', 'La Goulette', 'La Marsa', 'Le Bardo', 'Le Kram', 'Médina', 'Séjoumi', 'Sidi El Béchir', 'Sidi Hassine'
      ]
    },
    {
      nom: 'Zaghouan',
      delegations: [
        'Zaghouan', 'Bir Mcherga', 'El Fahs', 'Nadhour', 'Saouaf', 'Zriba'
      ]
    }
    
  ];
  getVilles(): string[] {
    return this.villesTunisie.map(ville => ville.nom);
  }

  getDelegations(ville: string): string[] {
    const selectedVille = this.villesTunisie.find(v => v.nom === ville);
    return selectedVille ? selectedVille.delegations : [];
  }
  toggleSidebar() {
    this.sidebarOpen.next(!this.sidebarOpen.value);
  }

  setSidebarOpen(isOpen: boolean) {
    this.sidebarOpen.next(isOpen);
  }

  getSidebarStatus() {
    return this.sidebarOpen.value;
  }
  changeDropdownState(state: boolean) {
    this.dropdownState.next(state);
  }
  
}
