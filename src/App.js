import React from 'react';
import './App.css';

import Header from "./components/Header/Header";
import MoviesList from "./components/MoviesList/MoviesList";
import Search from "./components/common/Search";
import Pages from "./components/common/Pages";
import * as axios from "axios";
import {API_key, genresAPI, popularMoviesAPI, searchMovieAPI} from "./assets/API/API";


class App extends React.Component {
    constructor(){
        super();
        this.fetchMoviePage = this.fetchMoviePage.bind(this);
        this.state = {
            isFetching : true,
            moviesData: [],
            genres: [],
            currentPage: 1
        }
    }

    getQueryMovies = async (query) => {
        const response = await axios
            .get( searchMovieAPI, {
                params: { query: query,
                    api_key: API_key,
                    language: 'ru'}
            })
        this.setState({ moviesData: response.data.results });
    }

    componentDidMount() {
        axios.get(popularMoviesAPI)
            .then(response => {
                this.setState({moviesData : response.data.results})
                }
            ).then(
        axios.get(genresAPI)
            .then(response => {
                    this.setState({genres : response.data.genres})
                }
            )).then( this.setState({isFetching: false}))
    }

    fetchMoviePage(pageNumber){
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_key}&language=ru&page=${pageNumber}`)
            .then(response => {
                    this.setState({moviesData : response.data.results,
                        currentPage: pageNumber})
                })}


    render() {
        return (
            <div className='app-wrapper'>
                <Header/>
                <div className='app-wrapper-page'>
                <Search  getQueryMovies={this.getQueryMovies}/>
                <MoviesList moviesData={this.state.moviesData}
                            isFetching={this.state.isFetching}
                            genres={this.state.genres}
                            fetchMoreMovies={this.fetchMoreMovies}/>
                 <Pages fetchMoviePage={this.fetchMoviePage} currentPage={this.state.currentPage}/>
                </div>
            </div>
        )}

}
export default App;
