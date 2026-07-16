import { Component, input, ChangeDetectionStrategy, computed, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'icon' | 'success' | 'danger'>('primary');
  size = input<'md' | 'sm'>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  loading = input(false);
  loadingLabel = input('Guardando...');
  handler = output<void>();

  protected readonly classes = computed(() => {
    const base =
      'inline-flex items-center justify-center gap-2 transition-all focus:outline-none disabled:cursor-not-allowed';

    const sizes: Record<string, string> = {
      md: 'px-5 py-2.5 text-sm',
      sm: 'px-3 py-1.5 text-xs',
    };

    const variants: Record<string, string> = {
      primary: `${base} rounded-xl bg-slate-900 font-semibold text-white shadow-md hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-75`,
      secondary: `${base} rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:ring-2 focus:ring-slate-200 disabled:opacity-50`,
      icon: `${base} rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900`,
      success: `${base} rounded-lg font-semibold border transition-all active:scale-[0.97] focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-40`,
      danger: `${base} rounded-lg font-semibold border transition-all active:scale-[0.97] focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-40`,
    };

    const size = this.variant() === 'icon' ? '' : sizes[this.size()];
    return `${variants[this.variant()]} ${size}`;
  });

  protected readonly contentClass = computed(() => {
    if (this.variant() === 'success') {
      return this.disabled() || this.loading()
        ? 'text-slate-300 bg-slate-50 border-slate-100'
        : 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100';
    }
    if (this.variant() === 'danger') {
      return this.disabled() || this.loading()
        ? 'text-slate-300 bg-slate-50 border-slate-100'
        : 'text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100';
    }
    return '';
  });

  onClick() {
    if (this.disabled() || this.loading()) {
      return;
    }

    this.handler.emit();
  }
}
