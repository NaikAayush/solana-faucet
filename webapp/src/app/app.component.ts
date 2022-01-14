import { Component, OnInit } from '@angular/core';
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

  async ngOnInit() {
    this.userWalletProvider = await this.walletConnectionHelper();
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

  async walletConnectionHelper() {
    console.log(this.flag);
    if (this.walletConnected) {
      //Disconnect Wallet
      console.log(this.flag);
      //  setProvider();
      //  setWalletConnected(false);
    } else {
      const userWallet = await this.getProvider();
      if (userWallet) {
        this.flag = true;
        const data = await userWallet.connect();
        return data.publicKey;
        // await userWallet.on('connect', async () => {
        //   this.userWalletProvider = await userWallet.publicKey;
        //   this.walletConnected = true;
        //   return true;
        // });
        // await userWallet.on('connect');
      }
    }
  }
}
