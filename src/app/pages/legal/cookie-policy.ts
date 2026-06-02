import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-policy.html',
  styleUrls: ['./legal-shared.scss'],
})
export class CookiePolicy {
  i18n = inject(I18nService);
}
