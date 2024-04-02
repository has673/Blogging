import React from 'react';

function MakeComment({ content, handleSubmit, setContent }) {
  return (
    <div className="">
      <div className="ml-10 max-w-screen-sm px-4">


        <div className="-ml-20 flex p-4 text-left text-gray-700">
       
          <div className="w-full space-y-3 text-gray-700">
            <div className="">
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your comment here" cols="30" rows="6" className="h-40 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"></textarea>
            </div>
            <div className="float-right">
              <button onClick={handleSubmit} className=" cursor-pointer p-3 bg-green-500 text-white rounded-xl  hover:bg-green-600">Post Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeComment;
