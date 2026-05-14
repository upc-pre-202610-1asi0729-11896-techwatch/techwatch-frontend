import {Component, inject} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import {ManagementStore} from '../../../../application/mangament-store';
import {DeviceEntity} from '../../../../domain/models/device/device-entity';

@Component({
  selector: 'app-device-form',
  imports: [TitleCasePipe, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './device-form.html',
  styleUrl: './device-form.css',
})
export class DeviceForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly store = inject(ManagementStore);

  readonly deviceTypes = ['climate', 'lighting', 'entertainment', 'kitchen'];
  readonly statusOptions = ['on', 'off'];

  form = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    powerWatts: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    status: new FormControl<string>('off', { nonNullable: true, validators: [Validators.required] }),
    homeId: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
  });

  isEdit = false;
  deviceId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.deviceId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.deviceId;
      if (this.isEdit && this.deviceId) {
        const device = this.store.getDeviceById(this.deviceId)();
        if (device) {
          this.form.patchValue({
            name: device.name,
            type: device.type,
            powerWatts: device.powerWatts,
            status: device.status,
            homeId: device.homeId,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const device = new DeviceEntity({
      id: this.deviceId ?? 0,
      name: this.form.value.name!,
      type: this.form.value.type!,
      powerWatts: this.form.value.powerWatts!,
      status: this.form.value.status!,
      homeId: this.form.value.homeId!,
    });

    if (this.isEdit) {
      this.store.updateDevice(device);
    } else {
      this.store.addDevices(device);
    }

    this.router.navigate(['/management/devices']);
  }

  cancel() {
    this.router.navigate(['/management/devices']);
  }
}
