import { UntypedFormGroup } from '@angular/forms';
// Custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
            return;
        } else {
            matchingControl.setErrors(null);  // no error
        }
    };
}
