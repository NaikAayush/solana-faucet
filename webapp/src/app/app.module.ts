import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WalletModalComponent } from './components/wallet-modal/wallet-modal.component';
import { AccountHeaderComponent } from './components/account-header/account-header.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, WalletModalComponent, AccountHeaderComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
