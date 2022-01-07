import {NgModule} from '@angular/core'
import { ValidationComponent } from './validation/validation.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@NgModule({
    imports:[
        CommonModule,
        IonicModule
    ],
    declarations:[ValidationComponent],
    exports:[ValidationComponent]
})
export class ComponentsModule{}