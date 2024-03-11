import { Injectable } from '@angular/core';
import {API_URL_RL} from "../../constants/url";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

// Définition de la classe RestaurantService
export class RestaurantService {

  // URL de l'API, utilisé pour construire les requêtes HTTP
  private apiUrl = `${API_URL_RL}/restaurant/fetchAllRestaurants`;

  // Injection du service HttpClient dans le constructeur pour effectuer des requêtes HTTP
  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les restaurants
  getAllRestaurants(): Observable<any> {
    // Utilisation de HttpClient pour faire une requête GET vers l'API et récupérer les restaurants
    return this.http.get<any>(this.apiUrl) // Pas besoin d'utiliser des templates literals ici
      .pipe( // .pipe() sert à appliquer des opérateurs RxJS à l'Observable retourné par http.get()
        catchError(this.handleError) // Gestion des erreurs en utilisant catchError
      );
  }

  // Méthode privée pour gérer les erreurs lors des appels HTTP
  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est survenue:', error); // Affichage de l'erreur dans la console
    // Renvoie d'une erreur observable avec un message d'erreur
    return throwError(() => new Error(error.message || 'Une erreur serveur est survenue.'));
  }
}
