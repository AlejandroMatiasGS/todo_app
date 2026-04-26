import { Component, inject, signal } from '@angular/core';
import { SwitchTheme } from "../../components/switch-theme/switch-theme";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [SwitchTheme, FormsModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
})
export class Login {
    email = signal('');
    password = signal('');
    private http = inject(HttpClient);
    private router = inject(Router);

    async login() {
        if(this.email() === '' || this.password() === '') {
            toast.info('Información', { description: 'Por favor, rellene todos los campos.' })
            return;
        }

        this.http.post('http://localhost:3000/auth/login', {
            email: this.email(),
            password: this.password(),
        }, { withCredentials: true }).subscribe({
            next: (res: any) => {
                let resSuccess = res.success as boolean;

                if(resSuccess) {
                    this.router.navigate(['/dashboard']);
                }else {
                    let message = res.message as string;
                    toast.error('Error', { description: message })
                }
            },
            error: (err) => {
                toast.error('Error', { description: err.message })
            },
        });
    }
}
