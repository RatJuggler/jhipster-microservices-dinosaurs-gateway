import { Moment } from 'moment';
import { Heading } from 'app/shared/model/enumerations/heading.model';

export interface ISighting {
  id?: number;
  dinosaur?: number;
  byUser?: number;
  whenDt?: Moment;
  lat?: number;
  lng?: number;
  number?: number;
  heading?: Heading;
  notes?: string;
}

export class Sighting implements ISighting {
  constructor(
    public id?: number,
    public dinosaur?: number,
    public byUser?: number,
    public whenDt?: Moment,
    public lat?: number,
    public lng?: number,
    public number?: number,
    public heading?: Heading,
    public notes?: string
  ) {}
}
