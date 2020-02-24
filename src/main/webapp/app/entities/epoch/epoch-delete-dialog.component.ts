import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEpoch } from 'app/shared/model/epoch.model';
import { EpochService } from './epoch.service';

@Component({
  templateUrl: './epoch-delete-dialog.component.html'
})
export class EpochDeleteDialogComponent {
  epoch?: IEpoch;

  constructor(protected epochService: EpochService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.epochService.delete(id).subscribe(() => {
      this.eventManager.broadcast('epochListModification');
      this.activeModal.close();
    });
  }
}
