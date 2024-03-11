import { Component, OnInit } from '@angular/core';
import { OrderDTO } from "../../model/OrderDTO"; // Import du modèle OrderDTO
import { ActivatedRoute, Router } from "@angular/router"; // Services pour la manipulation des routes
import { OrderService } from "../../service/order.service"; // Service pour gérer les commandes

// Décorateur Component qui indique que cette classe est un composant Angular
@Component({
  selector: 'app-order-summary', // Sélecteur CSS du composant
  templateUrl: './order-summary.component.html', // Chemin vers le fichier HTML du template du composant
  styleUrls: ['./order-summary.component.css'] // Chemin vers les styles CSS du composant
})
export class OrderSummaryComponent implements OnInit {

  orderSummary?: OrderDTO; // Résumé de commande, potentiellement indéfini
  obj: any; // Variable pour stocker les données transformées à partir des queryParams
  total?: number; // Le total de la commande, potentiellement indéfini
  showDialog: boolean = false; // Booléen pour contrôler l'affichage d'une boîte de dialogue

  // Constructeur avec injection des services nécessaires
  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }

  // Méthode qui s'exécute à l'initialisation du composant
  ngOnInit() {
    const data = this.route.snapshot.queryParams['data']; // Récupération des données depuis les queryParams
    this.obj = JSON.parse(data); // Transformation de la chaîne de caractères JSON en objet
    this.obj.userId = 1; // Attribution d'un userId (ceci est juste un exemple)
    this.orderSummary = this.obj; // Affectation de l'objet aux données du résumé de commande


    // Calcul du total de la commande
// Ici, on utilise le safe navigation operator '?' pour vérifier que 'orderSummary' et 'foodItemsList' ne sont pas indéfinis.
// La méthode 'reduce' est utilisée pour parcourir chaque élément de la liste 'foodItemsList'.
// 'reduce' prend une fonction callback qui est exécutée pour chaque élément du tableau.
// La fonction callback prend deux paramètres : 'accumulator' et 'currentValue'.
// 'accumulator' est la valeur accumulée retournée par le dernier appel de la fonction callback.
// 'currentValue' est l'élément courant qui est traité dans le tableau.
// Pour chaque élément, on multiplie la 'quantity' de l'article courant par son 'price' pour obtenir le sous-total de cet article.
// L'opérateur '!' après 'currentValue.price' est utilisé pour dire à TypeScript que vous êtes sûr que 'price' n'est pas null ou undefined.
// Ce sous-total est ajouté à 'accumulator' pour calculer progressivement le total de la commande.
// Le deuxième argument de 'reduce', ici '0', est la valeur initiale de l'accumulateur.
// Finalement, 'this.total' est égal à la somme de tous les sous-totaux des articles dans la commande.
    this.total = this.orderSummary?.foodItemsList?.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.quantity * currentValue.price!); // Assurez-vous que le prix est défini
    }, 0);
  }

  // Méthode pour sauvegarder la commande
  saveOrder() {
    console.log(this.orderSummary);
    this.orderService.saveOrder(this.orderSummary) // Appel du service pour sauvegarder la commande
      .subscribe({
        next: (response) => {
          this.showDialog = true; // Affiche une boîte de dialogue en cas de succès
        },
        error: (error) => {
          console.error('Failed to save data:', error); // En cas d'échec, affiche une erreur dans la console
        },
        complete: () => {
          // Code à exécuter après la complétion de l'Observable, si nécessaire
        }
      });
  }


  // Méthode pour fermer la boîte de dialogue
  closeDialog() {
    this.showDialog = false; // Ferme la boîte de dialogue
    this.router.navigate(['/']); // Redirige l'utilisateur vers la page d'accueil (ou autre selon la configuration de votre routeur)
  }

}

