import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDinosaur, Dinosaur } from 'app/shared/model/dinosaur.model';
import { DinosaurService } from './dinosaur.service';
import { IEpoch } from 'app/shared/model/epoch.model';
import { EpochService } from 'app/entities/epoch/epoch.service';
import { IClade } from 'app/shared/model/clade.model';
import { CladeService } from 'app/entities/clade/clade.service';

type SelectableEntity = IEpoch | IClade;

@Component({
  selector: 'jhi-dinosaur-update',
  templateUrl: './dinosaur-update.component.html',
})
export class DinosaurUpdateComponent implements OnInit {
  isSaving = false;
  epoches: IEpoch[] = [];
  clades: IClade[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(64)]],
    pronunciation: [null, [Validators.maxLength(64)]],
    meaning: [null, [Validators.maxLength(64)]],
    weight: [null, [Validators.min(0), Validators.max(999)]],
    length: [null, [Validators.min(0), Validators.max(999)]],
    height: [null, [Validators.min(0), Validators.max(999)]],
    diet: [],
    createdBy: [null, [Validators.required, Validators.min(0)]],
    createdDt: [null, [Validators.required]],
    modifiedBy: [null, [Validators.min(0)]],
    modifiedDt: [],
    epochItLivedId: [null, Validators.required],
    cladeId: [null, Validators.required],
  });

  constructor(
    protected dinosaurService: DinosaurService,
    protected epochService: EpochService,
    protected cladeService: CladeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dinosaur }) => {
      if (!dinosaur.id) {
        const today = moment().startOf('day');
        dinosaur.createdDt = today;
        dinosaur.modifiedDt = today;
      }

      this.updateForm(dinosaur);

      this.epochService.query().subscribe((res: HttpResponse<IEpoch[]>) => (this.epoches = res.body || []));

      this.cladeService.query().subscribe((res: HttpResponse<IClade[]>) => (this.clades = res.body || []));
    });
  }

  updateForm(dinosaur: IDinosaur): void {
    this.editForm.patchValue({
      id: dinosaur.id,
      name: dinosaur.name,
      pronunciation: dinosaur.pronunciation,
      meaning: dinosaur.meaning,
      weight: dinosaur.weight,
      length: dinosaur.length,
      height: dinosaur.height,
      diet: dinosaur.diet,
      createdBy: dinosaur.createdBy,
      createdDt: dinosaur.createdDt ? dinosaur.createdDt.format(DATE_TIME_FORMAT) : null,
      modifiedBy: dinosaur.modifiedBy,
      modifiedDt: dinosaur.modifiedDt ? dinosaur.modifiedDt.format(DATE_TIME_FORMAT) : null,
      epochItLivedId: dinosaur.epochItLivedId,
      cladeId: dinosaur.cladeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dinosaur = this.createFromForm();
    if (dinosaur.id !== undefined) {
      this.subscribeToSaveResponse(this.dinosaurService.update(dinosaur));
    } else {
      this.subscribeToSaveResponse(this.dinosaurService.create(dinosaur));
    }
  }

  private createFromForm(): IDinosaur {
    return {
      ...new Dinosaur(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      pronunciation: this.editForm.get(['pronunciation'])!.value,
      meaning: this.editForm.get(['meaning'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      length: this.editForm.get(['length'])!.value,
      height: this.editForm.get(['height'])!.value,
      diet: this.editForm.get(['diet'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value,
      createdDt: this.editForm.get(['createdDt'])!.value ? moment(this.editForm.get(['createdDt'])!.value, DATE_TIME_FORMAT) : undefined,
      modifiedBy: this.editForm.get(['modifiedBy'])!.value,
      modifiedDt: this.editForm.get(['modifiedDt'])!.value ? moment(this.editForm.get(['modifiedDt'])!.value, DATE_TIME_FORMAT) : undefined,
      epochItLivedId: this.editForm.get(['epochItLivedId'])!.value,
      cladeId: this.editForm.get(['cladeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDinosaur>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
