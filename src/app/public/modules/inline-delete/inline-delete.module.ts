import {
  NgModule
 } from '@angular/core';

 import {
   CommonModule
 } from '@angular/common';

 import {
   SkyWaitModule
 } from '@skyux/indicators';

 import {
  SkyInlineDeleteComponent
} from './inline-delete.component';

@NgModule({
  declarations: [
    SkyInlineDeleteComponent
  ],
  imports: [
    CommonModule,
    SkyWaitModule
  ],
  exports: [
    SkyInlineDeleteComponent
  ]
})
export class SkyInlineDeleteModule { }
