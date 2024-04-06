import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FabricRollData2Component } from './main/menu/fabric-roll-data2/fabric-roll-data2.component';

const routes: Routes = [
  {path:"" ,component:WelcomeComponent},
  {path:"login", component:LoginComponent},
  {path:"main" , component:MainComponent},
  {
    path:'main',
    component:MainComponent,
    loadChildren:() =>import('./main/main.module').then(x=>x.MainModule)},

    {path:"main/FabricRollData", component:FabricRollData2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
