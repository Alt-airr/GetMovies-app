import React from 'react';
import TextField from "@material-ui/core/TextField";

const Search = (props) => {
    const handleChange = event => {
        props.getQueryMovies(event.target.value);
    };

    return (
        <div>
            <form noValidate autoComplete="on">
                <TextField onChange={handleChange}
                           id="outlined-basic" fullWidth label="Search your movie" variant="outlined"/>
            </form>
        </div>
    )
}

export default Search;