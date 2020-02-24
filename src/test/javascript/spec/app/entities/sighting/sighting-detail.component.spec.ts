import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { SightingDetailComponent } from 'app/entities/sighting/sighting-detail.component';
import { Sighting } from 'app/shared/model/sighting.model';

describe('Component Tests', () => {
  describe('Sighting Management Detail Component', () => {
    let comp: SightingDetailComponent;
    let fixture: ComponentFixture<SightingDetailComponent>;
    const route = ({ data: of({ sighting: new Sighting(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SightingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SightingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SightingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sighting on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sighting).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
