import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEpoch, Epoch } from 'app/shared/model/epoch.model';
import { EpochService } from './epoch.service';

@Component({
  selector: 'jhi-epoch-update',
  templateUrl: './epoch-update.component.html'
})
export class EpochUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    period: [null, [Validators.required]],
    epoch: [null, [Validators.required]],
    fromMa: [null, [Validators.required, Validators.min(0), Validators.max(999)]],
    toMa: [null, [Validators.required, Validators.min(0), Validators.max(999)]]
  });

  constructor(protected epochService: EpochService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ epoch }) => {
      this.updateForm(epoch);
    });
  }

  updateForm(epoch: IEpoch): void {
    this.editForm.patchValue({
      id: epoch.id,
      period: epoch.period,
      epoch: epoch.epoch,
      fromMa: epoch.fromMa,
      toMa: epoch.toMa
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const epoch = this.createFromForm();
    if (epoch.id !== undefined) {
      this.subscribeToSaveResponse(this.epochService.update(epoch));
    } else {
      this.subscribeToSaveResponse(this.epochService.create(epoch));
    }
  }

  private createFromForm(): IEpoch {
    return {
      ...new Epoch(),
      id: this.editForm.get(['id'])!.value,
      period: this.editForm.get(['period'])!.value,
      epoch: this.editForm.get(['epoch'])!.value,
      fromMa: this.editForm.get(['fromMa'])!.value,
      toMa: this.editForm.get(['toMa'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEpoch>>): void {
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
