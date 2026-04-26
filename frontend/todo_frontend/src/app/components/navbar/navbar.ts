import { Component, inject } from '@angular/core';
import { SwitchTheme } from '../switch-theme/switch-theme';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { toast } from 'ngx-sonner';


@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [SwitchTheme],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
    private router = inject(Router);
    private http = inject(HttpClient);

    logout() {
        this.http.get('http://localhost:3000/auth/logout', { withCredentials: true }).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (e) => {
                toast.error('Error', { description: e.message })
            },
        })
        
    }
}
