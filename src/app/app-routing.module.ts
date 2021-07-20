import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'aboutus', pathMatch: 'full'},
  { path: 'aboutus', loadChildren: () => import('./pages/aboutus/aboutus.module').then(m => m.AboutusModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
