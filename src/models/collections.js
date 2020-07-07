const collections = (sequelize, DataTypes) => {
    const Collection = sequelize.define('collections', {
        user_id: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING(150),
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING(150),
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return Collection;
};

export default collections;