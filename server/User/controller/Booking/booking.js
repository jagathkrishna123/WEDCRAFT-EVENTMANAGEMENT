import Booking from "../../../models/Booking/bookingSchema.js";
import mongoose from "mongoose";
import Payment from "../../../models/Payment/paymentSchema.js";
import Provider from "../../../models/provider/providerSchema.js";

// ---------- Create Booking + Payment ----------
export const createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      providerId,
      selectedPackage,
      bookingData,
      totalPrice,
      category,
      auditoriumPricing,
      paymentMethod,
      cardDetails,
      upiId,
    } = req.body;

    console.log(req.body, "body");



    // ✅ Check login
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    // 🔥 Fetch provider from Provider collection
    const providerData = await Provider.findById(providerId);
    console.log(providerData,"provider data");
    

    if (!providerData) {
      return res.status(404).json({ message: "Provider not found" });
    }

    const providerName = providerData.name; // or businessName if your schema uses that

    // ✅ Extract bookingData fields
    const {
      name,
      email,
      phone,
      eventDate,
      eventTime,
      guests,
      hours,
      specialRequests,
    } = bookingData || {};

    // ✅ Validation
    if (
      !name ||
      !email ||
      !phone ||
      !eventDate ||
      !eventTime ||
      !category ||
      !serviceId ||
      !totalPrice ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Set categoryModel automatically
    let categoryModel;
    if (category === "auditorium") categoryModel = "Auditorium";
    if (category === "catering") categoryModel = "Catering";
    if (category === "photography") categoryModel = "Photography";
    if (category === "stage-decoration") categoryModel = "Decoration";

    // ✅ Validate Payment
    if (paymentMethod === "card") {
      if (
        !cardDetails ||
        !cardDetails.number ||
        !cardDetails.expiry ||
        !cardDetails.cvv ||
        !cardDetails.name
      ) {
        return res.status(400).json({ message: "Incomplete card details" });
      }
    }

    if (paymentMethod === "upi" && !upiId) {
      return res.status(400).json({ message: "UPI ID is required" });
    }

    // ✅ Create Booking
    const booking = new Booking({
      customer: req.user.id,
      customerName: name,
      email,
      phone,
      eventDate,
      eventTime,
      guests: guests || 50,
      hours: hours || 4,
      specialRequests: specialRequests || "",
      category,
      provider: providerId,
      providerName,
      service: serviceId,
      categoryModel,
      selectedPackage,
      auditoriumPricing,
      totalPrice,
      status: "pending",
    });

    const savedBooking = await booking.save();

    // ✅ Create Payment
    const payment = new Payment({
      booking: savedBooking._id,
      user: req.user.id,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : undefined,
      upiId: paymentMethod === "upi" ? upiId : undefined,
      amount: totalPrice,
      status: "completed", // change later for real gateway
    });

    const savedPayment = await payment.save();

    // ✅ Confirm booking after payment
    savedBooking.status = "confirmed";
    await savedBooking.save();

    return res.status(201).json({
      message: "Booking and Payment successful",
      booking: savedBooking,
      payment: savedPayment,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// ---------- Get all bookings ----------
export const getAllBookings = async (req, res) => {
  console.log("Fetching data");

  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 }); // -1 = descending

    res.status(200).json({ data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------- Get booking by ID ----------
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("service");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ data: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------- Update booking status ----------
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    const updatedBooking = await booking.save();

    res
      .status(200)
      .json({ message: "Booking status updated", data: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------- Delete booking ----------
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
