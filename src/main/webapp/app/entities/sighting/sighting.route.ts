import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISighting, Sighting } from 'app/shared/model/sighting.model';
import { SightingService } from './sighting.service';
import { SightingComponent } from './sighting.component';
import { SightingDetailComponent } from './sighting-detail.component';
import { SightingUpdateComponent } from './sighting-update.component';

@Injectable({ providedIn: 'root' })
export class SightingResolve implements Resolve<ISighting> {
  constructor(private service: SightingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISighting> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sighting: HttpResponse<Sighting>) => {
          if (sighting.body) {
            return of(sighting.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Sighting());
  }
}

export const sightingRoute: Routes = [
  {
    path: '',
    component: SightingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.sighting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SightingDetailComponent,
    resolve: {
      sighting: SightingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.sighting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SightingUpdateComponent,
    resolve: {
      sighting: SightingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.sighting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SightingUpdateComponent,
    resolve: {
      sighting: SightingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.sighting.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
