import { writeFileSync, existsSync, readFileSync } from "fs";
import { join } from "path";

const dataFolderPath = join(process.cwd(), "data");
const filePath = join(dataFolderPath, "bookingData.json");

export const saveBooking = (req, res) => {
  try {
    let number_of_people;
    const bookingData = req.body;
    const puta = Object.entries(bookingData);
    const dashboardUrl = bookingData.booking.dashboard_url;
    const customers = bookingData.booking;
    const activity =
      customers.customers[0].customer_type_rate.customer_type.singular.split(
        " "
      )[0];

    const values = bookingData.booking.custom_field_values.map(
      (customerValue) => ({ [customerValue.name]: customerValue.display_value })
    );
    // Check if the file exists
    if (existsSync(filePath)) {
      // Read existing data from JSON file
      const existingData = JSON.parse(readFileSync(filePath, "utf-8"));
      // Merge existing data with new booking data
      const updatedData = [
        ...existingData,
        {
          number_of_people: customers.customers.length,
          activity,
          bookingURL: dashboardUrl,
          values,
        },
      ];
      // Write the updated data to the JSON file
      writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    } else {
      // If the file doesn't exist, create a new file with the booking data
      writeFileSync(filePath, JSON.stringify([bookingData], null, 2));
    }
    res.status(200).json("Booking data saved successfully!");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const health = async (req, res) => {
  res.status(200).json("The endpoint is healthy");
};
