import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anime-input',
  templateUrl: './anime-input.component.html',
  styleUrls: ['./anime-input.component.scss'],
})
export class AnimeInputComponent  implements OnInit {
  @Input() animeForm: FormGroup;
  @Input() botao: string;
  @Output() submit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit() {}

  submitForm(){
    if(this.animeForm.valid){
      this.submit.emit(this.animeForm);
    }
  }
}
