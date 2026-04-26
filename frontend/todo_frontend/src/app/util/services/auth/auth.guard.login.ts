// auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.services';

export const authGuardLogin = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.checkSession().pipe(
        map(isAuthenticated => 
            isAuthenticated ? router.createUrlTree(['/dashboard']) : true
        )
    );
};