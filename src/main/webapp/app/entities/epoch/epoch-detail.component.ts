import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEpoch } from 'app/shared/model/epoch.model';

@Component({
  selector: 'jhi-epoch-detail',
  templateUrl: './epoch-detail.component.html',
})
export class EpochDetailComponent implements OnInit {
  epoch: IEpoch | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ epoch }) => (this.epoch = epoch));
  }

  previousState(): void {
    window.history.back();
  }
}
