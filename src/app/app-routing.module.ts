import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { MainRoutingModule } from './main/main-routing.module';


const routes: Routes = [
  {path:"" ,component:WelcomeComponent},
  {path:"login", component:LoginComponent},
  {path:"main" , component:MainComponent},
  {
    path:'main',
    component:MainComponent,
    loadChildren:() =>import('./main/main.module').then(x=>x.MainModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
