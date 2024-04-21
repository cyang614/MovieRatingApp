export const fetchMovies = async () => {
    const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=zh-TW&page=1",
        {
            headers:{
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmU4ZWFkYmFkYWE1YjcxZDE2NGZmMDU5ZTM1NTJiMCIsInN1YiI6IjY2MjRlNDQ5MDdmYWEyMDE0OTk4NTI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3cXbphAPPgcbaokMAF0P3i5MyLDDAgOQGutftYgLmjE"
            }
        }
    );
    return res.json();
}

export const fetchTvShows = async () => {
    const res = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=zh-TW&page=1",
        {
            headers:{
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmU4ZWFkYmFkYWE1YjcxZDE2NGZmMDU5ZTM1NTJiMCIsInN1YiI6IjY2MjRlNDQ5MDdmYWEyMDE0OTk4NTI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3cXbphAPPgcbaokMAF0P3i5MyLDDAgOQGutftYgLmjE"
            }
        }
    );
    return res.json();
}