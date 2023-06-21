import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
  transform(value: [], search: string, filter: string): any {
    console.log('pipes filter', filter, search);
    if (search) {
      const resp = value?.filter((m: any) =>
        m?.name?.toLowerCase()?.includes(search)
      );
      return resp?.length === 0 ? 'No record found' : resp;
    } else if (filter) {
      console.log(1);

      if (filter !== 'Latest' && filter != 'Trending') {
        console.log(2);
        const resp = value?.filter(
          (m: any) =>
            m?.subCategory?.includes(filter) ||
            m?.category?.includes(filter) ||
            m?.genre?.includes(filter) ||
            m?.language?.includes(filter)
        );
        console.log('response', resp);
        return resp?.length === 0 ? 'No record found' : resp;
      }
      return value;
    } else {
      return value;
    }
  }
}
