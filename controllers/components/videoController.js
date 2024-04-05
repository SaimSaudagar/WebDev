const Video = require('../models/Video');

exports.createVideo = async (req, res) => {
  const { title, url, description } = req.body;
  try {
    const newVideo = new Video({ title, url, description });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  try {
    const video = await Video.findByIdAndUpdate(id, { title, url, description }, { new: true });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
