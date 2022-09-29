// import {getFeaturedEvents} from '../dummy-data'
import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-utils';
const HomePage= (props)=>{
    const featuredEvents= getFeaturedEvents()
    console.log("vv", featuredEvents)
    console.log("props", props)
    return(
        <>
       {/* <EventList items={featuredEvents}/> */}
       <EventList items={props.events}/>
        </>
    )
}


export const getStaticProps= async()=>{

    const featuredEvents= await getFeaturedEvents();
    return{
        props:{
            events:featuredEvents
        },
        revalidate: 1800
    }
}

// export async function getSa

export default HomePage;