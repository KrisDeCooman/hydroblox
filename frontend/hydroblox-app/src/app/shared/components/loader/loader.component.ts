import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'hb-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  showLoading: Subject<boolean> = this.loaderService.showLoading;

  constructor(private loaderService: LoaderService) { }
}
