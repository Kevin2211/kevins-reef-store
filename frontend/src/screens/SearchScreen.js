import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getError } from '../utils';
import { toast } from 'react-toastify'
import axios from 'axios'


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
          return { ...state, loading: true };
        case 'FETCH_SUCCESS':
          return {
            ...state,
            products: action.payload.products,
            page: action.payload.page,
            pages: action.payload.pages,
            countProducts: action.payload.countProducts,
            loading: false,
          };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: action.payload };
    
        default:
          return state;
      }
}

export default function SearchScreen() {

    const navigate = useNavigate()
    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const category = sp.get('category') || 'all'
    const query = sp.get('query') || 'all'
    const price = sp.get('price') || 'all'
    const careLevel = sp.get('careLevel') || 'all'
    const order = sp.get('order') || 'newest'
    const page = sp.get('page') || 1


    const [{ loading, error, products, pages, countProducts}, dispatch] = 
    useReducer(reducer, {
        loading: true,
        error: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${careLevel}&order=${order}`
                )
                dispatch({ type: 'FETCH_SUCCESS', payload: data})
                
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error)
                })
            }
        }
        fetchData()
    },[careLevel, category, order, page, price, query])

    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data }= await axios.get(`/api/products/categories`)
                setCategories(data)
            } catch (error) {
                toast.error(getError(error))
            }

        }
        fetchCategories()
    },[dispatch])
  return (
    <div>SearchScreen</div>
  )
}
