import { Component, OnInit } from '@angular/core';
import { SolanaService } from './services/solana.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'webapp';
  darkMode: boolean = false;
  colorScheme: string = '';

  constructor(public solanaService: SolanaService) {}

  setTheme() {
    if (!localStorage.getItem('darkMode')) {
      localStorage.setItem('darkMode', 'false');
    }
    if (localStorage.getItem('darkMode') == 'false') {
      this.colorScheme = '';
    } else if (localStorage.getItem('darkMode') == 'true') {
      this.colorScheme = 'dark';
    }
  }

  ngOnInit() {
    this.setTheme();
  }
}
