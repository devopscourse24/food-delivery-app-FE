// Déclaration d'une interface TypeScript pour un objet Restaurant
export interface Restaurant {
  id?: number; // Un champ optionnel pour l'identifiant du restaurant, de type nombre
  name?: string; // Un champ optionnel pour le nom du restaurant, de type chaîne de caractères
  address?: string; // Un champ optionnel pour l'adresse du restaurant, de type chaîne de caractères
  city?: string; // Un champ optionnel pour la ville où se trouve le restaurant, de type chaîne de caractères
  description?: string; // Un champ optionnel pour la description du restaurant, de type chaîne de caractères
}
