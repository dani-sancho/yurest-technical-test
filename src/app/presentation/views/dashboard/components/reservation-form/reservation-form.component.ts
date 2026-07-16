import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TableEntity } from '../../../../../data/entities/table.entity';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './reservation-form.component.html',
})
export class ReservationFormComponent {
  tables = input<TableEntity[]>([]);
  isSubmitting = input<boolean>(false);
  submitForm = output<any>();
  resetForm = output<void>();

  protected readonly today = new Date().toISOString().split('T')[0];
  protected formData = this.getInitialFormData();

  private getInitialFormData() {
    return { cliente: '', fecha: '', hora: '', mesaId: '', comensales: null as number | null, notas: '' };
  }

  isFieldInvalid(field: any, form: NgForm): boolean {
    return field.invalid && (field.dirty || field.touched || form.submitted);
  }

  getInputClass(field: any, form: NgForm): string {
    const base = 'w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 bg-white shadow-sm placeholder:text-slate-400';
    return this.isFieldInvalid(field, form)
      ? `${base} border-rose-300 text-rose-900 focus:border-rose-500 focus:ring-rose-500`
      : `${base} border-slate-200 text-slate-800 focus:border-slate-900 focus:ring-slate-900`;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.submitForm.emit({ ...this.formData, mesaId: Number(this.formData.mesaId), estado: 'pendiente' });
  }

  onReset(form: NgForm) {
    form.resetForm();
    this.formData = this.getInitialFormData();
    this.resetForm.emit();
  }
}
