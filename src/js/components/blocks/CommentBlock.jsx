import React from 'react';

const CommentBlock = ({title, children}) => {
    return ( 
        <div className="container card bg-white p-3 mb-3">
            <div className="container">
                <h2 className="pt-3 mb-4" >{ title }</h2>
                { children }
            </div> 
        </div>
     );
}
 
export default CommentBlock;