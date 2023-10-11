import Styles from './cardDetail.module.css';
//


export default function CardDetail ({ name, id, flagImage, continent, capital, population, subregion }) {

    
    return (

        <div className={Styles['card-detail-container']}>

            <div className={Styles['name-container']}>
                <h1 className={Styles['name-text']}>{name}</h1>
                <p className={Styles.id}> {id}</p>
            </div>


            <div className={Styles['info-container']}>

                <div>
                    <p className={Styles['top-info-text']}>Capital:</p>
                </div>
                <div>
                    <p className={Styles['bottom-info-text']}>{capital}</p>
                </div>

            </div>


            <div className={Styles['info-container']}>

                <div>
                    <p className={Styles['top-info-text']}>Continente:</p>
                </div>
                <div>
                    <p className={Styles['bottom-info-text']}>{continent}</p>
                </div>

            </div>


            <div className={Styles['info-container']}>

                <div>
                    <p className={Styles['top-info-text']}>Subregión:</p>
                </div>
                <div>
                    <p className={Styles['bottom-info-text']}>{subregion}</p>
                </div>

            </div>


            <div className={Styles['info-container']}>

                <div>
                    <p className={Styles['top-info-text']}>Population:</p>
                </div>
                <div>
                    <p className={Styles['bottom-info-text']}>{population}</p>
                </div>

            </div>


            <div className={Styles['image-container']}>
                <img src={flagImage} ></img>
            </div> 

        </div>

    )

}