import Image from 'next/image'
import classes from './hero.module.css'

function Hero(){
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src='/images/site/persona.jpg'
                    alt='An image showing Jerald'
                    width={600}
                    height={600}
                    quality={100}
                 />
            </div>
            <h1>Hi, I'm Jerald</h1>
            <p>I blog about web development - especially frontend frameworks like React</p>
        </section>
    )
}

export default Hero;