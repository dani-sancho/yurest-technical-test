import { Component, input, output, ChangeDetectionStrategy, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  open = input(false);
  title = input('');
  close = output<void>();

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open()) this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.close.emit();
  }
}
