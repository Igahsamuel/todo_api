import { DataTypes, Model } from 'sequelize';
import db from '../database/database.config';
interface TodoAttributes {
  id: string;
  title: string;
  completed: boolean;
  description: string;
}

export class Todo extends Model<TodoAttributes> {}

Todo.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'todo',
  }
);

export default Todo;
