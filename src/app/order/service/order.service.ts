import { Injectable } from '@angular/core';
import {K8ExternalIp} from "../../constants/url"; // Importe l'URL de base à partir des constantes
import { HttpClient, HttpHeaders } from "@angular/common/http"; // Importe HttpClient pour faire des requêtes HTTP, HttpHeaders pour définir les en-têtes de la requête
import { Observable, throwError } from "rxjs"; // Importe Observable pour le traitement asynchrone, throwError pour la gestion des erreurs

// Le décorateur @Injectable permet à ce service d'être injecté dans d'autres composants ou services
@Injectable({
  providedIn: 'root' // Indique que ce service est disponible dans l'injecteur racine et donc partout dans l'application
})
export class OrderService {

  private apiUrl = K8ExternalIp + '/order/saveOrder'; // Construit l'URL complète pour l'API de sauvegarde des commandes

  constructor(private http: HttpClient) { } // Injecte le service HttpClient pour effectuer des requêtes HTTP

  // Options HTTP pour la requête, y compris les en-têtes
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json', // Définit le type de contenu de la requête en text/plain
      'Access-Control-Allow-Origin': 'http://localhost:4200' // Autorise l'accès CORS depuis l'URL de l'application Angular
      // Remplacer 'http://localhost:4200' par l'URL de votre application Angular en production
    })
  };

  // Méthode pour sauvegarder une commande via une requête POST
  saveOrder(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, this.httpOptions); // Effectue la requête POST avec les données de la commande et les options HTTP
  }

  // Méthode privée pour gérer les erreurs survenues lors des requêtes HTTP
  private handleError(error: any) {
    console.error('Une erreur est survenue:', error); // Affiche l'erreur dans la console
    return throwError(error.message || error); // Propage l'erreur pour qu'elle puisse être gérée par l'abonné
  }

}
