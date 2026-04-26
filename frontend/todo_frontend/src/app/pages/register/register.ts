import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MiResponse } from '../../model/miresponse';
import { toast } from 'ngx-sonner';
import { SwitchTheme } from '../../components/switch-theme/switch-theme';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [SwitchTheme],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    name = signal('');
    email = signal('');
    password = signal('');
    private http = inject(HttpClient);


    register() {
        if(this.name() === '' || this.email() === '' || this.password() === '') {
            toast.info('Información', { description: 'Por favor, rellene todos los campos.' })
            return;
        }

        this.http.post<MiResponse>('http://localhost:3000/auth/register', {
            name: this.name(),
            email: this.email(),
            password: this.password(),
        }, { withCredentials: true }).subscribe({
            next: (res) => {
                if(res.success) {
                    toast.success('Información', { description: res.message })
                }else {
                    toast.error('Error', { description: res.message })
                }
            },
            error: (err) => {
                toast.error('Error', { description: err.message })
            },  
        });
    }

}
