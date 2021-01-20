import React, { useState, useEffect } from 'react'


const Checkbox = ({ categories, handleFilters }) => { //debo mandarle la lista de categorias desde el shop
    const [checked, setChecked] = useState([])

    const handleToggle = (categ) => () => {
        //va a devolver el primer indice o -1 sino encuentra nada
        const currentCategoryId = checked.indexOf(categ) 
        const newCheckedCategoryId = [...checked]
        //si currentCategory no estaba en el array checked la pusheo al array
        //de lo contrario, la quito
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(categ)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        console.log( newCheckedCategoryId )
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    const handleChange = (e) => {
        handleFilters(e.target.value)
        setChecked(e.target.value)
    }

    return (            
        categories.map((categ, i)=>(
            <li key={i} className='list-unstyled'>
                <input 
                    onChange={handleChange} 
                    value={`${categ.id}`} 
                    type='checkbox' 
                    className='form-check-input' />
                <label className='form-check-label'>{categ.name}</label>
            </li>
        ))
       
    )
}

export default Checkbox
