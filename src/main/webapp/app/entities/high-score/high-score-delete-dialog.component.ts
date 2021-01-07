import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHighScore } from 'app/shared/model/high-score.model';
import { HighScoreService } from './high-score.service';

@Component({
  templateUrl: './high-score-delete-dialog.component.html',
})
export class HighScoreDeleteDialogComponent {
  highScore?: IHighScore;

  constructor(protected highScoreService: HighScoreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.highScoreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('highScoreListModification');
      this.activeModal.close();
    });
  }
}
