import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IPlayer } from 'app/shared/model/player.model';

type EntityResponseType = HttpResponse<IPlayer>;
type EntityArrayResponseType = HttpResponse<IPlayer[]>;

@Injectable({ providedIn: 'root' })
export class PlayerService {
  public resourceUrl = SERVER_API_URL + 'api/players';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/players';

  constructor(protected http: HttpClient) {}

  create(player: IPlayer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(player);
    return this.http
      .post<IPlayer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(player: IPlayer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(player);
    return this.http
      .put<IPlayer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlayer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlayer[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlayer[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(player: IPlayer): IPlayer {
    const copy: IPlayer = Object.assign({}, player, {
      createdDt: player.createdDt && player.createdDt.isValid() ? player.createdDt.toJSON() : undefined,
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
      res.body.forEach((player: IPlayer) => {
        player.createdDt = player.createdDt ? moment(player.createdDt) : undefined;
      });
    }
    return res;
  }
}
