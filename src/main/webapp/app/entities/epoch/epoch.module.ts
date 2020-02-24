import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { EpochComponent } from './epoch.component';
import { EpochDetailComponent } from './epoch-detail.component';
import { EpochUpdateComponent } from './epoch-update.component';
import { EpochDeleteDialogComponent } from './epoch-delete-dialog.component';
import { epochRoute } from './epoch.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(epochRoute)],
  declarations: [EpochComponent, EpochDetailComponent, EpochUpdateComponent, EpochDeleteDialogComponent],
  entryComponents: [EpochDeleteDialogComponent]
})
export class GatewayEpochModule {}
