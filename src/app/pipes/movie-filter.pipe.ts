import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../Service/data.service';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
  trendingCriteria: any;
  latestCriteria: any;
  constructor(private dataService: DataService) {
    this.trendingCriteria = dataService.trendingCriteria;
    this.latestCriteria = dataService.latestCriteria;
  }
  transform(value: [], search: string, filter: string): any {
    if (search) {
      const resp = value?.filter((m: any) =>
        m?.name?.toLowerCase()?.includes(search)
      );
      return resp;
    } else if (filter) {
      if (filter === 'Trending') {
        const resp = value?.filter((m: any) => {
          return m?.rating >= this.trendingCriteria;
        });
        return resp;
      } else if (filter === 'Latest') {
        const resp = value?.filter((m: any, index: any) => {
          return index < this.latestCriteria;
        });
        return resp;
      }
      const resp = value?.filter(
        (m: any) =>
          m?.subCategory?.includes(filter) ||
          m?.category?.includes(filter) ||
          m?.genre?.includes(filter) ||
          m?.language?.includes(filter)
      );
      return resp;
    } else {
      return value;
    }
  }
}
