import s from './Note.module.scss'
import EditIcon from '../../assets/svg/edit-icon.svg?react'
import RemoveIcon from '../../assets/svg/remove-icon.svg?react'

interface TNote {
  value: string;
  id: number
  deleteTodo: (id:number) => void;
}
export const Note = ({ value, id , deleteTodo}: TNote) => {
  return (
    <li className={s.note_item} id={`${id}`}>

      <label className={s.note_item_label}>
        <input
          type="checkbox"
          className={`${s.note_item_checkbox} ${s.visually_hidden}`} />
        <span></span>
        <span className={s.note_item_text}>{value}</span>
      </label>
      
      <div className={s.note_item_controls}>
        <EditIcon className={s.edit_icon}/>
        <RemoveIcon className={s.remove_icon} onClick={()=> deleteTodo(id)}/>
      </div>

    </li>


  )
}

