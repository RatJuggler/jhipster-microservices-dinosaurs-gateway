import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SightingComponent } from './sighting.component';
import { SightingDetailComponent } from './sighting-detail.component';
import { SightingUpdateComponent } from './sighting-update.component';
import { SightingDeleteDialogComponent } from './sighting-delete-dialog.component';
import { sightingRoute } from './sighting.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(sightingRoute)],
  declarations: [SightingComponent, SightingDetailComponent, SightingUpdateComponent, SightingDeleteDialogComponent],
  entryComponents: [SightingDeleteDialogComponent],
})
export class GatewaySightingModule {}
