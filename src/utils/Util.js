
export function getName(movie) {
    let name = ''
    if(movie.nameRu)
        name = movie.nameRu;
    else
        name = movie.nameEn;
    return name
}
