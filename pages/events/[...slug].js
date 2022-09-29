import {useRouter} from "next/router"
// import { getFilteredEvents } from "../../dummy-data";
import {getFilteredEvents} from "../../helpers/api-utils"
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title"
import Button from "../../components/events/ui/Button";
import ErrorAlert from "../../components/events/ui/error-alert";

const FilteredEventsPage=(props)=>{
    const router=useRouter();
    // const filterData=router.query.slug;
    // if(!filterData){
    //     return <p className="center">Loading...</p>
    // }

    // const filterYear=filterData[0];
    // const filterMonth= filterData[1];

    // const numYear= +filterYear;
    // const numMonth= +filterMonth;

    // if(isNaN(numYear) || isNaN(numMonth) ||
    // numYear>2030 ||
    // numYear<2021 ||
    // numMonth<1 ||
    // numMonth>12
    // )
    if(props.hasError)
    {
        return(
        <>
        <ErrorAlert>
        <p>Invalid filter.!</p>
        </ErrorAlert>
        <div className="center">
            <Button link="/events">Show all Events</Button>
        </div>
       
           </>
           )
    }

    // const filterEvents= getFilteredEvents({
    //     year:numYear,
    //     month:numMonth
    // });

    const filterEvents= props.events;
    if(!filterEvents || filterEvents.length===0){
        return (
            <>
          <ErrorAlert>
        <p>No events found.</p>
        </ErrorAlert>
        <div className="center">
            <Button link="/events">Show all Events</Button>
        </div>
           </>
        )
    }
    // const date= new Date(numYear, numMonth-1)

    const date= new Date(props.date.year, props.date.month-1)
    return(
        <>
        <ResultsTitle date={date}/>
        <EventList
         items={filterEvents}
         />
        </>
    )
   
}


export const getServerSideProps=async(context)=>{
    const {params} = context;
    
    const filterData = params.slug;

    const filterYear=filterData[0];
    const filterMonth= filterData[1];

    const numYear= +filterYear;
    const numMonth= +filterMonth;

    if(isNaN(numYear) || isNaN(numMonth) ||
    numYear>2030 ||
    numYear<2021 ||
    numMonth<1 ||
    numMonth>12
    ){
        return {
            props:{ hasError :true}
            // notFound : true,
            // redirect:{
            //     destination : "/error"
            // }
        }
    }

    const filterEvents=  await getFilteredEvents({
        year:numYear,
        month:numMonth
    });
    return {
        props:{
            events: filterEvents,
            date:{
                year:numYear,
                month:numMonth
            }
        }
    }

}
export default FilteredEventsPage;