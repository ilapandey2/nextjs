
import {useRouter} from "next/router"
import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
// import { getAllEvents } from "../../dummy-data";
import EventSearch from "../../components/events/events-search";
const AllEventsPage= (props)=>{
    const router=useRouter();
    // const events= getAllEvents();
    const {events}=props

    const findEventHandler=(year, month)=>{
     const fullPath= `/events/${year}/${month}`
   router.push(fullPath)
    }
    return(
        <>
        <EventSearch onSearch={findEventHandler}/>
        <EventList items={events}/>
        </>
    )
}

export const getStaticProps=async()=>{
    const events= await getAllEvents();

    return{
        props:{
            events:events
        },
        revalidate:60
    }
}
export default AllEventsPage;