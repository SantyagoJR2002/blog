const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const PostDB = [{
	"id": "uuid",
	"title": "string",
	"content":"string",
	"header_image": "url_to_img",
	"user_id": "uuid",//Aqui hara referencia al usuario de tu userDB
	"published": true
}];

const getAllPosts = () => {
  return PostDB;
  //? select * from users;
};

const getPostsById = (id) => {
  const data = PostDB.filter((item) => item.id === id);

  return data.length ? data[0] : false
  //? select * from users where id = ${id};
};

const createPosts = (data) => {
  const newPost = {
    id: uuid.v4(), //obligatorio y unico
    user_id:uuid.v4(),
    title: data.title, //obligatorio
    content: data.content, //obligatorio
    header_image: data.header_image ? data.header_image : "",
    published: true, //obligatorio y por defecto true
    
  };
  PostDB.push(newPost);
  return newPost;
};

const editPosts = (id, data, userRol) => {
  const index = PostsDB.findIndex((post) => post.id === id);
  if (index !== -1) {
    userDB[index] = {
      id: id,
      user_id:data.user_id,
      title: data.title, //obligatorio
      content: data.content, //obligatorio
      header_image: data.header_image,
      published: false,

    };
    return PostDB[index];
  } else {
    return createUser(data);
  }
};

const deletePosts = (id) => {
  const index = PostDB.findIndex(post => post.id === id)
  if (index !== -1) {
    PostDB.splice(index, 1)
    return true
  } else {
    return false
  } 
}

const getPostByUser = (user_id, id) => {
  const data = PostDB.filter((item) => item.user_id === user_id && item.id === id); 
  return data.length ? data[0] : false
  //? select * from users where email = ${email};
}

const getAllPostsByUser = (user_id) => {
    const data = PostDB.filter((item) => item.user_id === user_id); 
    return data.length ? data[0] : false
}


module.exports = {
  createPosts,
  getAllPosts,
  getPostsById,
  editPosts,
  deletePosts,
  getPostByUser,
  getAllPostsByUser
}