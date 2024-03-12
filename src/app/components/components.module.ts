import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AnimesComponent } from './animes/animes.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [AnimesComponent,
    EmptyScreenComponent,
    LoadingComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AnimesComponent,

    EmptyScreenComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
