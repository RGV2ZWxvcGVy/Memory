import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { LoginComponent } from './components/login/login.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  { path: '', component: DataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'player', component: PlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
