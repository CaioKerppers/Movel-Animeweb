import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'anime',
    loadChildren: () => import('./view/anime/anime.module').then( m => m.AnimePageModule)
  },
  {
    path: 'adicionar',
    loadChildren: () => import('./view/adicionar/adicionar.module').then( m => m.AdicionarPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./view/usuarios/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./view/usuarios/signup/signup.module').then( m => m.SignupPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
