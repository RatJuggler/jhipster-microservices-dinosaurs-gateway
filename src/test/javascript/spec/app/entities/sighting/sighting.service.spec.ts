import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SightingService } from 'app/entities/sighting/sighting.service';
import { ISighting, Sighting } from 'app/shared/model/sighting.model';
import { Heading } from 'app/shared/model/enumerations/heading.model';

describe('Service Tests', () => {
  describe('Sighting Service', () => {
    let injector: TestBed;
    let service: SightingService;
    let httpMock: HttpTestingController;
    let elemDefault: ISighting;
    let expectedResult: ISighting | ISighting[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SightingService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Sighting(0, 0, 0, currentDate, 0, 0, 0, Heading.STATIONARY, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            whenDt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Sighting', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            whenDt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            whenDt: currentDate
          },
          returnedFromService
        );

        service.create(new Sighting()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Sighting', () => {
        const returnedFromService = Object.assign(
          {
            dinosaur: 1,
            byUser: 1,
            whenDt: currentDate.format(DATE_TIME_FORMAT),
            lat: 1,
            lng: 1,
            number: 1,
            heading: 'BBBBBB',
            notes: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            whenDt: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Sighting', () => {
        const returnedFromService = Object.assign(
          {
            dinosaur: 1,
            byUser: 1,
            whenDt: currentDate.format(DATE_TIME_FORMAT),
            lat: 1,
            lng: 1,
            number: 1,
            heading: 'BBBBBB',
            notes: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            whenDt: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Sighting', () => {
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
