import React from "react";
import LinkActions from "../actions/LinkActions";

class Link extends React.Component {
  removeLink(){
    console.log('in remove function', this.props.link)
    LinkActions.removeBookmark(this.props.link);
  }
  likeLink(){
    console.log('in like Function', this.props.link)
    LinkActions.likeLink(this.props.link);
    
  }
  render() {
    let {title, url, isSafe, likes} = this.props.link;
    var likeCount;
    if(likes){
      likeCount = <span>Likes: {likes.length}</span>
    }


    return (
      <div className="link">
        <a href={url} style={{color: (isSafe? "green" : "red")}}>{title}</a>
        <button  onClick={this.removeLink.bind(this)}>delete</button>
        <button onClick={this.likeLink.bind(this)}>Like!</button>
       
          {likeCount}

        
      </div>
    );
  }
}

export default Link;
