const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    // trip: String,
    County: String,
    Location: String,
    Population: String,

})

const Trip = mongoose.model('Trip', tripSchema)


readTrip = async(options = {}) => {
    if (Object.entries(options).length == 0)
        return Trip.find().lean();

     if (options.name)
        return Trip.findOne(options).lean();

    else
        return undefined;

}

createTrip = async(data) => {
    let tripDoc = new Trip(data);
    await tripDoc.save();
}

deleteTrip = async(name) => {
    const trip = await Trip.findOne({ name: name });
    await trip.remove();

}

updateTrip = async(data) => {
    var id = data._id;
    console.log(id);
    console.table(data)
    await Trip.findByIdAndUpdate({ _id: id }, {...data })
}

exports.readTrip = readTrip;
exports.createTrip = createTrip;
exports.deleteTrip = deleteTrip;
exports.updateTrip = updateTrip;