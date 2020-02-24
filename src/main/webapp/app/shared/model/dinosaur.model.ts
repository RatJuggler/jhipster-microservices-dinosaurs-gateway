import { Moment } from 'moment';
import { Diet } from 'app/shared/model/enumerations/diet.model';

export interface IDinosaur {
  id?: number;
  name?: string;
  pronunciation?: string;
  meaning?: string;
  weight?: number;
  length?: number;
  height?: number;
  diet?: Diet;
  createdBy?: number;
  createdDt?: Moment;
  modifiedBy?: number;
  modifiedDt?: Moment;
  epochItLivedId?: number;
  cladeName?: string;
  cladeId?: number;
}

export class Dinosaur implements IDinosaur {
  constructor(
    public id?: number,
    public name?: string,
    public pronunciation?: string,
    public meaning?: string,
    public weight?: number,
    public length?: number,
    public height?: number,
    public diet?: Diet,
    public createdBy?: number,
    public createdDt?: Moment,
    public modifiedBy?: number,
    public modifiedDt?: Moment,
    public epochItLivedId?: number,
    public cladeName?: string,
    public cladeId?: number
  ) {}
}
