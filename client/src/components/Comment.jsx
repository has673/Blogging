
import React from 'react';
import { MdDelete } from "react-icons/md";
function Comment({ comment , mycomment , ondelete}) {
 

  return (
    <div className="border p-3 my-3 flex flex-row justify-evenly">
    
      <p>{comment.Content}</p>
      {mycomment && <MdDelete onClick={ondelete} />}
    </div>
  );
}

export default Comment;
