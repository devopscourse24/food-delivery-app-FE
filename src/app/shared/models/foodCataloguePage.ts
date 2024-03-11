// Importation des interfaces nécessaires depuis d'autres fichiers
import { FoodItem } from "./foodItem"; // Importe l'interface FoodItem du fichier FoodItem.ts
import { Restaurant } from "./restaurant"; // Importe l'interface Restaurant du fichier Restaurant.ts

// Déclaration de l'interface FoodCataloguePage
export interface FoodCataloguePage {
  foodItemsList: FoodItem[]; // Un tableau de FoodItem, représentant une liste d'articles alimentaires
  restaurant: Restaurant; // Un objet Restaurant, représentant le restaurant associé aux articles alimentaires
}
