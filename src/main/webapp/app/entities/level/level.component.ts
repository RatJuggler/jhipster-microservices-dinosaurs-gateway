import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILevel } from 'app/shared/model/level.model';
import { LevelService } from './level.service';
import { LevelDeleteDialogComponent } from './level-delete-dialog.component';

@Component({
  selector: 'jhi-level',
  templateUrl: './level.component.html'
})
export class LevelComponent implements OnInit, OnDestroy {
  levels?: ILevel[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected levelService: LevelService,
    protected dataUtils: JhiDataUtils,
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
      this.levelService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ILevel[]>) => (this.levels = res.body || []));
      return;
    }

    this.levelService.query().subscribe((res: HttpResponse<ILevel[]>) => (this.levels = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLevels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILevel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInLevels(): void {
    this.eventSubscriber = this.eventManager.subscribe('levelListModification', () => this.loadAll());
  }

  delete(level: ILevel): void {
    const modalRef = this.modalService.open(LevelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.level = level;
  }
}
