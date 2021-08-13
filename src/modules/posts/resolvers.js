import Post from '../../models/Post'
import User from '../../models/User'

export default {
  Post: {
    author: async (post) => await User.findById(post.author) 
  },
  Query: {
    posts: () => Post.find(),
    postId:(_, { id }) => Post.findById(id)
  },
  Mutation: {
    createPost: (_, {data }) => Post.create(data),
    updatePost: (_, {id, data}) => Post.findOneAndUpdate(id, data, {new: true}),
    deletePost: ({id}) => {
      const postDeleted = Post.findOneAndDelete(id);
      
      return !!postDeleted
    }
  }
}