import { Moment } from 'moment';
import { IPlayer } from 'app/shared/model/player.model';
import { ILevel } from 'app/shared/model/level.model';

export interface IHighScore {
  id?: number;
  score?: number;
  achievedDt?: Moment;
  player?: IPlayer;
  level?: ILevel;
}

export class HighScore implements IHighScore {
  constructor(public id?: number, public score?: number, public achievedDt?: Moment, public player?: IPlayer, public level?: ILevel) {}
}
