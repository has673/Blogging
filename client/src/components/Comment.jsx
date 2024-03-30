import React from 'react';

function Comment({ comment }) {
  return (
    <div className="border p-3 my-3">
      <h3 className="font-semibold">{comment.name}</h3>
      <p>{comment.Content}</p>
    </div>
  );
}

export default Comment;
