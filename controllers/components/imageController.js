const Image = require('../../models/components/Image');
const Page = require('../../models/Page');

// Create an Image and update the Page document
exports.createImage = async (req, res) => {
  try {
    const image = new Image(req.body);
    await image.save();

    // Update the Page document with the new Image's ID and type
    await Page.findByIdAndUpdate(req.body.page, {
      $push: { content: { componentId: image._id, componentType: 'Image' } }
    });

    res.status(201).json({ message: 'Image created successfully', image });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an Image and update the Page document
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Remove the Image reference from the Page's content array
    await Page.findByIdAndUpdate(image.page, {
      $pull: { content: { componentId: image._id, componentType: 'Image' } }
    });

    await image.remove();

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve an Image
exports.getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an Image
exports.updateImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image updated successfully', image });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
