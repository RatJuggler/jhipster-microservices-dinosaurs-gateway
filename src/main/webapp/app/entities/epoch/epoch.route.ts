import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEpoch, Epoch } from 'app/shared/model/epoch.model';
import { EpochService } from './epoch.service';
import { EpochComponent } from './epoch.component';
import { EpochDetailComponent } from './epoch-detail.component';
import { EpochUpdateComponent } from './epoch-update.component';

@Injectable({ providedIn: 'root' })
export class EpochResolve implements Resolve<IEpoch> {
  constructor(private service: EpochService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEpoch> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((epoch: HttpResponse<Epoch>) => {
          if (epoch.body) {
            return of(epoch.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Epoch());
  }
}

export const epochRoute: Routes = [
  {
    path: '',
    component: EpochComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.epoch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EpochDetailComponent,
    resolve: {
      epoch: EpochResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.epoch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EpochUpdateComponent,
    resolve: {
      epoch: EpochResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.epoch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EpochUpdateComponent,
    resolve: {
      epoch: EpochResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.epoch.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
