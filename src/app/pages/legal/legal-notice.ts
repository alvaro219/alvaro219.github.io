import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legal-notice.html',
  styleUrls: ['./legal-shared.scss'],
})
export class LegalNotice {}
