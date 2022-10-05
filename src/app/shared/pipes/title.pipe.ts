import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSpaceToUnderscore'
})
export class ConvertSpaceToUnderscorePipe implements PipeTransform {
    transform(value: string) : string {        
        return value.replace(new RegExp(' ', 'gi'), '_');
    }
}