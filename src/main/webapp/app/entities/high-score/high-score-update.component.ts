import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHighScore, HighScore } from 'app/shared/model/high-score.model';
import { HighScoreService } from './high-score.service';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';
import { ILevel } from 'app/shared/model/level.model';
import { LevelService } from 'app/entities/level/level.service';

type SelectableEntity = IPlayer | ILevel;

@Component({
  selector: 'jhi-high-score-update',
  templateUrl: './high-score-update.component.html'
})
export class HighScoreUpdateComponent implements OnInit {
  isSaving = false;
  players: IPlayer[] = [];
  levels: ILevel[] = [];

  editForm = this.fb.group({
    id: [],
    score: [null, [Validators.required]],
    achievedDt: [null, [Validators.required]],
    player: [null, Validators.required],
    level: [null, Validators.required]
  });

  constructor(
    protected highScoreService: HighScoreService,
    protected playerService: PlayerService,
    protected levelService: LevelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ highScore }) => {
      if (!highScore.id) {
        const today = moment().startOf('day');
        highScore.achievedDt = today;
      }

      this.updateForm(highScore);

      this.playerService
        .query({ filter: 'highscore-is-null' })
        .pipe(
          map((res: HttpResponse<IPlayer[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPlayer[]) => {
          if (!highScore.player || !highScore.player.id) {
            this.players = resBody;
          } else {
            this.playerService
              .find(highScore.player.id)
              .pipe(
                map((subRes: HttpResponse<IPlayer>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPlayer[]) => (this.players = concatRes));
          }
        });

      this.levelService
        .query({ filter: 'highscore-is-null' })
        .pipe(
          map((res: HttpResponse<ILevel[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ILevel[]) => {
          if (!highScore.level || !highScore.level.id) {
            this.levels = resBody;
          } else {
            this.levelService
              .find(highScore.level.id)
              .pipe(
                map((subRes: HttpResponse<ILevel>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILevel[]) => (this.levels = concatRes));
          }
        });
    });
  }

  updateForm(highScore: IHighScore): void {
    this.editForm.patchValue({
      id: highScore.id,
      score: highScore.score,
      achievedDt: highScore.achievedDt ? highScore.achievedDt.format(DATE_TIME_FORMAT) : null,
      player: highScore.player,
      level: highScore.level
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const highScore = this.createFromForm();
    if (highScore.id !== undefined) {
      this.subscribeToSaveResponse(this.highScoreService.update(highScore));
    } else {
      this.subscribeToSaveResponse(this.highScoreService.create(highScore));
    }
  }

  private createFromForm(): IHighScore {
    return {
      ...new HighScore(),
      id: this.editForm.get(['id'])!.value,
      score: this.editForm.get(['score'])!.value,
      achievedDt: this.editForm.get(['achievedDt'])!.value ? moment(this.editForm.get(['achievedDt'])!.value, DATE_TIME_FORMAT) : undefined,
      player: this.editForm.get(['player'])!.value,
      level: this.editForm.get(['level'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHighScore>>): void {
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
