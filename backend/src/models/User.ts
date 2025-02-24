import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
  id?: string;  // Make id optional since it's auto-generated
  username: string;
  password: string;
}

export class User extends Model<UserAttributes> {
  declare id: string;
  declare username: string;
  declare password: string;

  validatePassword(password: string): boolean {
    return this.password === password;
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User'
});

export default User;
