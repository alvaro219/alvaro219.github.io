import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-policy.html',
  styleUrls: ['./legal-shared.scss'],
})
export class CookiePolicy {}
