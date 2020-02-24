import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { EpochDetailComponent } from 'app/entities/epoch/epoch-detail.component';
import { Epoch } from 'app/shared/model/epoch.model';

describe('Component Tests', () => {
  describe('Epoch Management Detail Component', () => {
    let comp: EpochDetailComponent;
    let fixture: ComponentFixture<EpochDetailComponent>;
    const route = ({ data: of({ epoch: new Epoch(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EpochDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EpochDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EpochDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load epoch on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.epoch).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
