import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { BookingDataSource } from '../../../data/datasources/booking.datasource';
import { TableDataSource } from '../../../data/datasources/table.datasource';
import { TableEntity } from '../../../data/entities/table.entity';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-new-booking',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './new-booking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBookingComponent implements OnInit {
  private readonly bookingDs = inject(BookingDataSource);
  private readonly tableDs = inject(TableDataSource);
  private readonly router = inject(Router);

  protected readonly tables = signal<TableEntity[]>([]);
  protected readonly isSubmitting = signal(false);
  protected readonly isSubmitted = signal(false);
  protected readonly today = new Date().toISOString().split('T')[0];
  protected readonly maxComensales = signal(20);

  protected readonly form = new FormGroup({
    cliente: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    fecha: new FormControl('', { validators: [Validators.required] }),
    hora: new FormControl('', { validators: [Validators.required] }),
    mesaId: new FormControl('', { validators: [Validators.required] }),
    comensales: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1), Validators.max(20)] }),
    notas: new FormControl(''),
  });

  ngOnInit() {
    this.tableDs.getAll().subscribe(tables => this.tables.set(tables));

    this.form.get('mesaId')!.valueChanges.subscribe(mesaId => {
      const table = this.tables().find(t => t.id === Number(mesaId));
      const cap = table?.capacidad ?? 20;
      this.maxComensales.set(cap);

      const comensalesCtrl = this.form.get('comensales')!;
      comensalesCtrl.setValidators([Validators.required, Validators.min(1), Validators.max(cap)]);
      comensalesCtrl.updateValueAndValidity();
    });
  }

  getFieldClass(field: keyof typeof this.form.controls): string {
    const ctrl = this.form.get(field)!;
    const base = 'w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 bg-white shadow-sm placeholder:text-slate-400';
    return ctrl.invalid && (ctrl.dirty || ctrl.touched || this.isSubmitted())
      ? `${base} border-rose-300 text-rose-900 focus:border-rose-500 focus:ring-rose-500`
      : `${base} border-slate-200 text-slate-800 focus:border-slate-900 focus:ring-slate-900`;
  }

  isFieldInvalid(field: keyof typeof this.form.controls): boolean {
    const ctrl = this.form.get(field)!;
    return ctrl.invalid && (ctrl.dirty || ctrl.touched || this.isSubmitted());
  }

  hasError(field: keyof typeof this.form.controls): boolean {
    const ctrl = this.form.get(field)!;
    return ctrl.invalid && (ctrl.dirty || ctrl.touched || this.isSubmitted());
  }

  getFieldError(field: keyof typeof this.form.controls): string {
    const ctrl = this.form.get(field)!;
    if (ctrl.hasError('required')) {
      const labels: Record<string, string> = {
        cliente: 'El nombre es obligatorio.',
        fecha: 'La fecha es obligatoria.',
        hora: 'La hora es obligatoria.',
        mesaId: 'Selecciona una mesa.',
        comensales: 'Obligatorio.',
      };
      return labels[field] || 'Obligatorio.';
    }
    if (ctrl.hasError('minlength')) return 'Mínimo 3 caracteres.';
    if (ctrl.hasError('min')) return 'Mínimo 1.';
    if (ctrl.hasError('max')) return `Máximo ${this.maxComensales()} personas para esta mesa.`;
    return '';
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    const data = {
      ...this.form.value,
      mesaId: Number(this.form.value.mesaId),
      estado: 'pendiente',
    };

    this.bookingDs.create(data as Omit<import('../../../data/entities/booking.entity').BookingEntity, 'id'>).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/listado']);
      },
      error: () => this.isSubmitting.set(false),
    });
  }

  onReset() {
    this.form.reset({ cliente: '', fecha: '', hora: '', mesaId: '', comensales: null, notas: '' });
    this.isSubmitted.set(false);
  }

  goBack() {
    this.router.navigate(['/listado']);
  }
}
