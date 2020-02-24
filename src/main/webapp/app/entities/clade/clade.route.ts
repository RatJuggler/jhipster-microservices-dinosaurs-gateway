import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClade, Clade } from 'app/shared/model/clade.model';
import { CladeService } from './clade.service';
import { CladeComponent } from './clade.component';
import { CladeDetailComponent } from './clade-detail.component';
import { CladeUpdateComponent } from './clade-update.component';

@Injectable({ providedIn: 'root' })
export class CladeResolve implements Resolve<IClade> {
  constructor(private service: CladeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClade> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((clade: HttpResponse<Clade>) => {
          if (clade.body) {
            return of(clade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Clade());
  }
}

export const cladeRoute: Routes = [
  {
    path: '',
    component: CladeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.clade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CladeDetailComponent,
    resolve: {
      clade: CladeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.clade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CladeUpdateComponent,
    resolve: {
      clade: CladeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.clade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CladeUpdateComponent,
    resolve: {
      clade: CladeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.clade.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
