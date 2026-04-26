import { Component, inject } from '@angular/core';
import { ThemeService } from '../../util/theme';

@Component({
  standalone: true,
  selector: 'app-switch-theme',
  imports: [],
  templateUrl: './switch-theme.html',
  styleUrls: ['./switch-theme.css'],
})
export class SwitchTheme {
    public theme = inject(ThemeService);
}
