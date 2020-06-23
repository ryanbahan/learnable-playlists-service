const playlistItem = (sequelize, DataTypes) => {
    const PlaylistItem = sequelize.define('playlist_items', {
        playlist_id: {
            unique: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            autoIncrement: true,
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING(150),
        },
        category: {
            allowNull: false,
            type: DataTypes.STRING(150),
        },
        url: {
            allowNull: false,
            type: DataTypes.STRING(20),
        },
        is_complete: {
            type: DataTypes.BOOLEAN,
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

    return PlaylistItem;
};

export default playlistItem;