import {get, post} from "jquery";
import ServerActions from './actions/ServerActions';

let API = {
  saveBookmark(newBookmark) {
    console.log(newBookmark)
    post("/api/links", newBookmark)
    .done(data =>{ 
          ServerActions.receiveOneLink(data)
    })
  },
  fetchAllBookmarks() {
    console.log('2. in fetchAllBookmarks()')
    get("/api/links").done(data => ServerActions.receiveLinks(data.links) );
  },
  deleteBookmark(link){
    console.log('2. in deleteBookmark()')
    post('/api/links/delete', link).done(data => ServerActions.receiveLinks(data));
  },
  likeBookmark(link){
    console.log('2. in API.likeBookmark', link)
    post('/api/links/like', link).done(data => ServerActions.receiveLinks(data));
  }
};

export default API;
