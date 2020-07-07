const playlists = (sequelize, DataTypes) => {
    const Playlist = sequelize.define('playlists', {
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
        due_date: {
            allowNull: false,
            type: DataTypes.STRING(20),
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

    return Playlist;
};

export default playlists;