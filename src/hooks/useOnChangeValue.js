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

    const handleErrors = (banner, size) => {
        const validationSize = {
            banner: size < 800001 ? true : false
        };
        const valid = validationSize[banner]
        return { valid }
    };

    useEffect(() => {
        if(data.bannerDesktop){
            const { valid } = handleErrors('banner', data.bannerDesktop.size)
            setErrorFiles({
                ...errorFiles,
                bannerDesktop: valid ? null : 'The image must not weigh more than 800 kb'
            })
        } else if(data.bannerTablet){
            const { valid } = handleErrors('banner', data.bannerTablet.size)
            setErrorFiles({
                ...errorFiles,
                bannerTablet: valid ? null : 'The image must not weigh more than 800 kb'
            })
        } else if(data.bannerMobile){
            const { valid } = handleErrors('banner', data.bannerMobile.size)
            setErrorFiles({
                ...errorFiles,
                bannerMobile: valid ? null : 'The image must not weigh more than 800 kb'
            })
        }
        //eslint-disable-next-line
    }, [data.bannerDesktop, data.bannerTablet, data.bannerMobile])

    useEffect(() => {
        if(data.urlTickets === '') return
        if(regexUrl.test(data.urlTickets)){
            setErrorFiles({
                ...errorFiles,
                invalidUrl: null
            })
        }else if(!regexUrl.test(data.urlTickets)){
            setErrorFiles({
                ...errorFiles,
                invalidUrl: 'Please enter a valid url'
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