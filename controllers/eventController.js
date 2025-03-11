const Event = require('../models/event');

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Create new event
const createEvent = async (req, res) => {
  try {
    const { title, description, eventType, startDate, endDate, location, photos } = req.body;
    
    // Basic validation
    if (!title || !description || !eventType || !startDate || !endDate || !location) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields: title, description, eventType, startDate, endDate, location' 
      });
    }
    
    const newEvent = new Event({
      title,
      description,
      eventType,
      startDate,
      endDate,
      location,
      photos: photos || []
    });
    
    const savedEvent = await newEvent.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Event created successfully', 
      data: savedEvent 
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const { title, description, eventType, startDate, endDate, location, photos } = req.body;
    
    // Find event first to check if it exists
    const existingEvent = await Event.findById(req.params.id);
    if (!existingEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    // Build update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (eventType) updateData.eventType = eventType;
    if (startDate) updateData.startDate = startDate;
    if (endDate) updateData.endDate = endDate;
    if (location) updateData.location = location;
    if (photos) updateData.photos = photos;
    
    // Update with new values
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id, 
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({ 
      success: true, 
      message: 'Event updated successfully', 
      data: updatedEvent 
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ 
      success: true, 
      message: 'Event deleted successfully', 
      data: {} 
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};