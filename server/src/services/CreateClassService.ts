import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ISchedule {
  week_day: number;
  from: string;
  to: string;
}

interface IRequest {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
  schedule: ISchedule[];
}

class CreateClassService {
  public async execute({ name, avatar, whatsapp, bio, subject, cost, schedule }: IRequest): Promise<void> {
    const trx = await db.transaction();
    
    try {
      const user_id = await trx('users').insert({ name, avatar, whatsapp, bio });

      const class_id = await trx('classes').insert({ subject, cost, user_id: user_id[0] });
  
      const classSchedule = schedule.map((scheduleItem: ISchedule) => {
        return {
          class_id: class_id[0],
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        }
      });
  
      await trx('class_schedule').insert(classSchedule);
      
      await trx.commit();

    } catch (err) {
      console.log(err);
  
      await trx.rollback();
      
      throw new Error('Unexpected error while create new class');
    }
  }
}

export default CreateClassService;
