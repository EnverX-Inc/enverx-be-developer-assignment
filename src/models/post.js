import prisma from "../db.js";

// Get all
export const getposts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      posts: true,
    },
  });

  res.json({ data: user.posts });
};

// Get one
export const getOnepost = async (req, res) => {
  const id = req.params.id;

  const post = await prisma.post.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: post });
};

// Create one
export const createpost = async (req, res) => {
  const post = await prisma.post.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: post });
};

// Update one
export const updatepost = async (req, res) => {
  const updated = await prisma.post.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

// Delete one
export const deletepost = async (req, res) => {
  const deleted = await prisma.post.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: deleted });
};
