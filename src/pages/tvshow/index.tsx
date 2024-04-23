import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { Grid, Header, Loader, Segment,Image, List, Label, Accordion, Card } from "semantic-ui-react";
import { fetchTvShowDetails } from "./query";


export const TvShow = () => {
    const {id} = useParams<string>();

    if(!id){
        return <div>Invalid Tv Show ID</div>;
    }
    
    const {data,isLoading} = useQuery({
        queryKey:["tvshow"],
        queryFn:() => fetchTvShowDetails(id),
    })

    if(isLoading){
        return <Loader active />;
    }

    const seasonsPanels = data.seasons.map((season: any) =>(
        {
            key: season.id,
            title: `Season ${season.season_number}`,
            content:{
                content:<Card style={{height:"70px"}} meta={season.air_date} description={`${season.episode_count}集`} />
            }
        }
    ))

    return (
        <div style={{marginTop:50}}>
            <Segment>
                <Header>{data.name}</Header>
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
                                        製作人:
                                    </List.Header>
                                    <List.Description>
                                        {data.created_by.map((creator:any)=>creator.name).join(", ")}
                                    </List.Description>
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        每集長度:
                                    </List.Header>
                                    {`${data.episode_run_time.join(", ")}分鐘`}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        類型:
                                    </List.Header>
                                    {data.genres.map((genre:any)=>(
                                        <List.Item key={genre.id}>
                                            <Label key={genre.id}>{genre.name}</Label>
                                        </List.Item>
                                    ))}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        首集放映日期:
                                    </List.Header>
                                    {data.first_air_date}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        串流平台:
                                    </List.Header>
                                    {data.networks.map((network:any)=>(
                                        <Image
                                            key={network.id}
                                            src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                                            size="small"
                                            style={{marginRight:10}}
                                        />
                                    ))}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        總集數:
                                    </List.Header>
                                    {data.number_of_episodes}
                                </List.Item>
                                <List.Item>
                                    <List.Header>
                                        Season: 
                                    </List.Header>
                                    <List.Description style={{height:"200px" , overflowY:"scroll"}}>
                                        <Accordion defaultActiveIndex={0} panels={seasonsPanels} styled />
                                    </List.Description>
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