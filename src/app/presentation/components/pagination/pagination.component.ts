import { Component, computed, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  page = input.required<number>();
  total = input.required<number>();
  limit = input(10);
  pageChange = output<number>();

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.limit())),
  );
  protected readonly from = computed(() =>
    this.total() === 0 ? 0 : (this.page() - 1) * this.limit() + 1,
  );
  protected readonly to = computed(() => Math.min(this.page() * this.limit(), this.total()));

  protected readonly pages = computed(() => {
    const total = this.totalPages();
    const current = this.page();
    const delta = 2;
    const range: (number | '...')[] = [];

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }

    return range;
  });

  goTo(p: number) {
    if (p >= 1 && p <= this.totalPages() && p !== this.page()) {
      this.pageChange.emit(p);
    }
  }
}
