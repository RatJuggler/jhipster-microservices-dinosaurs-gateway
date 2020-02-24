import { Moment } from 'moment';

export interface IPlayer {
  id?: number;
  email?: string;
  name?: string;
  avatarContentType?: string;
  avatar?: any;
  createdDt?: Moment;
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public email?: string,
    public name?: string,
    public avatarContentType?: string,
    public avatar?: any,
    public createdDt?: Moment
  ) {}
}
