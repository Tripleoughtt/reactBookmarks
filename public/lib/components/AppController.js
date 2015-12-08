import React from "react";
import List from "./List";
import Form from "./Form";

import LinkActions from "../actions/LinkActions"
import LinkStore from "../stores/LinkStore";

let _getAppState = () => {
  return { bookmarks: LinkStore.getAll() }
}

// Controller-View Component
class AppController extends React.Component {
  constructor(props) {
    super(props);
    this.state = _getAppState();
    console.log(this.state)
    console.log(this._onChange)
    this._onChange = this._onChange.bind(this);
  }
  _onChange(){
    console.log("5. The Store has emmited a change event")
    this.setState(_getAppState());
  }
  componentDidMount() {
    LinkActions.getAllBookmarks();

    LinkStore.startListening(this._onChange);
  }
  componentWillDismount(){
    LinkStore.stopListening(this._onChange);
  }
  render() {
    return (
      <div className="app">
        <h2>Bookmarks!</h2>
        <List bookmarks={this.state.bookmarks} />
        <Form addBookmark={this._onChange} />
      </div>
    );
  }
}

export default AppController;
