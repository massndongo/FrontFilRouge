import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl =  'http://127.0.0.1:8000/api/login_check';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  /** POST Connexion*/
  login(username: string, password: string): Observable<any>{
    return this.http.post<any>(this.authUrl, {username, password}, this.httpOptions)
  }

  /** GET Profils*/
  getProfils(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/admin/profils', this.httpOptions)
  }

  /** GET Users*/
  getUsers(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/admin/users', this.httpOptions)
  }
}
