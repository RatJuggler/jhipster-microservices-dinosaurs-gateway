import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { CladeDetailComponent } from 'app/entities/clade/clade-detail.component';
import { Clade } from 'app/shared/model/clade.model';

describe('Component Tests', () => {
  describe('Clade Management Detail Component', () => {
    let comp: CladeDetailComponent;
    let fixture: ComponentFixture<CladeDetailComponent>;
    const route = ({ data: of({ clade: new Clade(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CladeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CladeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CladeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load clade on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.clade).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
