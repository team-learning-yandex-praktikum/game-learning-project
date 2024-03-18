import style from './fallback.module.css'

const reload = () => {
  window.location.reload()
}

const toMainPage = () => {
  window.location.pathname = '/'
}

const Fallback = () => {
  return (
    <div className={style.fallback}>
      <h1>Something went wrong.</h1>
      <div className={style.buttons}>
        <button className={style.button} onClick={reload}>
          Reload
        </button>
        <button className={style.button} onClick={toMainPage}>
          Go Home
        </button>
      </div>
    </div>
  )
}

export default Fallback
