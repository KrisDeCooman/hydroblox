import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(
    private router: Router) {
  }

  goHome() {
    return this.router.navigate(['']);
  }
}
