<?php 

namespace App\Services;

use App\Movie;
use App\Comment;

class MovieService
{

    /**
     * Returns all the movies in the table in descending order
     * 
     * @param null
     * 
     * @return object of App\Movie
     */
    public function allMovies(): object
    {
        return Movie::orderBy('release_date')->get();
    }

    /**
     * Returns the full details of a particular movie
     * 
     * @param String $slug
     * 
     * @return object of App\Movie
     */
    public function movieDetails(String $slug): object
    {
        return Movie::where('slug', $slug)->first();
    }

   

    /**
     * Returns the Id of a movie from DB using the ID
     * 
     * @param String $slug
     * 
     * @return String id
     */
    public function movieId(String $slug): string
    {
        return Movie::select('id')->where('slug', $slug)->first()['id'];
    }
    
}