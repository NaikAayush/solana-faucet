import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SolanaService } from 'src/app/services/solana.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  darkMode: boolean;
  constructor(public solanaService: SolanaService, private app: AppComponent) {
    const themeData = localStorage.getItem('darkMode');
    if (themeData == 'true') {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }
  }

  ngOnInit() {}

  toggleMode() {
    const themeData = localStorage.getItem('darkMode');
    if (themeData == 'false') {
      this.darkMode = false;
      localStorage.setItem('darkMode', 'true');
      this.app.setTheme();
    }
    if (themeData == 'true') {
      this.darkMode = true;
      localStorage.setItem('darkMode', 'false');
      this.app.setTheme();
    }
  }
}
