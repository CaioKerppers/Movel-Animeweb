import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.scss'],
})
export class AnimesComponent  implements OnInit {
  @Input() anime:any;
  constructor() { }

  ngOnInit() {}

}
