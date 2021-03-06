import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/'
axios.defaults.headers.common['Authorization'] = 'OK'

const api = {

  fetchCategories: () => (
    axios.get('categories').then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  fetchPosts: () => (
    axios.get('posts').then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  fetchPostsByCategory: (category) => (
    axios.get(`${category}/posts`).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  fetchCommentsForAPost: (postId) => (
    axios.get(`posts/${postId}/comments`).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  voteForAPost: (postId, option) => (
    axios.post(`posts/${postId}`,
      {
        option
      }
    ).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  fetchPostDetails: (postId) => (
    axios.get(`posts/${postId}`).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  updatePost: ({ postId,  title, body }) => (
    axios.put(`posts/${postId}`, { title, body } ).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  deletePost: ( postId ) => (
    axios.delete(`posts/${postId}`).then(
      // For some reason this response comes with data:'', not too useful, so we can use only the status code.
      (response) => (response)
    ).then(({status, statusText}) => (
      {status, statusText, postId} )
    )
  ),

  fetchCommentDetails: (commentId) => (
    axios.get(`comments/${commentId}`).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  updateComment: ({ commentId,  timestamp, body }) => (
    axios.put(`comments/${commentId}`, { timestamp, body } ).then(
      (response) => {
        return response.data
      }
    ).then((data) => (data))
  ),

  deleteComment: ( commentId ) => (
    axios.delete(`comments/${commentId}`).then(
      (response) => (response)
    ).then((data) => ( data ))
  ),


  sendPost: (
    {

      id,
      timestamp,
      title,
      body,
      author,
      category

    }) => (

    axios.post('posts', {

      id,
      timestamp,
      title,
      body,
      author,
      category,

    }).then( (data) => (data))
  ),

  sendComment: (
    {

      id,
      timestamp,
      body,
      author,
      parentId

    }) => (

    axios.post('comments', {

      id,
      timestamp,
      body,
      author,
      parentId,

    }).then( (data) => (data))
  ),

  voteForAComment: (commentId, option) => (
    axios.post(`comments/${commentId}`,
      {
        option
      }
    ).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

}

export default api