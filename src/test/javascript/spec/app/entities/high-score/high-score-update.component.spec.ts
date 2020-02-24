import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { HighScoreUpdateComponent } from 'app/entities/high-score/high-score-update.component';
import { HighScoreService } from 'app/entities/high-score/high-score.service';
import { HighScore } from 'app/shared/model/high-score.model';

describe('Component Tests', () => {
  describe('HighScore Management Update Component', () => {
    let comp: HighScoreUpdateComponent;
    let fixture: ComponentFixture<HighScoreUpdateComponent>;
    let service: HighScoreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [HighScoreUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HighScoreUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HighScoreUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HighScoreService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HighScore(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new HighScore();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
