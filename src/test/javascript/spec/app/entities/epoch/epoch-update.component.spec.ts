import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { EpochUpdateComponent } from 'app/entities/epoch/epoch-update.component';
import { EpochService } from 'app/entities/epoch/epoch.service';
import { Epoch } from 'app/shared/model/epoch.model';

describe('Component Tests', () => {
  describe('Epoch Management Update Component', () => {
    let comp: EpochUpdateComponent;
    let fixture: ComponentFixture<EpochUpdateComponent>;
    let service: EpochService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EpochUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EpochUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EpochUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EpochService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Epoch(123);
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
        const entity = new Epoch();
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
