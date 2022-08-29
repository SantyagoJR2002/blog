const postsControllers = require("./posts.controllers");

const getAll = (req, res) => {
  const data = postsControllers.getAllPosts();
  res.status(200).json({ items: data.length, posts: data });
};

const getById = (req, res) => {
  const id = req.params.id;
  const data = postsControllers.getPostsById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `El post no existe` });
  }
};

const register = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.content 
  ) { 
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        content: "string",
      header_image: "example.com/img/example.png"
      },
    });
  } else {
    const response = postsControllers.createPosts(data);
    return res
      .status(201)
      .json({
        message: `Post created succesfully with id: ${response.id}`,
        posts: response,
      });
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  const data = postsControllers.deletePosts(id);

  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.content ||
    !data.published
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        content: "string",
       header_image: "example.com/img/example.png",
        published: true
      },
    });
  } else {
    const response = postsControllers.editPosts(id, data)
    return res.status(200).json({
      message: 'User edited succesfully',
      posts: response
    })
  }
};

const editMyPosts = (req, res) => {
  const id = req.posts.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.title ||
    !data.content || 
    !data.header_image ||
    !data.published
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        title: "string",
        content: "string",
        header_image: "example.com/img/example.png",
        published: true
      },
    });
  } else {
    const response = postsControllers.editUser(id, data)
    return res.status(200).json({
      message: 'User edited succesfully',
      user: response
    })
  }
}

const getMyPosts = (req, res) => {
  const id = req.user.id;
  const data = postsControllers.getPostsById(id)
  res.status(200).json(data)
}

const removeMyPost = (req, res) => {
  const id = req.posts.id;
  const data = postsControllers.deletePosts(id)
  if(data){
    res.status(204).json()
  } else {
    res.status(400).json({message: 'invalid id'})
  }
}



module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  editMyPosts,
  getMyPosts,
  removeMyPost
};
