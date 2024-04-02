import React from 'react';

function MakeComment({ content, handleSubmit, setContent }) {

    return (
        <div>
            <h2 className='m-2 '>Make Comment</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                    <textarea className='border-4'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your comment here"
                        rows="4"
                        cols="50"
                    ></textarea>
                </div>
                <button className='p-3 bg-green-500 text-white rounded-xl cursor-pointer hover:bg-green-600' type="submit" style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: '10px' }}>Post</button>
            </form>
        </div>
    );
}

export default MakeComment;
