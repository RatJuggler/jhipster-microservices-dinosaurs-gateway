import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISighting } from 'app/shared/model/sighting.model';
import { SightingService } from './sighting.service';

@Component({
  templateUrl: './sighting-delete-dialog.component.html'
})
export class SightingDeleteDialogComponent {
  sighting?: ISighting;

  constructor(protected sightingService: SightingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sightingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sightingListModification');
      this.activeModal.close();
    });
  }
}
