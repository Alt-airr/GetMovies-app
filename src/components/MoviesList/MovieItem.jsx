import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as axios from "axios";
import Genre from "./MovieGenre";
import Modal from "../common/Modal";

const useStyles = makeStyles({
  card: {
    maxWidth: 275,
    width: '100%',
    margin: 10,
      height: 'auto',
  },
  media: {
    height: 'auto',
    maxWidth: 92
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    minHeight: '450px'
  },
  info: {
    minHeight: 150,
    overflow: 'hidden'
  },
  title: {
    minHeight: 65,
    overflow: 'hidden',
    lineHeight : '20px',
    margin: '2px'
  },
  content: {
    minHeight: 175,
    overflow: 'hidden',
  },
  genres: {
    margin: 0
  },
    actions: {
      bottom: 0
    }
});


export default function MovieItem(props) {
  const classes = useStyles();
  const genres = props.genres;
  const queryGenres = props.movie.genre_ids;

  const movieGenres = genres.filter(i => queryGenres.indexOf( i.id) != -1)
  const genresBlock = movieGenres.map(g => <Genre genre={g.name}/>)

  let [info, setInfo] = useState({});
  let [recommendations, setRecommendations] = useState({});


  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=fce59459632152cd2c59147305fa7210&language=ru`)
        .then(response => {
          setInfo(response.data);
        });
  }, []);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${props.movie.id}/recommendations?api_key=fce59459632152cd2c59147305fa7210&language=en-US&page=1`)
        .then(response => {
          setRecommendations(response.data.results.map((m, index) => <MovieItem movie={m} genres={props.genres} key={index}/>));

        });
  }, []);


  return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.img}
              component="img"
              image={props.movie.poster_path ?  `http://image.tmdb.org/t/p/original/${props.movie.poster_path}` : 'https://i3.wp.com/www.digitbin.com/content/uploads/Sites-to-Watch-Movies-Online-600x400.jpg'}
          />
          <CardContent className={classes.content}>
            <Typography className={classes.info} gutterBottom variant="h5" component="h2">
              <p className={classes.title}>
                 {props.movie.title}
              </p>
              <p className={classes.genres}>
                 {genresBlock || null}
              </p>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
            <p className={classes.actions}>
                <Modal info={info} recommendations={recommendations} genres={genres}/>
            </p>
        </CardActions>
      </Card>
  );
}