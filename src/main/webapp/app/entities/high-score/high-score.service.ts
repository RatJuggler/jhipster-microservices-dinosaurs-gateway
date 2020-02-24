import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IHighScore } from 'app/shared/model/high-score.model';

type EntityResponseType = HttpResponse<IHighScore>;
type EntityArrayResponseType = HttpResponse<IHighScore[]>;

@Injectable({ providedIn: 'root' })
export class HighScoreService {
  public resourceUrl = SERVER_API_URL + 'api/high-scores';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/high-scores';

  constructor(protected http: HttpClient) {}

  create(highScore: IHighScore): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(highScore);
    return this.http
      .post<IHighScore>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(highScore: IHighScore): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(highScore);
    return this.http
      .put<IHighScore>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHighScore>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHighScore[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHighScore[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(highScore: IHighScore): IHighScore {
    const copy: IHighScore = Object.assign({}, highScore, {
      achievedDt: highScore.achievedDt && highScore.achievedDt.isValid() ? highScore.achievedDt.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.achievedDt = res.body.achievedDt ? moment(res.body.achievedDt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((highScore: IHighScore) => {
        highScore.achievedDt = highScore.achievedDt ? moment(highScore.achievedDt) : undefined;
      });
    }
    return res;
  }
}
