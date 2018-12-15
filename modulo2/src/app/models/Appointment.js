module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        date: DataTypes.DATE
    });

    Appointment.associate = model => {
        Appointment.belongsTo(model.User, {as: 'user', foreignKey: 'user_id'});
        Appointment.belongsTo(model.User, {as: 'provider', foreignKey: 'provider_id'});
    }


    return Appointment;

}
