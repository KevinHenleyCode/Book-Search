const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const { Book, User } = require('../models')



const resolvers = {
   
    Mutation: {

        login: async (parent, { email, password }) => {
            
            const user = await User.findOne({ email })
            if (!user) {
                throw new AuthenticationError('There is no user that contains that email')
            }

            const checkPassword = await user.isCorrectPassword(password)
            if (!checkPassword) {
                throw new AuthenticationError('The username or password you entered are not correct')
            }

            const token = signToken(user)
            return { token, user }
        },

        addUser: async (parent, { username, email, password }) => {

            const user = await User.create({ username, email, password })
            const token = signToken(user)
            return { token, user }
        },

        saveBook: async (parent, { book }, context) => {
            
            if (context.user) {
                const userUpdated = await User.findOneAndUpdate(
                    { _id: context.user.id },
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                )
                return userUpdated

            }
            throw new AuthenticationError(`Hey! Go login if you want to save a book.`)
        },

        removeBook: async (parent, { bookId }, context) => {
            
            if (context.user) {
                const userUpdated = await User.findOneAndRemove(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )
                return userUpdated

            }
            throw new AuthenticationError('Only users with an account can remove books')
        }
    
    },

    Query: {
        
        me: async (parent, args, context) => {
         if(context.user){ return User.findOne({ _id: context.user._id }).populate(savedBooks) }
         throw new AuthenticationError('There is no user that contains that id')   
        }
    }

}

module.exports = resolvers