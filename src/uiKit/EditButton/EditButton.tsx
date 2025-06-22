import s from './EditButton.module.scss'

interface IEditButton {
  onClick: ()=> void;
}

export const EditButton = ({onClick}:IEditButton)=> {

  return (
    <>
    <button className={s.edit_button} type='button' onClick={onClick}></button>
    </>
  )
}