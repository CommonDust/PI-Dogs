import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogs,FilterByTemperament,OrderByName, OrderByWeight, OrderAscenDescen, bring29less ,getTemperaments } from '../../redux/actions'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import Searchbar from '../Searchbar/Searchbar'
import Paginate from '../Paginate/Paginate'
import style from '../Home/Home.module.css'


function Home() {

  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.allDogs)
  const allTemperaments = useSelector((state) => state.temperaments)
  
  
    useEffect(() =>{
      
      dispatch(getDogs())
      dispatch(getTemperaments())
      
    },[dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const lastIndex = currentPage * dogsPerPage; 
    const firstIndex = lastIndex - dogsPerPage;
    const currentDogs = allDogs.slice(firstIndex, lastIndex);
    
    
    const handleNextPage = () => {
      if(currentPage < 22)
      setCurrentPage(currentPage + 1)
    }
    
    const handlePrevPage = () => {
      if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
    }
    

    const [order, setOrder] = useState("")

    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
    };

    

    const handleFilterByTemperament = (e) => {
      e.preventDefault();    
      dispatch(FilterByTemperament(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
    };


    const handleFilterByAlphabeticName = (e) => {
      e.preventDefault();
      dispatch(OrderByName(e.target.value))
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
      ;
    }

    const handleFilterByWeight = (e) => {
      e.preventDefault();
      dispatch(OrderByWeight(e.target.value))
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
      ;
      
    }

    const handleOrderByAscenDescen = (e) => {
      e.preventDefault();
      dispatch(OrderAscenDescen(e.target.value))
      setCurrentPage(1);
      setOrder(`Ordenado ${e.target.value}`);
      
    }
    

  return (
    <div className={style.all}>
      <div className={style.container}>
        
      <Link to='/'>  
        <h1 className={style.home}>Welcome to Info Dog</h1>
      </Link>

      
      <Link to='/dog/create'>
      <div className={style.form}>
            <button className={style.button_form}>!Load your dog¡</button>
      </div>
      </Link>
      
        <div className={style.container_filters}>
        <select className={style.oa_p} defaultValue onChange={handleFilterByAlphabeticName}>
          <option disabled selected >Alphabetical order</option>
          <option value='A-Z'>A-Z</option>
          <option value='Z-A'>Z-A</option>
        </select>

        <select className={style.weight} defaultValue onChange={handleFilterByWeight}>
          <option disabled selected >Weight order</option>
          <option value='min_weight'>Min Weight</option>
          <option value='max_weight'>Max Weight</option>
        </select>

        <select className={style.a_d} defaultValue onChange={handleOrderByAscenDescen}>
          <option  value='ascendent' >Ascendent</option>
          <option value='descendent'>Descendent</option>
        </select>

        <select className={style.r_t} defaultValue onChange={handleFilterByTemperament}>
          <option disabled selected >Temperaments</option>
          <option value='Todos'>All</option>
          {
                    allTemperaments?.map(temp => (
                      <option value={temp.name}  key={temp.id}>{temp.name}</option>
                  ))
                  }
        </select>
        
        </div>
      <div className={style.searchBar}>
        <Searchbar/>
      </div>


<div className={style.main_container}>

        <div className={style.cards}>
        {currentDogs?.map((el) =>  {
        
          return(
            
            <div key={el.id} className={style.card}>
            
              <Link to={`/dogs/${el.id}`}>
                {
                  allDogs && <Card key={el.id} image={el.image} name={el.name} weight={el.weight} temperaments={el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments.map(el => el) }/>
                }
              </Link>
            </div>      
          )
        })
        }
        
        </div>
    </div>
    <div>
    
      </div>
    <div className={`${style.pagination}`}>
    <button onClick={handlePrevPage} className={style.next_prev}>Previous</button>
        <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/> {/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate*/}
        <button onClick={handleNextPage} className={style.next_prev}>Next</button>
      </div>
      <div>
        
      </div>
  </div>
  
  </div>
  )
}

export default Home
