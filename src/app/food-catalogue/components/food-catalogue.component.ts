import { Component, OnInit } from '@angular/core';
import { FoodCataloguePage } from "../../shared/models/foodCataloguePage";
import { FoodItem } from "../../shared/models/foodItem";
import { ActivatedRoute, Router } from "@angular/router";
import { FoodItemService } from "../service/food-item.service";

// Décorateur Component qui déclare la classe comme un composant Angular avec son sélecteur et les chemins vers son HTML et CSS
@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.css']
})
export class FoodCatalogueComponent implements OnInit {

  // Propriétés du composant
  restaurantId: number; // Identifiant du restaurant
  foodItemResponse: FoodCataloguePage; // Réponse de la requête pour les articles alimentaires
  foodItemCart: FoodItem[] = []; // Panier des articles alimentaires
  orderSummary: FoodCataloguePage; // Résumé de la commande

  // Injection des services nécessaires dans le constructeur
  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router) {
  }

  // Méthode ngOnInit appelée à l'initialisation du composant
  ngOnInit() {
    // Souscription aux paramètres de route pour obtenir l'identifiant du restaurant
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +params.get('id')!; // Utiliser '!' pour dire à TypeScript que l'ID n'est pas nul
    });

    // Appel de la méthode pour obtenir les articles alimentaires du restaurant
    this.getFoodItemsByRestaurant(this.restaurantId);
  }

  // Méthode pour obtenir les articles alimentaires en fonction de l'identifiant du restaurant
  getFoodItemsByRestaurant(restaurant: number) {
    this.foodItemService.getFoodItemsByRestaurant(restaurant).subscribe(
      data => {
        this.foodItemResponse = data; // Affectation des données reçues à la propriété foodItemResponse
        console.log(this.foodItemResponse);
      }
    )
  }

  // Méthode pour augmenter la quantité d'un article alimentaire
  increment(food: FoodItem) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      this.foodItemCart.push(food); // Si l'article n'est pas dans le panier, l'ajouter
    } else {
      this.foodItemCart[index] = food; // Si l'article est déjà dans le panier, mettre à jour la quantité
    }
  }

  // Méthode pour diminuer la quantité d'un article alimentaire
  decrement(food: FoodItem) {
    if (food.quantity > 0) {
      food.quantity--;
      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1); // Si la quantité est 0, retirer l'article du panier
      } else {
        this.foodItemCart[index] = food; // Sinon, mettre à jour la quantité dans le panier
      }
    }
  }

  // Méthode appelée lors du passage à la caisse
  onCheckOut() {
    this.orderSummary = {
      foodItemsList: this.foodItemCart, // Affectation du panier actuel au résumé de la commande
      restaurant: this.foodItemResponse.restaurant // Affectation du restaurant à partir de la réponse obtenue
    }
    // Navigation vers le résumé de la commande avec les détails passés en tant que paramètres de requête
    this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }
}
