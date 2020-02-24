import { IDinosaur } from 'app/shared/model/dinosaur.model';
import { Period } from 'app/shared/model/enumerations/period.model';
import { EpochRange } from 'app/shared/model/enumerations/epoch-range.model';

export interface IEpoch {
  id?: number;
  period?: Period;
  epoch?: EpochRange;
  fromMa?: number;
  toMa?: number;
  dinosaurs?: IDinosaur[];
}

export class Epoch implements IEpoch {
  constructor(
    public id?: number,
    public period?: Period,
    public epoch?: EpochRange,
    public fromMa?: number,
    public toMa?: number,
    public dinosaurs?: IDinosaur[]
  ) {}
}
