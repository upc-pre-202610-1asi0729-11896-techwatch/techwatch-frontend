import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MangamentStore} from '../../../../application/mangament-store';
import  {DeviceEntity} from '../../../../domain/models/device/device-entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-device-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInput],
  templateUrl: './device-form.html',
  styleUrl: './device-form.css',
})
export class DeviceForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(MangamentStore);

  isEdit = false;
  deviceId: number | null = null;

  form = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    powerWatts: new FormControl<number | null>(null, { validators: [Validators.required] }),
    homeId: new FormControl<number | null>(null),
  });
  homes = this.store.homes;

  constructor() {
    this.route.params.subscribe((params) => {
      this.deviceId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.deviceId;
      if (this.isEdit && this.deviceId) {
        let id = this.deviceId;
        const deviceT = this.store.getDevicesById(id)();
        if (deviceT) {
          this.form.patchValue({
            name: deviceT.name,
            type: deviceT.type,
            powerWatts: deviceT.powerWatts,
            homeId: deviceT.homeId,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const deviceT: DeviceEntity = new DeviceEntity({
      id: this.deviceId ?? 0,
      name: this.form.value.name!,
      type: this.form.value.type!,
      powerWatts: this.form.value.powerWatts ?? 0,
      homeId: this.form.value.homeId ?? 0,
    });

    if (this.isEdit) {
      this.store.updateDevice(deviceT);
    } else {
      this.store.updateDevice(deviceT);
    }

    this.router.navigate(['managament/devices']).then();
  }
}
