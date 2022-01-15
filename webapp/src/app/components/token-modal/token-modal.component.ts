import { Component, Input, OnInit } from '@angular/core';
import { SolanaService } from 'src/app/services/solana.service';

@Component({
  selector: 'app-token-modal',
  templateUrl: './token-modal.component.html',
  styleUrls: ['./token-modal.component.css'],
})
export class TokenModalComponent implements OnInit {
  @Input() publicKey: string = '';
  constructor(public solanaService: SolanaService) {}

  ngOnInit(): void {}
}
