import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://35.154.90.3:8080/backend/auth/signin';
  private UserData = 'http://35.154.90.3:8080/backend/general/getUserPortfolio';


  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);

  }

  getUserPortfolio(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(this.UserData, { headers });
  }
}









// <div class="col-lg-3 col-md-6">
// <div class="card bg-warning text-white">
//     <div class="card-body">
//         <h5 class="card-title">44</h5>
//         <p class="card-text">User Registrations</p>
//     </div>
//     <div class="card-footer text-white-50">
//     </div>
// </div>
// </div>
// <div class="col-lg-3 col-md-6">
// <div class="card bg-danger text-white">
//     <div class="card-body">
//         <h5 class="card-title">65</h5>
//         <p class="card-text">Unique Visitors</p>
//     </div>
//     <div class="card-footer text-white-50">
//     </div>
// </div>
// </div>