import Styles from './countryActivityItem.module.css';


export default function CountryActivityItem ({ name, difficulty, duration, season }) {

    return (

        <div className={Styles['countryActivity-item']}>

            <div className={Styles['title-container']}>
                <p id={Styles.title}>{name}</p>
            </div>

            <div className={Styles['info-container']}>

                <div className={Styles.info}>
                    <p>
                        Dificultad:
                    </p>
                        
                    <p className={Styles.p2}>
                        {difficulty}
                    </p>
                </div>


                <div className={Styles.info} id={Styles.infoMid}>
                    <p>
                        Duracion:
                    </p>
                    <p className={Styles.p2}>
                        {duration}
                    </p>
                </div>


                <div className={Styles.info}>
                    <p>
                        Temporada:
                    </p>
                    <p className={Styles.p2}> 
                        {season}
                    </p>
                </div>
            </div>


        </div> 

    )

}