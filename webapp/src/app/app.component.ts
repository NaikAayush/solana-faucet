import { Component, OnInit } from '@angular/core';
import { SolanaService } from './services/solana.service';
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'webapp';
  userWalletProvider: any;
  walletConnected: boolean = false;
  flag: boolean = false;
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

  async ngOnInit() {
    this.setTheme();
    // this.userWalletProvider = await this.walletConnectionHelper();
    this.solanaService.isLoggedIn();
    const bal = await this.solanaService.getBalance();
    console.log(bal);
  }

  async getProvider() {
    if ('solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      } else {
        window.open('https://www.phantom.app/', '_blank');
      }
    }
  }
}
