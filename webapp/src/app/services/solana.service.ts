import { Injectable } from '@angular/core';
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class SolanaService {
  provider: any;
  walletConnected: boolean = false;
  publicKey!: PublicKey;
  connection: Connection;

  constructor() {
    this.getProvider();
    this.isLoggedIn();
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  }

  isLoggedIn() {
    console.log(this.walletConnected);
  }

  async getBalance() {
    console.log(this.publicKey);
    return await this.connection.getBalance(this.publicKey);
  }

  getProvider() {
    if ('solana' in window) {
      this.provider = window.solana;
      if (this.provider.isPhantom) {
        return this.provider;
      }
    } else {
      window.open('https://www.phantom.app/', '_blank');
    }
  }

  async connectWallet() {
    // console.log(this.flag);
    if (this.walletConnected) {
      console.log('in connected');
      //Disconnect Wallet
      // console.log(this.flag);
      //  setProvider();
      //  setWalletConnected(false);
    } else {
      const userWallet = await this.getProvider();
      if (userWallet) {
        // this.flag = true;
        const data = await userWallet.connect();
        this.walletConnected = true;
        console.log(data);
        this.publicKey = data.publicKey;
        const bal = await this.getBalance();
        console.log(bal);
        // this.publicKey = data.publicKey.toString();
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

  async disconnectWallet() {
    window.solana.disconnect();
    window.location.reload();
  }

  async airDropHelper() {
    try {
      // setLoading(true);

      const fromAirDropSignature = await this.connection.requestAirdrop(
        new PublicKey(this.provider.publicKey),
        LAMPORTS_PER_SOL
      );
      await this.connection.confirmTransaction(
        fromAirDropSignature,
        'confirmed'
      );

      console.log(
        `1 SOL airdropped to your wallet ${this.provider.publicKey.toString()} successfully`
      );
      // setLoading(false);
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  }

  // async walletConnectionHelper() {
  //   if (walletConnected) {
  //     //Disconnect Wallet
  //     setProvider();
  //     setWalletConnected(false);
  //   } else {
  //     const userWallet = await getProvider();
  //     if (userWallet) {
  //       await userWallet.connect();
  //       userWallet.on('connect', async () => {
  //         setProvider(userWallet);
  //         setWalletConnected(true);
  //       });
  //     }
  //   }
  // }
}
