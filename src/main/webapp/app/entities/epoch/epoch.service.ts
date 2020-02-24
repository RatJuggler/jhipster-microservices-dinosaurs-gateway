import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IEpoch } from 'app/shared/model/epoch.model';

type EntityResponseType = HttpResponse<IEpoch>;
type EntityArrayResponseType = HttpResponse<IEpoch[]>;

@Injectable({ providedIn: 'root' })
export class EpochService {
  public resourceUrl = SERVER_API_URL + 'api/epoches';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/epoches';

  constructor(protected http: HttpClient) {}

  create(epoch: IEpoch): Observable<EntityResponseType> {
    return this.http.post<IEpoch>(this.resourceUrl, epoch, { observe: 'response' });
  }

  update(epoch: IEpoch): Observable<EntityResponseType> {
    return this.http.put<IEpoch>(this.resourceUrl, epoch, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEpoch>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEpoch[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEpoch[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
