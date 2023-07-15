import Media from "../models/Media.js";

export const getAll = async (req, res) => {
  try {
    const media = await Media.find();

    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const likes = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  console.log(id);
  console.log(value);
};

export const create = async (req, res) => {
  const { name } = req.body;
  let filePath;

  if (req.files) {
    if (req.files.videos) {
      const video = req.files.videos[0];
      filePath = "/" + video.path;
    } else if (req.files.images) {
      const image = req.files.images[0];
      filePath = "/" + image.path;
    }
  }

  try {
    const createdMedia = await Media.create({
      name,
      videos: filePath,
    });

    res.json({ message: "Media created successfully", createdMedia });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};







export const likeMedia = async (req, res) => {
  try {
    const { mediaId } = req.params;
    
    // Find the media item by its ID
    const media = await Media.findById(mediaId);

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Increment the likes count for the media item
    media.likes += 1;

    // Save the updated media item
    await media.save();

    res.status(200).json({ message: 'Media liked successfully', likes: media.likes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to like media', error: error.message });
  }
};
