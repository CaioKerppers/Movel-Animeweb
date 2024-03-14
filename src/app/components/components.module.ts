import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AnimesComponent } from './animes/animes.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { LoadingComponent } from './loading/loading.component';
import { AnimeInputComponent } from './anime-input/anime-input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AnimesComponent,
    EmptyScreenComponent,
    LoadingComponent,
    AnimeInputComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    AnimesComponent,
    EmptyScreenComponent,
    LoadingComponent,
    AnimeInputComponent
  ]
})
export class ComponentsModule { }
