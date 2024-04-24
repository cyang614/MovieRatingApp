import { Card,Form,Grid, Label, Rating } from "semantic-ui-react";
import { DisplayType } from "."
import { Link,  } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

interface DisplayData {
    id: number;
    overview: string;
    poster_path: string;
    title?: string;
    name?: string;
    vote_average:number;
    release_date:string;
    rating?:number;
}

interface Props{
    data:DisplayData[];
    displayType:DisplayType;
    isRated?:boolean;
}

export const ColumnDisplay = (props:Props) =>  {
    const {data,displayType,isRated} = props
    const [rating,setRating] = useState<number>(0)
    
    const onSuccess =()=>{
        toast.success("評分成功!");
    }

    const onError =()=>{
        toast.success("出錯了...!");
    }    

    const {mutate:rateMovieMutation} = useMutation({
        mutationKey:["rateMovie"],
        mutationFn:(id:number)=>rateMovie(id,rating),
        onSuccess,
        onError,
    })
    const {mutate:rateTvShowMutation} = useMutation({
        mutationKey:["rateTvShow"],
        mutationFn:(id:number)=>rateTvShow(id,rating),
        onSuccess,
        onError,
    })
    
    const rate = 
        displayType === DisplayType.Movies ? rateMovieMutation : rateTvShowMutation

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
                        <Link to={`/${displayType === DisplayType.Movies? "movie" : "tvshow"}/${displayData.id}`}>
                        <Card 
                            fluid 
                            image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`} 
                            header={displayType === DisplayType.Movies
                                    ? displayData.title
                                    : displayData.name} 
                            meta={`上映日期: ${displayData.release_date} | 評分: ${displayData.vote_average}`} 
                            description={displayData.overview.slice(0,350) + "..."} />{" "}
                        {isRated &&<Label color="green">你的評分 : {displayData.rating}</Label>}
                    </Link>
                    <Form style={{marginTop:10}}>
                        <Form.Field>
                            <Form.Input type="number" min="0" max="10" step="0.5" 
                                onChange={(e)=>setRating(Number(e.target.value))} 
                                action={{
                                    color:"violet",
                                    labelPosition:"right",
                                    icon:"star",content:"評分",
                                    onClick:()=>rate(displayData.id),
                                    }} />
                        </Form.Field>
                    </Form>
                    </Card.Group>
                </Grid.Column>
            ))}
        </Grid>
    )
}