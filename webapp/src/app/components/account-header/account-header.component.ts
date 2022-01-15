import { Component, OnInit } from '@angular/core';
import { SolanaService } from 'src/app/services/solana.service';

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.css'],
})
export class AccountHeaderComponent implements OnInit {
  publicKey: string = '';
  balance: string = '';

  constructor(private solanaService: SolanaService) {}

  async ngOnInit() {
    this.publicKey = this.solanaService.publicKey.toString();
    this.balance = (await this.solanaService.getBalance()).toString();
  }
}
