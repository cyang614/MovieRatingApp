import { useState } from "react"
import {Button} from "semantic-ui-react"
import { ColumnDisplay } from "./column-display";

import {fetchMovies,fetchTvShows} from "./query"
import { useQuery } from "@tanstack/react-query";

export enum DisplayType{
    Movies = "movies",
    TvShows = "tvshows",
}

export const Home = () => {
    const [displayType,setDisplayType] = useState<DisplayType>(
        DisplayType.Movies
    );

    const {data: movieData , isLoading:isLoadingMovies} = useQuery({
        queryKey:["movies"],
        queryFn:fetchMovies,
    });

    const {data: tvShowData, isLoading:isLoadingTvShows} = useQuery({
        queryKey:["tvshows"],
        queryFn:fetchTvShows,
    });

    return(
        <div style={{marginTop:50,height:"auto"}}>
            {" "}
            <Button.Group>
                    <Button 
                    color={displayType === DisplayType.Movies ? "blue" : undefined} 
                    onClick={()=> setDisplayType(DisplayType.Movies)}
                    >
                        電影
                    </Button>
                    <Button 
                    color={displayType === DisplayType.TvShows ? "blue" : undefined} 
                    onClick={()=> setDisplayType(DisplayType.TvShows)}
                    >
                        電視劇
                    </Button>
            </Button.Group>
            {isLoadingMovies || isLoadingTvShows ? (
                <div>讀取中...</div>
            ) : (
            <div style={{marginTop: 20}}>
                {displayType === DisplayType.Movies? (
                <ColumnDisplay data={movieData.results} displayType={DisplayType.Movies} /> 
                ) : (
                <ColumnDisplay data={tvShowData.results} displayType={DisplayType.TvShows} />
                )}
            </div>
            )}
        </div>
    )
}