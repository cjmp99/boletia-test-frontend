import { useContext, useEffect, useState } from "react"
import BoletiaContext from "../context/context";
import { regexUrl } from "../utils";

const useOnChangeValue = () => {
    const { event } = useContext(BoletiaContext);

    const [data, setData] = useState({
        name: '',
        date: '',
        urlTickets: '',
        bannerDesktop: null,
        bannerTablet: null,
        bannerMobile: null
    });
    const [errorFiles, setErrorFiles] = useState({
        bannerDesktop: null,
        bannerTablet: null,
        bannerMobile: null,
        invalidUrl: null
    })

    useEffect(() => {
        if(!data.bannerDesktop && !data.bannerTablet && !data.bannerMobile) return

        if(data.bannerDesktop?.size > 800000){
            setErrorFiles({
                ...errorFiles,
                bannerDesktop: 'The image must not weigh more than 800 kb'
            })
            setData({
                ...data,
                bannerDesktop: null
            })
        } else if(data.bannerTablet?.size > 800000){
            setErrorFiles({
                ...errorFiles,
                bannerTablet: 'The image must not weigh more than 800 kb'
            })
            setData({
                ...data,
                bannerTablet: null
            })
        } else if(data.bannerMobile?.size > 800000){
            setErrorFiles({
                ...errorFiles,
                bannerMobile: 'The image must not weigh more than 800 kb'
            })
            setData({
                ...data,
                bannerMobile: null
            })
        } else if(data.bannerDesktop?.size < 800001){
            setErrorFiles({
                ...errorFiles,
                bannerDesktop: null
            })
        } else if(data.bannerTablet?.size < 800001){
            setErrorFiles({
                ...errorFiles,
                bannerTablet: null
            })
        } else if(data.bannerMobile?.size < 800001){
            setErrorFiles({
                ...errorFiles,
                bannerMobile: null
            })
        }
        //eslint-disable-next-line
    }, [data])

    useEffect(() => {
        console.log(regexUrl.test(data.urlTickets));
        if(!regexUrl.test(data.urlTickets)){
            setErrorFiles({
                ...errorFiles,
                    invalidUrl: 'Please enter a valid url'
            })
        }else if(regexUrl.test(data.urlTickets)){
            setErrorFiles({
                ...errorFiles,
                invalidUrl: null
            })
        }
        //eslint-disable-next-line
    }, [data.urlTickets])
    

    useEffect(() => {
        if(!event) return;

        setData({
            ...data,
            name: event.name,
            date: `${event.dateEvent}T${event.hourEvent}`,
            urlTickets: event.urlTickets
        })
        //eslint-disable-next-line
    }, [event])
    

    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
console.log(errorFiles);
    return {
        data,
        errorFiles,
        setData,
        onChange
    }
}

export default useOnChangeValue;