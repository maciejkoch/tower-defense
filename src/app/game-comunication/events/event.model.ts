import { ClickEvent } from './click.event';
import { CursorEvent } from './cursor.event';
import { UpdateEvent } from './update.event';

export type BoardEvent = ClickEvent | UpdateEvent | CursorEvent;
