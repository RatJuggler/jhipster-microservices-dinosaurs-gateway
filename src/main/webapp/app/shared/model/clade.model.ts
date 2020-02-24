import { IDinosaur } from 'app/shared/model/dinosaur.model';

export interface IClade {
  id?: number;
  name?: string;
  pronunciation?: string;
  meaning?: string;
  description?: string;
  dinosaurs?: IDinosaur[];
}

export class Clade implements IClade {
  constructor(
    public id?: number,
    public name?: string,
    public pronunciation?: string,
    public meaning?: string,
    public description?: string,
    public dinosaurs?: IDinosaur[]
  ) {}
}
