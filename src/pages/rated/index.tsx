import { useState } from "react"
import { Container, Header, Loader, Menu, Segment } from "semantic-ui-react"
import { DisplayType } from "../home"
import { useQuery } from "@tanstack/react-query"
import { fetchRatedMovies, fetchRatedTvShows } from "./query"
import { ColumnDisplay } from "../home/column-display"

export const Rated = () => {

    const [activeTabs,setActiveTabs] = useState<DisplayType>(DisplayType.Movies)
    
    const {data:ratedMovies,isLoading:isLoadingRatedMovies} = useQuery({
        queryKey:["ratedMovies"],
        queryFn:fetchRatedMovies,
    })

    const {data:ratedTvShows,isLoading:isLoadingRatedTvShows} = useQuery({
        queryKey:["ratedTvShows"],
        queryFn:fetchRatedTvShows,
    })


    if(isLoadingRatedMovies || isLoadingRatedTvShows){
        return <Loader active />
    }
    
    return (
    <Container style={{marginTop:50}}>
        <Menu pointing secondary>
            <Menu.Item name="電影" active={activeTabs === DisplayType.Movies} onClick={() => setActiveTabs(DisplayType.Movies)} />
            <Menu.Item name="電視劇" active={activeTabs === DisplayType.TvShows} onClick={() => setActiveTabs(DisplayType.TvShows)} />
        </Menu>
        <Segment>
            {activeTabs === DisplayType.Movies? (
            <div>
                <Header as={"h2"}>已評價</Header>
                <ColumnDisplay data={ratedMovies.results} displayType={DisplayType.Movies} isRated />
            </div> ): (
                <div>
                <Header as={"h2"}>已評價</Header>
                <ColumnDisplay data={ratedTvShows.page} displayType={DisplayType.TvShows} isRated />
            </div> )}
        </Segment>

    </Container>
    )
}