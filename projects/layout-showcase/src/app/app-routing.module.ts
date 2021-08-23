import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionButtonVisualComponent } from './visual/action-button/action-button-visual.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: '',
    component: VisualComponent
  },
  {
    path: 'visual/action-button',
    component: ActionButtonVisualComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
