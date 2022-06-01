import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/shared/contracts/web3.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private web3Service: Web3Service) {
  }

  async onButtonClicked() {

    var connected = await this.web3Service.connect();
    if (connected) {
      await this.router.navigate(['choice']);
    }
  }
}
