import { Moment } from 'moment';

export interface ILevel {
  id?: number;
  name?: string;
  order?: number;
  definition?: any;
  createdDt?: Moment;
}

export class Level implements ILevel {
  constructor(public id?: number, public name?: string, public order?: number, public definition?: any, public createdDt?: Moment) {}
}
