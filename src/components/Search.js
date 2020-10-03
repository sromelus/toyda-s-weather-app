import React, { useState } from 'react';

const Search = (props) => {

    const [searchTag, setSearchTag] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      if(searchTag){
        props.history.push(`/${searchTag}`);
      }
    }

    return (
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input type="search" name="search" placeholder="city, state" onChange={(e) => setSearchTag(e.target.value)}/>
          <button>Search</button>
        </form>
      </div>
    );
}

export default Search;
