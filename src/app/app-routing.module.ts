import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/users/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./pages/users/crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./pages/users/modificar/modificar.module').then( m => m.ModificarPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/roles/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./pages/roles/crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./pages/roles/modificar/modificar.module').then( m => m.ModificarPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
