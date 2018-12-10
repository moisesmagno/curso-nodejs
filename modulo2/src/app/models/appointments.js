module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        data: DataTypes.DATE
    });

    Appointment.associate = models => {
        Appointment.belongsTo(model.User, {foreignKey: 'user_id'});
        Appointment.belongsTo(model.User, {foreignKey: 'provider_id'});
    }

    return Appointment;

}