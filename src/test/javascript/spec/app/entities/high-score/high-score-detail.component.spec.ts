import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { HighScoreDetailComponent } from 'app/entities/high-score/high-score-detail.component';
import { HighScore } from 'app/shared/model/high-score.model';

describe('Component Tests', () => {
  describe('HighScore Management Detail Component', () => {
    let comp: HighScoreDetailComponent;
    let fixture: ComponentFixture<HighScoreDetailComponent>;
    const route = ({ data: of({ highScore: new HighScore(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [HighScoreDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(HighScoreDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HighScoreDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load highScore on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.highScore).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
