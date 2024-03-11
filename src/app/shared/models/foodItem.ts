// Déclaration de l'interface TypeScript pour un élément de nourriture
export interface FoodItem {
  id?: number; // Un champ optionnel pour l'identifiant de l'article de nourriture, de type nombre
  itemName?: string; // Un champ optionnel pour le nom de l'article de nourriture, de type chaîne de caractères
  itemDescription?: string; // Un champ optionnel pour la description de l'article, de type chaîne de caractères
  isVeg?: boolean; // Un champ optionnel indiquant si l'article est végétarien, de type booléen
  price?: number; // Un champ optionnel pour le prix de l'article, de type nombre
  restaurantId?: number; // Un champ optionnel pour l'identifiant du restaurant associé à l'article, de type nombre
  quantity: number; // Un champ obligatoire pour la quantité de l'article, de type nombre
}
