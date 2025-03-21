import React, { useEffect, useMemo, useState } from 'react';
import Layout from './../Layout/Layout';
import Filters from '../Components/Filters';
import Movie from '../Components/Movie';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { TbPlayerTrackPrev, TbPlayerTrackNext } from 'react-icons/tb';
import Loader from '../Components/Notifications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { getAllMoviesAction } from '../Redux/Actions/MoviesActions';
import { LanguageData, RatesData, TimeData, YearData } from '../Data/FilterData';
import { useParams } from 'react-router-dom';

function MoviesPage() {
    const dispatch = useDispatch();
    const {search} = useParams()
     const [category, setCategory] = useState({ title: "All Categories" });
      const [year, setYear] = useState(YearData[0]);
      const [times, setTimes] = useState(TimeData[0]);
      const [rates, setRates] = useState(RatesData[0]);
      const [language, setLanguage] = useState(LanguageData[0]);

    const sameClass = "flex flex-col items-center justify-center min-h-screen"; // Updated for centering

    // all movies 
    const { isLoading, isError, movies, pages, page } = useSelector((state) => state.getAllMovies);

    // get all categories
    const { categories } = useSelector((state) => state.categoryGetAll);

    // queries 
    const queries = useMemo(()=>{
        const query ={
         category:category?.title==="All Categories" ? "":category?.title,
         time:times?.title.replace(/\D/g,""),
         language:language?.title==="Sort By Language" ? "":language?.title,
         rate:rates?.title.replace(/\D/g,""),
         year:year?.title.replace(/\D/g,""),
         search: search ? search :""
        };
        return query;
    },[category,times,language,rates,year,search])

    useEffect(() => {
        //errors
        if (isError) {
            toast.error(isError);
        }
        //get all movies
        dispatch(getAllMoviesAction(queries))
    }, [dispatch, isError,queries]);

    //pagination next and prev pages 
    const nextPage = () => {
        dispatch(getAllMoviesAction({
            ...queries,
            pageNumber: page + 1
        }))
    }
    const prevPage = () => {
        dispatch(getAllMoviesAction({
            ...queries,
            pageNumber: page - 1
        }))
    }


    const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,


    }

    

    return (
        <>
            <Layout>
                <div className='min-height-screen container mx-auto px-2 my-6'>
                    <Filters data={datas} />
                    <p className='text-lg font-medium my-6'>
                        Total <span className='font-bold text-subMain'>{movies ? movies.length : 0}</span>{' '} items found
                        {
                            search  && `for"${search}"`
                        }
                    </p>
                    {
                        isLoading ? (
                            <div className={sameClass}>
                                <Loader />
                            </div>
                        ) : movies?.length > 0 ? (
                            <>
                                <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                                    {
                                        movies.map((movie, index) => (
                                            <Movie key={index} movie={movie} />
                                        ))
                                    }
                                </div>
                                {/* Pagination buttons moved here */}
                                <div className='w-full flex justify-center gap-6 md:my-20 my-10'>
                                    <button onClick={prevPage} disabled={page === 1} className='text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain'>
                                        <TbPlayerTrackPrev className='text-xl' />
                                    </button>
                                    <button onClick={nextPage} disabled={page === pages} className='text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain'>
                                        <TbPlayerTrackNext className='text-xl' />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={sameClass}>
                                <div className='w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex items-center justify-center'>
                                    <RiMovie2Line />
                                </div>
                                <p className='text-border text-sm'>It Seems Like we don't have any movie</p>
                            </div>
                        )
                    }
                </div>
            </Layout>
        </>
    );
}

export default MoviesPage;