import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'devices', pathMatch: 'full'},
  //{ path: 'aboutus', loadChildren: () => import('./pages/aboutus/aboutus.module').then(m => m.AboutusModule) },
  { path: 'devices', loadChildren: () => import('./pages/devices/devices.module').then(m => m.DevicesModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
