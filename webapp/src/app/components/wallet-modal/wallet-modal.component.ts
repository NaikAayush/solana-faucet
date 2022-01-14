import { Component, OnInit } from '@angular/core';
import { SolanaService } from 'src/app/services/solana.service';

@Component({
  selector: 'app-wallet-modal',
  templateUrl: './wallet-modal.component.html',
  styleUrls: ['./wallet-modal.component.css'],
})
export class WalletModalComponent implements OnInit {
  constructor(public solanaService: SolanaService) {}

  ngOnInit(): void {}
}
