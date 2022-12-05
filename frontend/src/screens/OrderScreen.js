import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useReducer } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Store } from '../Store'
import { getError } from '../utils'

const reducer = (state,action) => {
    switch (action.type){
        case 'ORDER_REQUEST':
            return {...state, loading: true}
        case 'ORDER_SUCCESS':
            return {...state, loading: false, order: action.payload }
        case 'ORDER_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}
export default function OrderScreen() {


    const [{loading, error, order}, dispatch] = useReducer(reducer, {loading: true, error: '', order: null})
    const params = useParams()
    const { state: {cart, userInfo}, dispatch: contextDispatch } = useContext(Store)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            if(!userInfo){
                return navigate('/login') 
            }
            dispatch({type: 'ORDER_REQUEST'})
            try {
                const result = await axios.get(`/api/orders/${params.id}`,
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })

                dispatch({type: 'ORDER_SUCCESS', payload: result } )
            } catch (error) {
                dispatch({type: 'ORDER_FAIL', payload: getError(error)})
            }

        }
    fetchData()

    }, [])
    


  return (
      loading ? ( <LoadingBox></LoadingBox>)
      : error ? ( <MessageBox variant='danger' > { error }</MessageBox> )
      : ( 
          <div>
                
          </div>
      )
    
  )
}
