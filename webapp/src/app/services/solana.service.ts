import { Injectable } from '@angular/core';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
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
  mintingWalletSecretKey: any;
  createdTokenPublicKey: any;
  mintingStatus: boolean = false;
  mintingFromWallet: any;
  toast: boolean = false;
  toastMessage: string = 'false';

  constructor() {
    this.getProvider();
    this.isLoggedIn();
    // TODO REMOVE
    this.connectWallet();
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

  public async getSolana() {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  public async initialMintHelper() {
    this.mintingStatus = true;
    try {
      const mintRequester = await this.provider.publicKey;
      this.mintingFromWallet = Keypair.generate();
      this.mintingWalletSecretKey = JSON.stringify(
        this.mintingFromWallet.secretKey
      );

      const fromAirDropSignature = await this.connection.requestAirdrop(
        this.mintingFromWallet.publicKey,
        LAMPORTS_PER_SOL
      );
      await this.connection.confirmTransaction(
        fromAirDropSignature,
        'confirmed'
      );

      const creatorToken = await Token.createMint(
        this.connection,
        this.mintingFromWallet,
        this.mintingFromWallet.publicKey,
        null,
        6,
        TOKEN_PROGRAM_ID
      );
      const fromTokenAccount =
        await creatorToken.getOrCreateAssociatedAccountInfo(
          this.mintingFromWallet.publicKey
        );
      await creatorToken.mintTo(
        fromTokenAccount.address,
        this.mintingFromWallet.publicKey,
        [],
        1000000
      );

      const toTokenAccount =
        await creatorToken.getOrCreateAssociatedAccountInfo(mintRequester);
      const transaction = new Transaction().add(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          fromTokenAccount.address,
          toTokenAccount.address,
          this.mintingFromWallet.publicKey,
          [],
          1000000
        )
      );
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [this.mintingFromWallet],
        { commitment: 'confirmed' }
      );

      console.log('SIGNATURE:', signature);

      this.createdTokenPublicKey = creatorToken.publicKey.toString();
      // setIsTokenCreated(true);
      // setLoading(false);
      this.mintingStatus = false;
      this.toastMessage = 'Successfully minted token, Please check your wallet';
      this.toast = true;
    } catch (err) {
      console.log(err);
      // setLoading(false);
      this.mintingStatus = false;
      this.toastMessage = 'There was an issue minting your token.';
      this.toast = true;
    }
  }

  // public async mintMoreTokens() {
  //   this.mintStatus = false;
  //   try {
  //     console.log(1);
  //     const createMintingWallet = Keypair.fromSecretKey(
  //       Uint8Array.from(Object.values(JSON.parse(this.mintingWalletSecretKey)))
  //     );
  //     console.log(this.mintingFromWallet.publicKey);
  //     console.log(2);
  //     const mintRequester = await this.provider.publicKey;
  //     console.log(3);
  //     const fromAirDropSignature = await this.connection.requestAirdrop(
  //       // createMintingWallet.publicKey,
  //       this.mintingFromWallet.publicKey,
  //       LAMPORTS_PER_SOL
  //     );
  //     console.log(4);
  //     await this.connection.confirmTransaction(
  //       fromAirDropSignature,
  //       'confirmed'
  //     );
  //     console.log(5);

  //     const creatorToken = new Token(
  //       this.connection,
  //       this.createdTokenPublicKey,
  //       TOKEN_PROGRAM_ID,
  //       // createMintingWallet
  //       this.mintingFromWallet
  //     );
  //     console.log(6);
  //     const fromTokenAccount =
  //       await creatorToken.getOrCreateAssociatedAccountInfo(
  //         // createMintingWallet.publicKey
  //         this.mintingFromWallet.publicKey
  //       );
  //     console.log(7);
  //     const toTokenAccount =
  //       await creatorToken.getOrCreateAssociatedAccountInfo(mintRequester);
  //     console.log(8);
  //     await creatorToken.mintTo(
  //       fromTokenAccount.address,
  //       // createMintingWallet.publicKey,
  //       this.mintingFromWallet.publicKey,
  //       [],
  //       100000000
  //     );
  //     console.log(9);

  //     const transaction = new Transaction().add(
  //       Token.createTransferInstruction(
  //         TOKEN_PROGRAM_ID,
  //         fromTokenAccount.address,
  //         toTokenAccount.address,
  //         this.mintingFromWallet.publicKey,
  //         [],
  //         100000000
  //       )
  //     );
  //     console.log(10);
  //     await sendAndConfirmTransaction(
  //       this.connection,
  //       transaction,
  //       [this.mintingFromWallet],
  //       { commitment: 'confirmed' }
  //     );
  //     console.log(11);

  //     // setLoading(false);
  //   } catch (err: any) {
  //     console.log(err);

  //     // setLoading(false);
  //   }
  // }
}
