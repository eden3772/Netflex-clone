
import React,{useState,useEffect} from 'react';
import "./Row.css";
import axios from '../Utils/Axios';
import movieTrailer from "movie-trailer";
import YouTube from 'react-youtube';

const Row = ({ title, fetchUrl, isLargeLayer }) => {
    const [movies, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    const base_url = "https://image.tmdb.org/t/p/original";


    useEffect(() => {
        (async () => {
            try {
                console.log(fetchUrl)
                const request = await axios.get(fetchUrl);
                 //console.log(request)
                setMovie(request.data.results);
            } catch (error) {
                // console.log("error", error);
            }
        })()
    }, [fetchUrl]);

    const handleClick = (movie) =>{
        if (trailerUrl) {
          setTrailerUrl("") ;
        }else {
          movieTrailer(movie?.title || movie?.name || movie?.original_name)
          .then((url) =>{
            const urlParams= new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          })
          .catch((error) => console.log(error));
          }
      };

    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    return (
        <div className="layer">
            <h1>{title}</h1>
            <div className="layer__posters">
                {movies?.map((movie, index) => (
                    <img
                        onClick={() => handleClick(movie)}
                        key={index} src={`${base_url}${isLargeLayer ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} className={`layer__poster ${isLargeLayer && "layer__posterLarge"}`}
                    />
                ))}
            </div>
            <div style={{padding: "40px"}}>
        {trailerUrl ? (<YouTube videoId={trailerUrl} opts={opts}/>): null} 
      </div>
        </div>
    )
}

export default Row