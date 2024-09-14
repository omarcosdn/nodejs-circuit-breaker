import {IController} from '@infra/rest/controllable.interface';

export interface HttpRoute {
  method: 'get' | 'post';
  path: string;
  controller: new (...args: any[]) => IController;
}
