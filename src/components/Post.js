import React, { Component } from 'react';
import {connect} from 'react-redux'
import {asyncVoteForAPost, asyncGetPostDetails, asyncGetCommentsForAPost } from '../actions/AsychActions'

class Post extends Component {
  componentWillMount(){
    const  {getPostDetails, getCommentsFor, postId} = this.props;
    getPostDetails();
    getCommentsFor(postId)
  }
  render(){
    const  {post, upvotePost, downvotePost } = this.props;
    const headers =  [ 'Comments', 'Score', 'Vote', 'Date' ];
    if(post === undefined) return null;
    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p> by {post.author} </p>

        <div className="panel panel-default">
          <div className="panel-heading">Post Info</div>
            <table className="table">
            <thead>
            <tr>
            {
              headers.map((header)=> (<th key={header}>{header}</th>))
            }
          </tr>
          </thead>
            <tbody>
            <tr>
              <td>
                {post.comments ? post.comments.length : '...' }
              </td>
              <td>
                {post.voteScore}
              </td>
              <td>
                <button style={{display: 'inline-block'}} onClick={upvotePost}>
                  <span className='glyphicon glyphicon-chevron-up' alt='upvote'></span>
                </button>
                <button onClick={downvotePost}>
                  <span className='glyphicon glyphicon-chevron-down' alt='downvote'></span>
                </button>
              </td>
              <td>
                {new Date(post.timestamp).toDateString()}
              </td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>
      )
  }
}

function mapStateToProps(state, ownProps){
  const {postId} = ownProps;
  return {
    post: state.posts[postId]
  }
}

function mapDispatchToProps(dispatch, OwnProps){
  const {  postId }      = OwnProps;
  return {
    upvotePost:asyncVoteForAPost(dispatch)(postId, 'upVote'),
    downvotePost:asyncVoteForAPost(dispatch)(postId, 'downVote'),
    getPostDetails: asyncGetPostDetails(dispatch)(postId),
    getCommentsFor:  asyncGetCommentsForAPost(dispatch),

  }
}
const PostConnected =  connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default PostConnected