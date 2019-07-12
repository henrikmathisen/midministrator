import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'integerToBoolean'
})
export class IntegerToBooleanPipe implements PipeTransform {

  transform(value: number): boolean {
    return value == 0 ? false : true;
  }
}
