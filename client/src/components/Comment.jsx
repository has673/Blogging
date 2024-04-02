
// import React from 'react';
// import { MdDelete } from "react-icons/md";
// function Comment({ comment , mycomment , ondelete}) {
 

//   return (
//     <div className="border p-3 my-3 flex flex-row justify-evenly">
    
//       <p>{comment.Content}</p>
//       {mycomment && <MdDelete onClick={ondelete} />}
//     </div>
//   );
// }

// export default Comment;
import React from 'react';
import { MdDelete } from "react-icons/md";

function Comment({ comment, mycomment, ondelete }) {
  return (
    <div className="ml-3 my-4 flex max-w-screen-sm rounded-xl border border-gray-100 p-3 text-left text-gray-600 shadow-lg sm:p-4 ">
      <div className="w-full">
        <time className="text-xs" dateTime={comment.date}>{comment.createdAt}</time>
        <p className="text-sm">{comment.Content}</p>
        <div className="flex items-center justify-between mt-3">
          <div>{mycomment && <MdDelete className='cursor-pointer' onClick={ondelete} />}</div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
