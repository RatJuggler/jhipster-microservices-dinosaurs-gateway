import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EpochService } from 'app/entities/epoch/epoch.service';
import { IEpoch, Epoch } from 'app/shared/model/epoch.model';
import { Period } from 'app/shared/model/enumerations/period.model';
import { EpochRange } from 'app/shared/model/enumerations/epoch-range.model';

describe('Service Tests', () => {
  describe('Epoch Service', () => {
    let injector: TestBed;
    let service: EpochService;
    let httpMock: HttpTestingController;
    let elemDefault: IEpoch;
    let expectedResult: IEpoch | IEpoch[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EpochService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Epoch(0, Period.TRIASSIC, EpochRange.EARLY_LOWER, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Epoch', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Epoch()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Epoch', () => {
        const returnedFromService = Object.assign(
          {
            period: 'BBBBBB',
            epoch: 'BBBBBB',
            fromMa: 1,
            toMa: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Epoch', () => {
        const returnedFromService = Object.assign(
          {
            period: 'BBBBBB',
            epoch: 'BBBBBB',
            fromMa: 1,
            toMa: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Epoch', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
