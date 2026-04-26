// auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    checkSession() {
        return this.http.get('http://localhost:3000/auth/check', { 
            withCredentials: true  // envía la cookie al backend
        }).pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }
}