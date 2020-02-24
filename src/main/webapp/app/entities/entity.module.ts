import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'epoch',
        loadChildren: () => import('./epoch/epoch.module').then(m => m.GatewayEpochModule)
      },
      {
        path: 'clade',
        loadChildren: () => import('./clade/clade.module').then(m => m.GatewayCladeModule)
      },
      {
        path: 'dinosaur',
        loadChildren: () => import('./dinosaur/dinosaur.module').then(m => m.GatewayDinosaurModule)
      },
      {
        path: 'sighting',
        loadChildren: () => import('./sighting/sighting.module').then(m => m.GatewaySightingModule)
      },
      {
        path: 'player',
        loadChildren: () => import('./player/player.module').then(m => m.GatewayPlayerModule)
      },
      {
        path: 'level',
        loadChildren: () => import('./level/level.module').then(m => m.GatewayLevelModule)
      },
      {
        path: 'high-score',
        loadChildren: () => import('./high-score/high-score.module').then(m => m.GatewayHighScoreModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatewayEntityModule {}
