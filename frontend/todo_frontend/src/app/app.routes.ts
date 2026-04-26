import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { authGuardLogin } from './util/services/auth/auth.guard.login';
import { Register } from './pages/register/register';
import { authGuard } from './util/services/auth/auth.guard';

export const routes: Routes = [
    { path: '', component: Login, canActivate: [authGuardLogin]},
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
];
