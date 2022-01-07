import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
    {
      path: 'users',
      children: [
        {
          path: '',
          loadChildren: () => import('../pages/users/index/index.module').then( m => m.IndexPageModule)
        },
         {
            path: 'crear',
            loadChildren: () => import('../pages/users/crear/crear.module').then( m => m.CrearPageModule)
          },
          {
            path: 'modificar',
            loadChildren: () => import('../pages/users/modificar/modificar.module').then( m => m.ModificarPageModule)
          },
          {
            path: 'ver',
            loadChildren: () => import('../pages/users/ver/ver.module').then( m => m.VerPageModule)
          }
      ]
    },
      {
        path: 'roles',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/roles/index/index.module').then( m => m.IndexPageModule)
          },
           {
              path: 'crear',
              loadChildren: () => import('../pages/roles/crear/crear.module').then( m => m.CrearPageModule)
            },
            {
              path: 'modificar',
              loadChildren: () => import('../pages/roles/modificar/modificar.module').then( m => m.ModificarPageModule)
            },
        ]
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
     /* {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },*/
      {
        path: '',
        redirectTo: '/tabs/users',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
