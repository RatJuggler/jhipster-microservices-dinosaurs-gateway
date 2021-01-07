import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ILevel } from 'app/shared/model/level.model';

type EntityResponseType = HttpResponse<ILevel>;
type EntityArrayResponseType = HttpResponse<ILevel[]>;

@Injectable({ providedIn: 'root' })
export class LevelService {
  public resourceUrl = SERVER_API_URL + 'api/levels';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/levels';

  constructor(protected http: HttpClient) {}

  create(level: ILevel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(level);
    return this.http
      .post<ILevel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(level: ILevel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(level);
    return this.http
      .put<ILevel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILevel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILevel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILevel[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(level: ILevel): ILevel {
    const copy: ILevel = Object.assign({}, level, {
      createdDt: level.createdDt && level.createdDt.isValid() ? level.createdDt.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDt = res.body.createdDt ? moment(res.body.createdDt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((level: ILevel) => {
        level.createdDt = level.createdDt ? moment(level.createdDt) : undefined;
      });
    }
    return res;
  }
}
