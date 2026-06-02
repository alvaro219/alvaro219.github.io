import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy-policy.html',
  styleUrls: ['./legal-shared.scss'],
})
export class PrivacyPolicy {
  i18n = inject(I18nService);
}
