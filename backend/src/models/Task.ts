import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';

interface TaskAttributes {
  id: string;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: string;
}

export class Task extends Model<TaskAttributes> {
  declare id: string;
  declare title: string;
  declare description?: string;
  declare isComplete: boolean;
  declare userId: string;
}

Task.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Task'
});

export default Task;
