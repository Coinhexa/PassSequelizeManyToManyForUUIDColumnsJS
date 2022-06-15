import { DataTypes } from 'sequelize';

const roleModel = (sequelize) => {
  const Role = sequelize.define(
    'Role',
    {
      roleId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 255],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Role.associate = (models) => {
    Role.belongsToMany(models.User, { as: 'users', through: 'RoleUser' });
  };
};

export { roleModel };
