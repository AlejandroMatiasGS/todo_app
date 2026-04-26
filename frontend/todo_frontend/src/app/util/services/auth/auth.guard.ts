import { inject } from "@angular/core";
import { Router } from "@angular/router"
import { map } from "rxjs";
import { AuthService } from "./auth.services";
import { CanActivateFn } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkSession().pipe(
    map(isValid => {
      if (isValid) return true;
      
      router.navigate(['/']);
      return false;
    })
  );
};