import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent  implements OnInit {
  dummy = Array(10);
  constructor() { }

  ngOnInit() {}

}
