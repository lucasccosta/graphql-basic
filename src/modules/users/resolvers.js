import User from '../../models/User'
import { USER_ADDED } from './channels'

export default {
  User: {
    fullName:(user) => `${user.firstName} ${user.lastName}`
  },
  Query: {
    users: () => User.find(),
    userId:(_, { id }) => User.findById(id)
  },
  Mutation: {
    createUser: async (_, {data}, {pubsub}) => {
      const {email} = data

      const emailAlreadyExists = await User.findOne({ email})

      if(emailAlreadyExists){
        throw new Error('Email already exsists')
      }
      
      const user = User.create(data)

      pubsub.publish(USER_ADDED, {
        userAdded: user
      })

      return user
    },
    updateUser: (_, {id, data}) => User.findOneAndUpdate(id, data, {new: true}),
    deleteUser: async (_, {id}) => {
    const userDeleted = await User.findOneAndDelete(id);
      
      return !!userDeleted
    }
  },
  Subscription: {
    userAdded: {
      //          obj  args  context
      subscribe: (obj, args, {pubsub}) => pubsub.asyncIterator(USER_ADDED)
    }
  }

}