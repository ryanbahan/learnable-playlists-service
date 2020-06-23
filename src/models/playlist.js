const playlist = (sequelize, DataTypes) => {
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
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    Playlist.findByUserId = async userId => {
        let playlist = await User.findOne({
            where: { user_id: userId },
        });

        return playlist;
    };

    return Playlist;
};

export default playlist;