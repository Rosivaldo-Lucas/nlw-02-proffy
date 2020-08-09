import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from "../database/connection";

interface IRequest {
  week_day?: number;
  subject?: string;
  time?: string;
}

interface IResponse {
  id: number;
  subject: string;
  cost: number;
  user_id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

class ListClassService {
  public async execute(filters: IRequest): Promise<IResponse[]> {

    if (!filters.week_day || !filters.subject || !filters.time) {
      throw new Error('Missing filters to search classes.');
    }

    const timeInMinutes = convertHourToMinutes(filters.time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(filters.week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', filters.subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    
    console.log(classes);

    return classes;
  }
}

export default ListClassService;
