import { Component, OnInit } from '@angular/core';
import { SolanaService } from 'src/app/services/solana.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public solanaService: SolanaService) {}

  ngOnInit(): void {}
}
