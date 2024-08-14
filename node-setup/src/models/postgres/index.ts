import  user  from './user.model';
import { db } from '../../../config/postgresDB.config';

const User = user(db);

db.sync({ force: false })
  .then(() => {
    console.log('Tables Created');
  });

export {
  User,
};
