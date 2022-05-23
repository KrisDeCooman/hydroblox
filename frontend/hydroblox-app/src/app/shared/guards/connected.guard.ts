import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Web3Service } from "../services/web3.service";

@Injectable({
    providedIn: 'root'
  })
  export class ConnectedGuard implements CanActivate {
    constructor(
        private web3Service: Web3Service,
        private router: Router) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.web3Service.isConnected()) {
            return true;
        }
        else {
            console.log('You are not connected and will be redirected to home.');
            this.router.navigate(['']);
            return false;
        }
    }
}