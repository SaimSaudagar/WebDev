const Carousel = require('../../models/components/Carousel');

exports.createCarousel = async (req, res) => {
  try {
    const carousel = new Carousel(req.body);
    await carousel.save();
    res.status(201).json(carousel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCarousels = async (req, res) => {
  try {
    const carousels = await Carousel.find();
    res.status(200).json(carousels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateCarousel = async (req, res) => {
  const { id } = req.params;
  const { title, images, isActive } = req.body;

  try {
    const carousel = await Carousel.findByIdAndUpdate(id, { title, images, isActive }, { new: true });
    if (!carousel) {
      return res.status(404).json({ message: "Carousel not found" });
    }
    res.status(200).json(carousel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCarousel = async (req, res) => {
  const { id } = req.params;
  try {
    const carousel = await Carousel.findByIdAndDelete(id);
    if (!carousel) {
      return res.status(404).json({ message: "Carousel not found" });
    }
    res.status(200).json({ message: "Carousel deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
