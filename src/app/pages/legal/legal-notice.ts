import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legal-notice.html',
  styleUrls: ['./legal-shared.scss'],
})
export class LegalNotice {
  i18n = inject(I18nService);
}
