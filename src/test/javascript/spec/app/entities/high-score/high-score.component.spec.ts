import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { HighScoreComponent } from 'app/entities/high-score/high-score.component';
import { HighScoreService } from 'app/entities/high-score/high-score.service';
import { HighScore } from 'app/shared/model/high-score.model';

describe('Component Tests', () => {
  describe('HighScore Management Component', () => {
    let comp: HighScoreComponent;
    let fixture: ComponentFixture<HighScoreComponent>;
    let service: HighScoreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [HighScoreComponent]
      })
        .overrideTemplate(HighScoreComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HighScoreComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HighScoreService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HighScore(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.highScores && comp.highScores[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
