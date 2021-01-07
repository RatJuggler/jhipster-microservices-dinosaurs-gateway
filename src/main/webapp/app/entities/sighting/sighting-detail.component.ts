import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISighting } from 'app/shared/model/sighting.model';

@Component({
  selector: 'jhi-sighting-detail',
  templateUrl: './sighting-detail.component.html',
})
export class SightingDetailComponent implements OnInit {
  sighting: ISighting | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sighting }) => (this.sighting = sighting));
  }

  previousState(): void {
    window.history.back();
  }
}
