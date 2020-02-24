import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ISighting } from 'app/shared/model/sighting.model';

type EntityResponseType = HttpResponse<ISighting>;
type EntityArrayResponseType = HttpResponse<ISighting[]>;

@Injectable({ providedIn: 'root' })
export class SightingService {
  public resourceUrl = SERVER_API_URL + 'api/sightings';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/sightings';

  constructor(protected http: HttpClient) {}

  create(sighting: ISighting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sighting);
    return this.http
      .post<ISighting>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sighting: ISighting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sighting);
    return this.http
      .put<ISighting>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISighting>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISighting[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISighting[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(sighting: ISighting): ISighting {
    const copy: ISighting = Object.assign({}, sighting, {
      whenDt: sighting.whenDt && sighting.whenDt.isValid() ? sighting.whenDt.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.whenDt = res.body.whenDt ? moment(res.body.whenDt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sighting: ISighting) => {
        sighting.whenDt = sighting.whenDt ? moment(sighting.whenDt) : undefined;
      });
    }
    return res;
  }
}
