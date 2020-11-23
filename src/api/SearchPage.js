import movies from './movies';

export const contains = ({ name, genres}, query) => {
    if(name.contains(query) || genres.contains(query)){
        return true;
    }
    return false;
};

export const getMovies = (limit = 20, query = "") => {
    return new Promise((resolve, reject) => {
        if(query.length === 0){
            resolve(_.take(movies, limit));
        }else{
            const formattedQuery = query.toLowerCase();
            const results = _.filter(movies,movie => {
                return contains(movie, formattedQuery);
            });
            resolve(_.take(results, limit));
        }
    });
};

export default getMovies;
