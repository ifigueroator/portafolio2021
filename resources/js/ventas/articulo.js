import React, { Component } from "react";



const Articulo = (props) => {
  return (
    props.articulo.map((val, idx) => {
      let articulos_id = `articulos_id-${idx}`, cantidad = `cantidad-${idx}`,
      estadoitem = `estadoitem-${idx}`
      return (
        <tr key={val.index}>
         

            <td>
                <label>Articulo</label>
                <input type="number"
              name="articulos_id"    
              value={val.articulos_id || ""} onChange={e => handleChange(index, e)}             
             id={articulos_id} data-id={idx} className="form-control " />
          </td>

          <td>
          <label>Cantidad</label>
            <input type="number"
              name="cantidad"    
              value={val.cantidad || ""} onChange={e => handleChange(index, e)}             
             id={cantidad} data-id={idx} className="form-control " />
          </td>

          <td>
          <label>Estado (ira Oculto)</label>
            <input
              name="estadoitem" 
              value={val.estadoitem || ""} onChange={e => handleChange(index, e)}           
              id={estadoitem} data-id={idx}
               className="form-control"/>
          </td>
         
          <td>
            {
            idx===0?<button onClick={()=>props.add()} type="button" className="btn btn-primary">agregas</button>
            : <button className="btn btn-danger" onClick={(() => props.delete(val))} >borrar</button>
            }
          </td>
        </tr >
      )
    })
  )
}
export default Articulo