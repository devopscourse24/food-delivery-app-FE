import { Component, OnInit } from '@angular/core'; // Import de OnInit pour la gestion du cycle de vie du composant
import { Router } from "@angular/router"; // Import du Router pour la navigation
import { RestaurantService } from "../service/restaurant.service"; // Import du service RestaurantService
import { Restaurant } from "../../shared/models/restaurant"; // Import de l'interface Restaurant

// Décorateur @Component pour décrire le composant
@Component({
  selector: 'app-restaurant-listing', // Le sélecteur du composant
  templateUrl: './restaurant-listing.component.html', // Le chemin vers le template HTML
  styleUrls: ['./restaurant-listing.component.css'] // Le chemin vers les styles CSS
})
// Classe du composant RestaurantListingComponent
export class RestaurantListingComponent implements OnInit {
  public restaurantList: Restaurant[]; // Propriété pour la liste des restaurants

  // Méthode du cycle de vie OnInit pour initialiser le composant
  ngOnInit() {
    this.getAllRestaurants(); // Appel de la méthode pour récupérer tous les restaurants
  }

  // Constructeur de la classe avec injection du Router et du RestaurantService
  constructor(private router: Router, private restaurantService: RestaurantService) { }

  // Méthode pour récupérer tous les restaurants via le service
  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurantList = data; // Affectation des données reçues à la propriété restaurantList
      }
    )
  }

  // Méthode pour obtenir un nombre aléatoire dans un intervalle
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Calcul du nombre aléatoire
  }

  // Méthode pour obtenir un chemin d'image aléatoire
  getRandomImage(): string {
    const imageCount = 8; // Ajuster ce nombre en fonction du nombre d'images dans votre dossier d'actifs
    const randomIndex = this.getRandomNumber(1, imageCount); // Obtenir un index aléatoire
    return `${randomIndex}.jpg`; // Retourner le chemin de l'image avec le motif de nom de fichier
  }

  // Méthode déclenchée lors du clic sur un bouton, pour naviguer vers une page de détail
  onButtonClick(id: number) {
    this.router.navigate(['/food-catalogue', id]); // Navigation vers le catalogue de nourriture avec l'id du restaurant
  }
}
