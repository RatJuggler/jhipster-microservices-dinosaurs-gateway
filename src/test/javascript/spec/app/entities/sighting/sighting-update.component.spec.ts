import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { SightingUpdateComponent } from 'app/entities/sighting/sighting-update.component';
import { SightingService } from 'app/entities/sighting/sighting.service';
import { Sighting } from 'app/shared/model/sighting.model';

describe('Component Tests', () => {
  describe('Sighting Management Update Component', () => {
    let comp: SightingUpdateComponent;
    let fixture: ComponentFixture<SightingUpdateComponent>;
    let service: SightingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SightingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SightingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SightingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SightingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sighting(123);
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
        const entity = new Sighting();
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
