const { isValidObjectId } = require('mongoose');
const Image = require('../../models/components/Image');
const Page = require('../../models/Page');


exports.createImage = async (req, res) => {
  try {
    const { url, altText, size, alignment, page } = req.body;

    if(!isValidObjectId(page)) {
      return res.status(400).json({ message: 'Invalid page ID' });
    }

    const image = new Image({ url, altText, size, alignment, page });
    await image.save();

    await Page.findByIdAndUpdate(req.body.page, {
      $push: { content: { componentId: image._id, componentType: 'Image' } }
    });

    res.status(201).json({ message: 'Image created successfully', image });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    await Page.findByIdAndUpdate(image.page, {
      $pull: { content: { componentId: image._id, componentType: 'Image' } }
    });

    await image.remove();

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

exports.updateImage = async (req, res) => {
  try {
    const {url, altText, size, alignment} = req.body;

    const image = await Image.findByIdAndUpdate(req.params.id, {url, altText, size, alignment}, { new: true });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image updated successfully', image });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
