import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHighScore } from 'app/shared/model/high-score.model';
import { HighScoreService } from './high-score.service';
import { HighScoreDeleteDialogComponent } from './high-score-delete-dialog.component';

@Component({
  selector: 'jhi-high-score',
  templateUrl: './high-score.component.html',
})
export class HighScoreComponent implements OnInit, OnDestroy {
  highScores?: IHighScore[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected highScoreService: HighScoreService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.highScoreService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IHighScore[]>) => (this.highScores = res.body || []));
      return;
    }

    this.highScoreService.query().subscribe((res: HttpResponse<IHighScore[]>) => (this.highScores = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHighScores();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHighScore): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHighScores(): void {
    this.eventSubscriber = this.eventManager.subscribe('highScoreListModification', () => this.loadAll());
  }

  delete(highScore: IHighScore): void {
    const modalRef = this.modalService.open(HighScoreDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.highScore = highScore;
  }
}
