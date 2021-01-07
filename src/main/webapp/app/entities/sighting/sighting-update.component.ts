import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISighting, Sighting } from 'app/shared/model/sighting.model';
import { SightingService } from './sighting.service';

@Component({
  selector: 'jhi-sighting-update',
  templateUrl: './sighting-update.component.html',
})
export class SightingUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    dinosaur: [null, [Validators.required, Validators.min(0)]],
    byUser: [null, [Validators.required, Validators.min(0)]],
    whenDt: [null, [Validators.required]],
    lat: [null, [Validators.required]],
    lng: [null, [Validators.required]],
    number: [null, [Validators.min(0), Validators.max(999)]],
    heading: [],
    notes: [null, [Validators.maxLength(64)]],
  });

  constructor(protected sightingService: SightingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sighting }) => {
      if (!sighting.id) {
        const today = moment().startOf('day');
        sighting.whenDt = today;
      }

      this.updateForm(sighting);
    });
  }

  updateForm(sighting: ISighting): void {
    this.editForm.patchValue({
      id: sighting.id,
      dinosaur: sighting.dinosaur,
      byUser: sighting.byUser,
      whenDt: sighting.whenDt ? sighting.whenDt.format(DATE_TIME_FORMAT) : null,
      lat: sighting.lat,
      lng: sighting.lng,
      number: sighting.number,
      heading: sighting.heading,
      notes: sighting.notes,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sighting = this.createFromForm();
    if (sighting.id !== undefined) {
      this.subscribeToSaveResponse(this.sightingService.update(sighting));
    } else {
      this.subscribeToSaveResponse(this.sightingService.create(sighting));
    }
  }

  private createFromForm(): ISighting {
    return {
      ...new Sighting(),
      id: this.editForm.get(['id'])!.value,
      dinosaur: this.editForm.get(['dinosaur'])!.value,
      byUser: this.editForm.get(['byUser'])!.value,
      whenDt: this.editForm.get(['whenDt'])!.value ? moment(this.editForm.get(['whenDt'])!.value, DATE_TIME_FORMAT) : undefined,
      lat: this.editForm.get(['lat'])!.value,
      lng: this.editForm.get(['lng'])!.value,
      number: this.editForm.get(['number'])!.value,
      heading: this.editForm.get(['heading'])!.value,
      notes: this.editForm.get(['notes'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISighting>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
