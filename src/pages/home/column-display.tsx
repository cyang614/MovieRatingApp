import { Card,Grid, Rating } from "semantic-ui-react";
import { DisplayType } from "."

interface DisplayData {
    id: number;
    overview: string;
    poster_path: string;
    title?: string;
    name?: string;
    vote_average:number;
    release_date:string;
}

interface Props{
    data:DisplayData[];
    displayType:DisplayType;
}

export const ColumnDisplay = (props:Props) =>  {
    const {data,displayType} = props

    return (
        <Grid
            columns={3}
            stackable
            centered
            verticalAlign="top"
            padded="vertically"
        >
            {data.map((displayData:DisplayData)=>(
                <Grid.Column key={displayData.id}>
                    <Card.Group>
                        <Card 
                            fluid 
                            image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`} 
                            header={displayType === DisplayType.Movies
                                    ? displayData.title
                                    : displayData.name} 
                            meta={`上映日期: ${displayData.release_date} | 評分: ${displayData.vote_average}`} 
                            description={displayData.overview.slice(0,350) + "..."} />
                    </Card.Group>
                </Grid.Column>
            ))}
        </Grid>
    )
}