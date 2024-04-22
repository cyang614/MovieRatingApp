import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { Grid, Header, Loader, Segment,Image, List, Label } from "semantic-ui-react";
import { fetchMovieDetails } from "./query";


export const Movie = () => {
    const {id} = useParams<string>();

    if(!id){
        return <div>Invalid Movie ID</div>;
    }
    
    const {data,isLoading} = useQuery({
        queryKey:["movie"],
        queryFn:() => fetchMovieDetails(id),
    })

    if(isLoading){
        return <Loader active />;
    }

    return (
        <div style={{marginTop:50}}>
            <Segment>
                <Header>{data.title}</Header>
                <Grid column={2} divided textAlign="left" style={{marginTop:20}}>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <div 
                                style={{display: "flex" , 
                                alignItems:"center" , 
                                justifyContent:"center" , 
                                height:"100%"}}
                            >

                                <Image
                                    src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} 
                                    size="medium" 
                                    centered 
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <List>
                                <List.Item>
                                    <List.Header>
                                        電影是否僅適合成年人:
                                    </List.Header>
                                    {data.adult ? "是" : "否"}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        成本:
                                    </List.Header>
                                    {data.budget}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        類型:
                                    </List.Header>
                                    {data.genres.map((genre:any)=>(
                                        <Label key={genre.id}>
                                            {genre.name}
                                        </Label>
                                    ))}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        上映日期:
                                    </List.Header>
                                    {data.release_date}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        票房:
                                    </List.Header>
                                    {data.revenue}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        製作公司:
                                    </List.Header>
                                    {
                                        data.production_companies.map(
                                            (company:any)=> company.name).join(", ")
                                    }
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
}