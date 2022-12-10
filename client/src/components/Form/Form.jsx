
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getTemperaments } from '../../redux/actions'
import style from './Form.module.css'

const validate = (form) => {
  let errors = {}
  if(!form.name || typeof form.name === "string") {
      errors.name = "Name is required, it should not contain numbers"
  }
  if(!form.min_height || !form.max_height || form.min_height < form.max_height ) {
      errors.height = "Height is required"
  }
  if(!form.min_weight || !form.max_weight) {
      errors.weight = "Weight is required"
  }
  if(!form.life_span) {
      errors.life_span = "Lifespan is required, type only numbers separated by a dash (-)"
  }
  return errors
}


function Form() {  
  
  const dispatch = useDispatch()
  const temperaments = useSelector((state) => state.temperaments)
  
 


  const [form, setForm] = useState({
    name:'',
    min_height:'',
    max_height:'',
    min_weight:'',
    max_weight:'',
    life_span:'',
    temperaments:[],
    image:''
  })
  
  const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
    });

const handleChange = (e) =>{
    const property = e.target.name;
    const value = e.target.value;
    setForm({
        ...form,
        [property]:value
    })
    setErrors(validate({
      ...form,
      [property] : value
  }))
}

const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(postDog(form));
        alert("The new dog was added successfully");
        setForm({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: []
        });
}

useEffect(() => {
  dispatch(getTemperaments());
}, [dispatch]);

useEffect(()=>{
  if (form.name.length > 0 && typeof form.name == "string" && form.min_height.length > 0 && form.min_height < form.max_height  && form.max_height.length > 0 && form.min_weight.length > 0 && form.min_weight < form.max_weight && form.max_weight.length > 0) setButton(false)
  else setButton(true)
}, [form, setButton]);

const handleSelect = (e) => {
  setForm({
      ...form,
      temperaments: [...form.temperaments, e.target.value]
  })
}

const handleDelete = (el) => {
  setForm({
      ...form,
      temperaments: form.temperaments.filter(temp => temp !== el)
  })
}

  return (
    <div className={style.main_container}>

        <div className={style.container}>
          <Link to='/home'>
            <button className={style.home_button}>Back to Home</button>
          </Link>
        
        <div >
          <h1 className={style.title}>!Enter your own dog¡</h1>
        </div>
        
<form   action="" id="form" onSubmit={handleSubmit}>
        
        <button disabled={button} className={style.submit} type="submit" form="form">Submit</button>

        <input type='text' name='name' value={form.name} placeholder='Enter name' onChange={(e) => handleChange(e)}/>

        <div className={style.error_form}>{errors.name && <p>{errors.name}</p>}</div>

        <div className={style.height_container}>
        <input type='text' name='min_height' value={form.min_height} className={style.height} placeholder='Enter min height' onChange={(e) => handleChange(e)}/>

        <input type='text' name='max_height' value={form.max_height} className={style.height}  placeholder='Enter max height' onChange={(e) => handleChange(e)}/>
        </div>

        <div className={style.error_form}>{errors.height && <p>{errors.height}</p>}</div>


        <div className={style.weight_container}>
        <input type='text' name='min_weight' value={form.min_weight} className={style.weight} placeholder='Enter min weight' onChange={(e) => handleChange(e)}/>
        
        <input type='text' name='max_weight' value={form.max_weight} className={style.weight} placeholder='Enter max weight' onChange={(e) => handleChange(e)}/>
        </div>

        <div className={style.error_form}>{errors.weight && <p>{errors.weight}</p>}</div>


        <input type='text' name='life_span' value={form.life_span} placeholder='Enter life span' onChange={(e) => handleChange(e)}/>

        <div className={style.error_form}>{errors.life_span && <p>{errors.life_span}</p>}</div>

        <input type='text' name='image' value={form.image} placeholder='Enter image' onChange={handleChange}/>
        <select className={style.temperaments} onChange={handleSelect} >
          <option defaultValue selected>Temperaments</option>
          {temperaments.map(d => (                    
                                <option value={d.name} key={d.name+Math.random()}>{d.name}</option>
                            ))}
        </select>
          
        
</form>
    
    
{form.temperaments.map(el => 
                        <div className={style.element_temperament} key={el} onClick={() => handleDelete(el)}>
                            <p>{`${el}`}</p>
                        </div>    
                        )}
      </div>
    </div>
    
  )
}

export default Form

