import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { HighScoreComponent } from './high-score.component';
import { HighScoreDetailComponent } from './high-score-detail.component';
import { HighScoreUpdateComponent } from './high-score-update.component';
import { HighScoreDeleteDialogComponent } from './high-score-delete-dialog.component';
import { highScoreRoute } from './high-score.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(highScoreRoute)],
  declarations: [HighScoreComponent, HighScoreDetailComponent, HighScoreUpdateComponent, HighScoreDeleteDialogComponent],
  entryComponents: [HighScoreDeleteDialogComponent]
})
export class GatewayHighScoreModule {}
