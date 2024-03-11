import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {API_URL_FC} from "../../constants/url";
//import { K8ExternalIp } from 'src/app/constants/url'; // Assurez-vous que le chemin d'accès est correct pour votre structure de projet

// Le décorateur Injectable permet à ce service d'être injecté dans d'autres classes
@Injectable({
  providedIn: 'root' // Cela signifie que le service est disponible dans toute l'application
})
export class FoodItemService {

  // L'URL de base pour les API de catalogue de nourriture, utilisant une adresse IP externe de Kubernetes
  private apiUrl = `${API_URL_FC}/foodCatalogue/fetchRestaurantAndFoodItemsById/`;

  // Le constructeur injecte le client HTTP d'Angular pour faire des appels HTTP
  constructor(private http: HttpClient) { }

  // Méthode pour obtenir les articles alimentaires d'un restaurant spécifique par son ID
  getFoodItemsByRestaurant(id: number): Observable<any> {
    // Appel GET en utilisant HttpClient avec l'URL et l'ID du restaurant
    return this.http.get<any>(this.apiUrl + id) // Ici, nous concaténons l'URL avec l'ID
      .pipe(
        catchError(this.handleError) // On utilise catchError pour gérer les erreurs de la requête
      );
  }

  // Méthode privée pour gérer les erreurs lors des appels HTTP
  private handleError(error: any) {
    console.error('Une erreur est survenue:', error); // Affichage de l'erreur dans la console
    // Renvoi d'un Observable avec une erreur, pour être géré par le souscripteur de la requête
    return throwError(() => new Error(error.message || 'Une erreur serveur est survenue.'));
  }

}
