import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHighScore, HighScore } from 'app/shared/model/high-score.model';
import { HighScoreService } from './high-score.service';
import { HighScoreComponent } from './high-score.component';
import { HighScoreDetailComponent } from './high-score-detail.component';
import { HighScoreUpdateComponent } from './high-score-update.component';

@Injectable({ providedIn: 'root' })
export class HighScoreResolve implements Resolve<IHighScore> {
  constructor(private service: HighScoreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHighScore> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((highScore: HttpResponse<HighScore>) => {
          if (highScore.body) {
            return of(highScore.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HighScore());
  }
}

export const highScoreRoute: Routes = [
  {
    path: '',
    component: HighScoreComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.highScore.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HighScoreDetailComponent,
    resolve: {
      highScore: HighScoreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.highScore.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HighScoreUpdateComponent,
    resolve: {
      highScore: HighScoreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.highScore.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HighScoreUpdateComponent,
    resolve: {
      highScore: HighScoreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.highScore.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
