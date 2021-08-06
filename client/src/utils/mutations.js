import { gql } from '@apollo/client'



export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
           token
           user {
               _id
               username
           }
        }
    }
`


export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`


export const SAVE_BOOK = gql`
    mutation saveBook($book: SavedBook!) {
        saveBook(book: $book) {
            username
            email
            bookCount
            savedBooks {
                authors
                description
                title
                bookId
                image
                link
            }
        }
    }
`


export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            username
            email
            bookCount
            savedBooks {
                authors
                description
                title
                bookId
                image
                link
            }
        }
    }
`