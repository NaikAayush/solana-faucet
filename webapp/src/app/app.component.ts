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

  constructor(public solanaService: SolanaService) {}

  async ngOnInit() {
    // this.userWalletProvider = await this.walletConnectionHelper();
    this.solanaService.isLoggedIn();
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
